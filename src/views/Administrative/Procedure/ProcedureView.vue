<template>
    <ion-content class="content-wrapper">
        <div>
            <p class="display-6 fw-bolder text-primary">PROCEDURES</p>
            <div class="row">
                <div class="col-md-8"> <!-- Adjusted column width -->

                    <div id="cusTable" class="table-wrapper mt-3">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th id="documentType" scope="col">PROCEDURE NAME</th>
                                    <th>FILE PASSWORD</th>
                                    <th id="actions" scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="procedures.length > 0">
                                    <tr v-for="(procedure, index) in procedures" :key="index">
                                        <td class="fw-bolder">{{ procedure.procedure_name }}</td>
                                        <td>
                                            <label class="text-muted "
                                                @click="copyToClipboard(procedure.file.password)">
                                                {{ procedure.file.password }}
                                            </label>
                                        </td>
                                        <td>
                                            <a :href="procedure.file.file_link" class="btn btn-primary btn-sm me-3"
                                                target="_blank">
                                                OPEN PDF
                                            </a>
                                            <router-link class="btn btn-info text-white btn-sm me-3"
                                                :to="{ name: 'admin-layout.procedure-view', params: { view: encrypt(procedure.id) } }">
                                                VIEW
                                            </router-link>
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
                    </div>
                </div>
                <div class="col-md-4"> <!-- Adjusted column width -->
                    <!--    <div class="pdf-viewer-container">
              <iframe id="pdfViewer" class="pdf-viewer" ref="pdfViewer"></iframe>
            </div> -->
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
import { IonContent, IonButton } from '@ionic/vue';
import CreateProcedure from './CreateProcedure.vue';
export default {
    name: 'AddProcedurePage',
    components: {
        IonContent, IonButton, CreateProcedure
    },
    data() {
        return {
            procedures: [],
            departments: []
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
        }
    },
    async created() {
        this.departments = await this.fetchDataList('role-list', 'roles')
        this.procedures = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
    }

}
</script>