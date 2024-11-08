<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">PROCEDURES</p>
            <div class="row">
                <div class="col-md-5">
                    <ion-accordion-group class="m-2" :multiple="true" :value="['section-one', 'section-two']">
                        <ion-accordion value="section-one">
                            <ion-item slot="header" color="light" class="accordion-header">
                                <ion-label class="text-primary">{{ upperCase('Quality Management Manual') }}</ion-label>
                            </ion-item>
                            <div v-if="qmsManual.length > 0" class="ion-padding accordion-content" slot="content"
                                v-for="(data, index) in qmsManual" :key="index" @click="viewItem('one-' + index, data)">
                                <span :class="itemStyle('one-' + index)"> {{ data.procedure_name }}</span>
                            </div>
                            <div v-else class="ion-padding text-muted accordion-content" slot="content">No Content</div>
                        </ion-accordion>
                        <ion-accordion value="section-two">
                            <ion-item slot="header" color="light">
                                <ion-label class="text-primary ">{{ upperCase('QMS Process') }}</ion-label>
                            </ion-item>
                            <div v-if="qmsProcess.length > 0" class="ion-padding accordion-content" slot="content"
                                v-for="(data, index) in qmsProcess" :key="index"
                                @click="viewItem('two-' + index, data)">
                                <span :class="itemStyle('two-' + index)"> {{ data.procedure_name }}</span>
                            </div>
                            <div v-else class="ion-padding text-muted accordion-content" slot="content">No Content</div>

                        </ion-accordion>
                    </ion-accordion-group>
                </div>
                <div class="col-md-7">
                    <ion-card>
                        <ion-card-content>
                            <div class="pdf-viewer-container">
                                <label for="" class="fw-bolder text-primary h5">

                                    {{ procedureItem ?
                                        procedureItem.procedure_name : 'PROCEDURE NAME' }}
                                </label>
                                <br>
                                <small class="text-muted fw-bolder">
                                    {{ procedureItem ? procedureItem.procedure_code : 'PROCEDURE CODE' }}
                                </small>
                                <div class="pdf-viewer-container" v-if="!contentLoading">
                                    <div v-if="procedureItem">
                                        <PDFViewerComponent v-if="procedureItem.fileID"
                                            :filename="procedureItem.procedure_code" :link="procedureItem.link"
                                            :fileID="procedureItem.fileID" model="ProcedureDocuments" />
                                        <div class="content-frame" v-else>
                                            <label for="" class="fw-bolder text-primary h6">EMPTY FILE</label>
                                        </div>
                                    </div>
                                    <div class="content-frame" v-else>
                                        <label for="" class="fw-bolder text-primary h6">SELECT FILES</label>
                                    </div>
                                </div>
                                <div v-else>
                                    <label for="" class="fw-bolder text-primary h6">LOADING...</label>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="badge bg-danger">{{ errorDetails }}</p>
        </div>
    </div>
    <div v-else>
        <p class="badge bg-info">LOADING CONTENTS</p>
    </div>

</template>
<style>
.accordion-content {
    cursor: default;
}

.accordion-content:hover {
    color: #18995B;
    /* Adjust as needed */
}
</style>
<script>
import { GeneralController } from '../../../controller/GeneralContorller';
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
export default {
    name: 'ProcedureView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel,
        PDFViewerComponent
    },
    data() {
        return {
            isLoading: true,
            errorDetails: null,
            qmsManual: [],
            qmsProcess: [],
            selectedItem: null,
            procedureItem: null,
            contentLoading: false
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
            this.loadData()
        },
        async loadData() {
            this.qmsManual = await this.generalController.retriveData('/procedure/retrive-procedure/v2/general', 'procedures')
            this.qmsProcess = await this.generalController.retriveData('/procedure/retrive-procedure/v2/department', 'procedures')
            this.isLoading = false
        },

        upperCase(data) {
            return data.toUpperCase()
        },
        encrypt(data) {
            return btoa(data)
        },
        async viewItem(index, data) {
            this.contentLoading = true
            this.selectedItem = index
            this.procedureItem = null
            await this.$nextTick();
            this.viewProcedure(data)
        },
        async viewProcedure(data) {
            this.procedureItem = data
            if (data.file) {
                this.procedureItem.fileID = this.encrypt(data.file.id)
                console.log(this.procedureItem.fileID)
            } else {
                this.procedureItem.fileID = null
            }
            this.procedureItem.link = "procedure/procedure-documents/view"
            this.contentLoading = false
        },
        itemStyle(data) {
            return data == this.selectedItem ? 'text-primary' : ''
        },
        encrypt(data) {
            return btoa(data)
        },
    },
    async created() {
        this.generalController = new GeneralController();
        this.loadData()
    }

}
</script>
