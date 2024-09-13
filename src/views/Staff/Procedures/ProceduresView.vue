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
            <p class="display-6 fw-bolder text-primary">PROCEDURES</p>
            <div class="row">
                <div class="col-md-4">
                    <!--   <AddProcedureFile :token="token" :procedure="encrypt(details.id)" /> -->
                    <ion-card class="mt-3">
                        <ion-card-content>
                            <div class="table-responsive">
                                <table id="basic-table" class="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th class="">
                                                <p class="text-primary fw-bolder h3">GENERAL PROCEDURES</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="data.length > 0">
                                            <tr v-for="(form, index) in data" :key="index">
                                                <td>
                                                    <label @click="openPDF(form.file.file_link, form.file.password)"
                                                        class="text-primary fw-bolder" tooltip="Click To view">
                                                        {{ form.procedure_name }}
                                                    </label>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td colspan="1">No Data</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </ion-card-content>
                    </ion-card>
                    <ion-card class="mt-3">
                        <ion-card-content>
                            <div class="table-responsive">
                                <table id="basic-table" class="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th class="">
                                                <p class="text-primary fw-bolder h3">DEPARTMENTAL PROCEDURES</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="departments.length > 0">
                                            <tr v-for="(form, index) in departments" :key="index">
                                                <td>
                                                    <label @click="openPDF(form.file.file_link, form.file.password)"
                                                        class="text-primary fw-bolder" tooltip="Click To view">
                                                        {{ form.procedure_name }}
                                                    </label>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td colspan="1">No Data</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </ion-card-content>
                    </ion-card>
                </div>
                <div class="col-md-8">
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
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, } from '@ionic/vue';
export default {
    name: 'ProcedureView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent,
    },
    data() {
        return {
            isLoading: true,
            data: [],
            errorDetails: null,
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
        openPDF(fileContent, password) {
            navigator.clipboard.writeText(password).then(() => {

            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
            const pdfViewer = this.$refs.pdfViewer;
            //console.log(response)
            pdfViewer.src = fileContent;
            pdfViewer.password = password

        },
    },
    mounted() {
        this.retriveForms()
    },
    async created() {
        //this.data = await this.fetchDataList('/procedure/retrive-procedure/v2/general', 'procedures')
        this.departments = await this.fetchDataList('/procedure/retrive-procedure/v2/department', 'procedures')
    }

}
</script>

<style scoped>
/* .scorm-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
} */

iframe {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>