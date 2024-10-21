<template>
    <ion-content class="content-wrapper">
        <div>
            <p class="display-6 fw-bolder text-primary">PROCEDURES</p>
            <div class="row">
                <div class="col-md-8"> <!-- Adjusted column width -->
                    <ion-card class="mt-3">
                        <ion-card-content>
                            <div id="cusTable" class="table-wrapper mt-3">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th id="documentType" scope="col">PROCEDURE NAME</th>
                                            <!--   <th>FILE PASSWORD</th> -->
                                            <th id="actions" scope="col">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="procedures.length > 0">
                                            <tr v-for="(procedure, index) in procedures" :key="index">
                                                <td class="fw-bolder">{{ procedure.procedure_name }}</td>
                                                <!-- <td>
                                                    <label class="text-muted " v-if="procedure.file"
                                                        @click="copyToClipboard(procedure.file.password)">
                                                        {{ procedure.file.password }}
                                                    </label>
                                                </td> -->
                                                <td>
                                                    <a :href="procedure.file.file_link" v-if="procedure.file"
                                                        class="btn btn-primary btn-sm me-3" target="_blank">
                                                        OPEN PDF
                                                    </a>
                                                    <router-link class="btn btn-info text-white btn-sm me-3"
                                                        :to="{ name: 'admin-layout.procedure-view', params: { view: encrypt(procedure.id) } }">
                                                        VIEW
                                                    </router-link>
                                                    <span class="btn btn-danger btn-sm me-3"
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
                <div class="col-md-4">
                    <div class="add-form">
                        <CreateProcedure :departmentList="departments" />
                    </div>
                </div>
            </div>
        </div>
    </ion-content>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonCard, IonCardContent, IonContent, IonButton } from '@ionic/vue';
import CreateProcedure from './CreateProcedure.vue';
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
export default {
    name: 'AddProcedurePage',
    components: {
        IonCard, IonCardContent, IonContent, IonButton, CreateProcedure, ConfirmationAlert
    },
    data() {
        return {
            procedures: [],
            departments: [],
            selectedData: null,
        };
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    methods: {
        openPdf(procId) {
            axios.get(`retrieve-procedures/${procId}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then(response => {
                    const fileContent = response.data.procedure.file_path;
                    const pdfViewer = this.$refs.pdfViewer;
                    //console.log(response)
                    pdfViewer.src = fileContent;
                })
                .catch(error => {
                    console.error('Error fetching file content:', error);
                });
        },
        async fetchDataList(apiLink, columnName) {
            let returnData = []
            try {
                const response = await axios.get(apiLink, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
                returnData = response.data[columnName];
            } catch (error) {
                console.error('Error fetching for ' + columnName + ':', error);
                returnData = [];
            }
            return returnData
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
            this.selectedProcedure = data;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const formData = { fileID: data };
               /*  const response = await this.generalController.removeItem('procedure/file/remove', formData);
                await this.$showMessageBox("File Removed", response.data.data);
                window.location.reload() */
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
    async created() {
        this.departments = await this.fetchDataList('role-list', 'roles')
        this.procedures = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
    }

}
</script>