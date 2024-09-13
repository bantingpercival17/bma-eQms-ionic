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
            <p class="display-6 fw-bolder text-primary">{{ details.procedure_name }}</p>
            <div class="row">
                <div class="col-md-5">
                    <AddProcedureFile :token="token" :procedure="encrypt(details.id)" />
                    <ion-card class="mt-3">
                        <ion-card-content>
                            <div class="table-responsive">
                                <table id="basic-table" class="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th id="documentType" scope="col">VERSION NUMBER</th>
                                            <th>FILE PASSWORD</th>
                                            <th id="actions" scope="col">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="details.files.length > 0">
                                            <tr v-for="(procedure, index) in details.files" :key="index">
                                                <td class="fw-bolder">{{ procedure.version }}</td>
                                                <td>
                                                    <label class="text-muted "
                                                        @click="copyToClipboard(procedure.password)">
                                                        {{ procedure.password }}
                                                    </label>
                                                </td>
                                                <td>
                                                    <span @click="openPDF(procedure.file_link)"
                                                        class="btn btn-primary btn-sm me-3">VIEW PDF</span>
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
                        </ion-card-content>
                    </ion-card>
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
        <p class="badge bg-info">CONNECTING TO NETWORK</p>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent } from '@ionic/vue';
import AddProcedureFile from '../Procedure/widgets/AddProcedureFile.vue'
export default {
    name: 'ProcedureFile',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent,
        AddProcedureFile
    },
    data() {
        return {
            isLoading: true,
            details: [],
            errorDetails: null
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
        })
    },
    mounted() {
        this.retriveProcedure(this.$route.params.view)
    },
    methods: {
        async retriveProcedure(data) {
            this.isLoading = true
            this.errorDetails = null
            this.details = []
            axios.get(`procedure/retrive-procedure/${data}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.details = response.data.procedure
                    this.isLoading = false
                })
                .catch(error => {
                    this.errorDetails = error
                    console.error('Error fetching file content:', error);
                    this.isLoading = false
                });
        },
        async handleScroll(event) {
            event.target.complete();
            this.retriveProcedure(this.$route.params.view)
        },
        encrypt(data) {
            return btoa(data)
        },
        openPDF(fileContent) {
            const pdfViewer = this.$refs.pdfViewer;
            //console.log(response)
            pdfViewer.src = fileContent;
        }, copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Password copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        },
    },
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