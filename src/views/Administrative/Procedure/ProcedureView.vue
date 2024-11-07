<template>
    <ion-content class="content-wrapper">
        <div>
            <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
                <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                    refreshing-text="Refreshing...">
                </ion-refresher-content>
            </ion-refresher>
            <p class="display-6 fw-bolder text-primary">PROCEDURES</p>
            <div class="row">
                <div class="col-md-8"> <!-- Adjusted column width -->
                    <div v-if="!isLoading">
                        <ion-card class="mt-3">
                            <ion-card-content>
                                <div class="table-responsive">
                                    <table id="basic-table" class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th id="documentType" scope="col">PROCEDURE NAME</th>
                                                <!--   <th>FILE PASSWORD</th> -->
                                                <th id="actions" scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="!dataTable">
                                            <tr>
                                                <td colspan="2" class="text-center"><ion-spinner name="dots"
                                                        color="success"></ion-spinner></td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <template v-if="procedures.length > 0">
                                                <tr v-for="(procedure, index) in procedures" :key="index">
                                                    <td class="fw-bolder">{{ procedure.procedure_name }}</td>
                                                    <td>
                                                        <router-link class="btn btn-info text-white btn-sm me-3"
                                                            :to="{ name: 'admin-layout.procedure-view', params: { view: encrypt(procedure.id) } }">
                                                            VIEW
                                                        </router-link>
                                                        <span class="btn btn-outline-danger btn-sm  me-3"
                                                            @click="showConfirmation(procedure)">REMOVE</span>
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                <tr>
                                                    <td colspan="3">No Data</td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed"
                                        @cancelled="onCancelled" header="Remove Procedure" :data="selectedData" />
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </div>
                    <div v-else>
                        <p class="badge bg-info">CONNECTING TO NETWORK</p>
                    </div>

                </div>
                <div class="col-md-4">
                    <div class="add-form">
                        <CreateProcedure :departmentList="departments" :proceduresList="procedureList" />
                    </div>
                </div>
            </div>
        </div>

    </ion-content>
</template>
<script>
import { IonCard, IonCardContent, IonContent, IonButton, IonSpinner, IonRefresher, IonRefresherContent, } from '@ionic/vue';
import CreateProcedure from './CreateProcedure.vue';
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
export default {
    name: 'AddProcedurePage',
    components: {
        IonCard, IonCardContent, IonContent, IonButton, CreateProcedure, ConfirmationAlert, IonSpinner, IonRefresher, IonRefresherContent,
    },
    data() {
        return {
            isLoading: true,
            procedures: [],
            departments: [],
            procedureList: [],
            selectedData: null,
            dataTable: false,
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
            await this.loadProcedures();
        },
        async loadProcedures() {
            this.procedures = await this.generalController.retriveData('procedure/retrive', 'procedures')
            this.dataTable = true
            this.isLoading = false
        },
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
        showConfirmation(data) {
            this.selectedData = data;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const formData = { procedureID: this.encrypt(data.id) };
                console.log(formData)
                this.dataTable = false
                const response = await this.generalController.removeItem('procedure/remove', formData);
                await this.$showMessageBox("Deletion Completed", response.data.data);
                //window.location.reload()
            } catch (error) {
                await this.$showMessageBox(error.code, error.message);
            } finally {
                await loading.dismiss();
            }
            this.loadProcedures()
        },
        onCancelled() {
            console.log('Cancelled action');
        },

    },
    async created() {
        this.generalController = new GeneralController();
        this.departments = await this.generalController.retriveData('department-list', 'departments')
        this.procedureList = await this.generalController.retriveData('procedure/retrive/list', 'procedures')
        this.loadProcedures()
    },


}
</script>