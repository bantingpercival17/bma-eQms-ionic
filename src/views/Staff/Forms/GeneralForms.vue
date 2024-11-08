<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <!--   <ion-content>

        </ion-content> -->
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">{{ pageTitle }}</p>
            <div class="row">
                <div class="col-md-5">
                    <ion-card>
                        <ion-card-content>
                            <form>
                                <div class="form-group">
                                    <small class="text-muted fw-bolder">SEARCH</small>
                                    <input type="text" v-model="searchTerm" onkey="retrieveContents"
                                        class="form-control form-control-sm border border-primary">
                                </div>
                                <div class="form-group">
                                    <small class="text-muted fw-bolder">FILLTER </small>
                                    <select v-model="selectedProcedure"
                                        class="form-select form-select-sm border border-primary">
                                        <option value="0" selected> Select Procedure</option>
                                    </select>

                                </div>
                                <div class="form-group">
                                    <select v-model="selectedFormStatus"
                                        class="form-select form-select-sm border border-primary">
                                        <option value="1" selected> GENERAL FORMS</option>
                                        <option value="0" selected> DEPARTMENTAL FORMS</option>
                                    </select>
                                </div>
                            </form>
                        </ion-card-content>
                    </ion-card>
                    <div v-if="data">
                        <ion-card v-for="(item, index) in data" :key="index">
                            <ion-card-content @click="viewForms(item)">
                                <small class="text-muted fw-bolder">{{ item.form_code }}</small>
                                <br>
                                <label for="" class="fw-bolder text-primary h6">{{ item.form_name }}</label>
                            </ion-card-content>
                        </ion-card>
                    </div>
                    <div v-else>
                        <ion-card>
                            <ion-card-content>
                                <label for="" class="fw-bolder text-primary h6">NO CONTENT</label>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </div>
                <div class="col-md-7">
                    <ion-card>
                        <ion-card-content>
                            <div class="pdf-viewer-container">
                                <label for="" class="fw-bolder text-primary h6">{{ form.form_name }}</label>
                                <br>
                                <small class="text-muted fw-bolder">{{ form.form_code }}</small>
                                <PDFViewerComponent v-if="form.fileID" :filename="form.form_name" :link="form.link"
                                    :fileID="form.fileID" model="FormDocuments" />
                                <div class="content-frame" v-else>
                                    <label for="" class="fw-bolder text-primary h6"></label>
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
<script>
import { IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent } from '@ionic/vue';
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import { GeneralController } from '../../../controller/GeneralContorller';
export default {
    name: 'GeneralForms',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, PDFViewerComponent
    },
    data() {
        const form = {
            form_name: 'FORM NAME',
            form_code: 'FORM CODE',
            link: 'forms/retrive/file/',
            fileID: null
        }
        return {
            pageTitle: 'GENERAL FORMS',
            data: [],
            isLoading: true,
            errorDetails: null,
            retriveContentLink: '/retrive-forms',
            form,
            searchTerm: '',
            selectedProcedure: 0,
            selectedFormStatus: 1
        }
    },
    watch: {
        searchTerm: 'retrieveSearchData',
        selectedProcedure: 'retrieveSearchData',
        selectedFormStatus: 'retrieveSearchData'
    },
    mounted() {
        this.generalController = new GeneralController()
        this.retrieveContents()
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.retrieveContents()
        },
        async retrieveContents() {
            this.isLoading = true
            this.errorDetails = null
            const form = {
                search: this.searchTerm,
                procedure: this.selectedProcedure,
                common: this.selectedFormStatus
            }
            const response = await this.generalController.retrieveData('forms/v2/retrieve-forms', form, 'forms')
            this.data = response.data
            this.isLoading = false
        },
        async retrieveSearchData() {
            const form = {
                search: this.searchTerm,
                procedure: this.selectedProcedure,
                common: this.selectedFormStatus
            }
            const response = await this.generalController.retrieveData('forms/v2/retrieve-forms', form, 'forms')
            this.data = response.data
        },
        encrypt(data) {
            return btoa(data)
        },
        async viewForms(data) {
            this.form.form_code = data.form_code
            this.form.form_name = data.form_name
            this.form.fileID = null
            await this.$nextTick();
            if (data.document) {
                this.form.fileID = this.encrypt(data.document.id)
            }
        },
    },
}
</script>
