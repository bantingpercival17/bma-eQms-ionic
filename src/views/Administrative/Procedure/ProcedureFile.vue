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
                                            <th id="actions" scope="col">ACTIONS</th>
                                            <th id="documentType" scope="col">VERSION NUMBER</th>
                                            <th>FILE PASSWORD</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="details.files.length > 0">
                                            <tr v-for="(procedure, index) in details.files" :key="index">
                                                <td>
                                                    <span @click="openPDF(encrypt(procedure.id))"
                                                        class="btn btn-primary btn-sm me-3">VIEW PDF</span>

                                                    <span class="btn btn-danger btn-sm me-3"
                                                        @click="showConfirmation(procedure)">REMOVE</span>
                                                </td>
                                                <td class="fw-bolder">{{ procedure.version }}</td>
                                                <td>
                                                    <label class="text-muted "
                                                        @click="copyToClipboard(procedure.password)">
                                                        {{ procedure.password }}
                                                    </label>
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
                                <PDFViewerComponent v-if="form.link" :pdfUrl="form.link" />
                                <div class="content-framce" v-else>
                                    <label for="" class="fw-bolder text-primary h3">SELECT FILES</label>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>
                    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                        header="Remove File" :data="selectedProcedure" />
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
import { IonContent, loadingController, alertController, IonRefresher, IonRefresherContent, IonCard, IonCardContent } from '@ionic/vue';
import AddProcedureFile from '../Procedure/widgets/AddProcedureFile.vue'
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
export default {
    name: 'ProcedureFile',
    components: {
        IonContent, loadingController, alertController, IonRefresher, IonRefresherContent, IonCard, IonCardContent,
        AddProcedureFile, PDFViewerComponent, ConfirmationAlert
    },
    data() {
        return {
            isLoading: true,
            details: [],
            errorDetails: null,
            form: {
                link: null,
                password: null
            },
            selectedProcedure: null,
        };
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
        })
    },
    created() {
        this.generalController = new GeneralController();
        this.fetchProcedure();
    },
    methods: {
        async fetchProcedure() {
            this.isLoading = true;
            this.errorDetails = null;
            this.details = [];
            try {
                const response = await axios.get(`procedure/retrive-procedure/${this.$route.params.view}`, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                this.details = response.data.procedure;
            } catch (error) {
                this.errorDetails = error;
                console.error('Error fetching file content:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async handleScroll(event) {
            event.target.complete();
            await this.fetchProcedure();
        },
        encrypt(data) {
            return btoa(data);
        },
        openPDF(fileContent) {
            this.form.link = null
            /*  setInterval(() => {
                 this.form.link = null
             }, 100); */
            this.form.link = fileContent

        },
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                alert('Password copied to clipboard');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        },
        showConfirmation(data) {
            this.selectedProcedure = data;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const formData = { fileID: data.id };
                const response = await this.generalController.removeItem('procedure/file/remove', formData);
                await this.$showMessageBox("File Removed", response.data.data);
                this.fetchProcedure();
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

<style scoped>
.content-frame {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}

iframe {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>