<template>
    <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
        <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
            refreshing-text="Refreshing...">
        </ion-refresher-content>
    </ion-refresher>
    <!-- TITLE HEADER -->
    <p class="display-6 fw-bolder text-primary">FORMS</p>
    <!-- CONTENT -->
    <div class="row">
        <div class="col-md-7">

            <div class="search-filter-bar">
                <ion-searchbar v-model="searchTerm" @ionInput="retriveForms"></ion-searchbar>
            </div>
            <div v-if="!isLoading">
                <div v-if="!errorDetails">
                    <div class="mt-3">
                        <div v-if="data.length > 0" class="content">
                            <ion-card v-for="form in data" :key="form.id">
                                <ion-card-header>
                                    <span class="text-primary fw-bolder h4">{{ form.form_name }}</span>
                                    <span class="text-muted fw-bolder h6">{{ form.form_code }}</span>
                                </ion-card-header>
                                <ion-footer>
                                    <div class="float-end m-2">
                                        <span class="btn btn-outline-danger btn-sm me-3"
                                            @click="removeForm(form)">REMOVE</span>
                                        <router-link class="btn btn-primary btn-sm me-3"
                                            :to="{ name: 'admin-layout.form-view-files', params: { view: encrypt(form.id) } }">
                                            SEE FORM
                                        </router-link>
                                    </div>

                                </ion-footer>
                            </ion-card>
                            <div class="mt-3 mb-3">
                                <PaginationComponent :currentPage="pagination.current" :totalPages="pagination.total"
                                    @change="data" />
                            </div>
                        </div>
                        <div v-else>
                            <ion-card>
                                <ion-card-header>
                                    <span v-if="searchTerm.length > 0" class="text-primary fw-bolder h4">NOT
                                        FOUND</span>
                                    <span v-else class="text-primary fw-bolder h4">NO DATA</span>
                                </ion-card-header>
                            </ion-card>
                        </div>
                    </div>

                </div>
                <div v-else>
                    <p class="badge bg-danger">{{ errorDetails }}</p>
                </div>
            </div>




        </div>
        <div class="col-md-5">
            <!-- CREATE FORMS -->
            <CreateForm :departmentList="departments" :procedureList="procedures" />
        </div>
    </div>
    <!-- COMPONENTS -->
    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled" header="Remove Form"
        :data="selectedData" />
    <ContentLoaderView :isOpen="isLoading" />

</template>
<script>
import { IonContent, IonFooter, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonCardHeader } from '@ionic/vue';
import CreateForm from '../Forms/widgets/CreateForms.vue'
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import PaginationComponent from '../../../components/widgets/PaginationComponent.vue';
import ContentLoaderView from '../../../components/widgets/ContentLoaderView.vue';
export default {
    name: 'FormsView',
    components: {
        IonContent, IonButton, IonSearchbar, IonInput, IonRefresher, IonRefresherContent,
        IonCard, IonCardContent, IonCardHeader, IonFooter,
        CreateForm, PaginationComponent, ConfirmationAlert, ContentLoaderView
    },
    data() {
        return {
            selectedData: [],
            isLoading: true,
            data: [],
            errorDetails: null,
            procedures: [],
            departments: [],
            searchTerm: '',
            pagination: {
                current: 1,
                total: 1
            }
        };
    },
    mounted() {
        this.retriveForms()
    },
    async created() {
        this.generalController = new GeneralController();
        this.departments = await this.generalController.retriveData('role-list', 'roles')
        this.procedures = await this.generalController.retriveData('/procedure/retrive-procedure', 'procedures')
    },
    methods: {
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Password copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        },
        encrypt(data) {
            return btoa(data)
        },
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
            this.refershFunction()
        },
        async retriveForms() {

            this.errorDetails = null
            this.details = []
            const response = await this.generalController.retriveData('forms/retrive-forms?search=' + this.searchTerm, 'forms')
            this.data = response.data
            //console.log(this.data.data)
            this.isLoading = false

        },
        async refershFunction() {
            this.retriveForms()
            this.departments = await this.fetchDataList('role-list', 'roles')
            this.procedures = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
        },
        removeForm(form) {
            this.selectedData = form;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const formData = { form_id: this.encrypt(data.id) };
                const response = await this.generalController.removeItem('forms/remove', formData);
                await this.$showMessageBox("Form Removed", response.data.data);
                this.refershFunction();
                //window.location.reload()
            } catch (error) {
                await this.$showMessageBox(error.code, error.message);
            } finally {
                await loading.dismiss();
            }
        },
        onCancelled() {
            console.log('Cancelled action');
        }
    },
}
</script>