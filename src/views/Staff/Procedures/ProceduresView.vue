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
                            <ion-item slot="header" color="light">
                                <ion-label class="text-primary ">{{ upperCase('Quality Management Manual')
                                    }}</ion-label>
                            </ion-item>
                            <div v-if="qmsManual.length > 0" class="ion-padding" slot="content"
                                v-for="(data, index) in qmsManual" :key="index">
                                {{ data.procedure_name }}
                            </div>
                            <div v-else class="ion-padding text-muted" slot="content">No Content</div>
                        </ion-accordion>
                        <ion-accordion value="section-two">
                            <ion-item slot="header" color="light">
                                <ion-label class="text-primary ">{{ upperCase('QMS Process') }}</ion-label>
                            </ion-item>

                            <div v-if="qmsProcess.length > 0" class="ion-padding" slot="content"
                                v-for="(data, index) in qmsProcess" :key="index">
                                {{ data.procedure_name }}
                            </div>
                            <div v-else class="ion-padding text-muted" slot="content">No Content</div>
                        </ion-accordion>
                    </ion-accordion-group>
                </div>
                <div class="col-md-7">
                    <ion-card>
                        <ion-card-content>
                            <div class="pdf-viewer-container">
                                <iframe id="pdfViewer" class="pdf-viewer" ref="pdfViewer"></iframe>
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
<script>
import { GeneralController } from '../../../controller/GeneralContorller';
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
export default {
    name: 'ProcedureView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel
    },
    data() {
        return {
            isLoading: true,
            errorDetails: null,
            qmsManual: [],
            qmsProcess: [],
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            //this.retriveForms()
            this.departments = await this.fetchDataList('role-list', 'roles')
            this.data = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
        },
        async retriveForms() {
            this.isLoading = true
            this.errorDetails = null
            this.details = []
            axios.get(`/procedure/retrive-procedure/v2/general`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.data = response.data.procedures
                    this.isLoading = false
                })
                .catch(error => {
                    this.errorDetails = error
                    console.error('Error fetching file content:', error);
                    this.isLoading = false
                });
        },
        async loadData() {
            this.qmsManual = await this.generalController.retriveData('/procedure/retrive-procedure/v2/general', 'procedures')
            this.qmsProcess = await this.generalController.retriveData('/procedure/retrive-procedure/v2/department', 'procedures')
            this.isLoading = false
            console.log(this.qmsProcess)
        },
        upperCase(data) {
            return data.toUpperCase()
        }
    },
    async created() {
        this.generalController = new GeneralController();
        this.loadData()
    }

}
</script>
