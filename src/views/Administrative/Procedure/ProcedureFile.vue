<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">{{ details.procedure_name }}</p>
            <div class="row">
                <div class="col-md-7">
                    <ion-card>
                        <ion-card-content>
                            <div class="pdf-viewer-container">
                                <PDFViewerComponent v-if="form.link" :fileID="form.link"
                                    :filename="details.procedure_code" model="ProcedureDocuments" />
                                <div class="content-framce" v-else>
                                    <label for="" class="fw-bolder text-primary h3">SELECT FILES</label>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>
                    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                        header="Remove File" :data="selectedProcedure" />
                </div>
                <div class="col-md-5">
                    <AddProcedureFile :token="token" :procedure="encrypt(details.id)" />
                    <div class="content-list">
                        <label for="" class="text-primary fw-bolder h6">LIST OF FILE VERSION</label>
                        <div v-if="details.files.length > 0" class="list">
                            <ion-card v-for="item in details.files" :key="item.id">
                                <ion-card-content>
                                    <div class="float-end">
                                        <ion-button size="default" color="primary" @click="viewItem(item)">
                                            <ion-icon slot="icon-only" size="small" :icon="eye"></ion-icon>
                                        </ion-button>
                                        <ion-button size="default" color="danger" @click="deleteItem(item)">
                                            <ion-icon slot="icon-only" size="small" :icon="trashSharp"></ion-icon>
                                        </ion-button>
                                    </div>

                                    <span class="text-primary fw-bolder">VERSION {{ item.version }}</span>
                                    <br>
                                    <span class="fw-bolder text-muted">
                                        {{ item.created_at }}
                                    </span>

                                </ion-card-content>
                            </ion-card>
                        </div>
                        <ion-card v-else>
                            <ion-card-content>
                                <span class="text-primary fw-bolder h4">NO DATA</span>
                            </ion-card-content>
                        </ion-card>
                    </div>
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
import { IonContent, loadingController, alertController, IonRefresher, IonRefresherContent, IonCard, IonIcon, IonButton, IonCardContent } from '@ionic/vue';
import AddProcedureFile from '../Procedure/widgets/AddProcedureFile.vue'
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import { trashSharp, eye } from 'ionicons/icons';
export default {
    name: 'ProcedureFile',
    components: {
        IonContent, loadingController, alertController, IonRefresher, IonRefresherContent, IonCard, IonIcon, IonButton, IonCardContent,
        AddProcedureFile, PDFViewerComponent, ConfirmationAlert,
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
            trashSharp, eye
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
                this.viewItem(this.details.files[0])
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
        async viewItem(data) {
            this.contentLoading = true;
            this.form.link = null; // Reset fileLink to trigger reactivity
            console.log(data.id)
            await this.$nextTick(); // Wait for the DOM to update/react to the null assignment
            this.form.link = this.encrypt(data.id);
            this.contentLoading = false;

        },
        async deleteItem(data) {
            this.selectedProcedure = data;
            this.$refs.confirmationAlert.showAlert();
        },
        /* openPDF(fileContent) {
            // Set the link to null to clear the previous PDF
            this.form.link = null;

            // Set the new PDF file link after 5 seconds (5000 milliseconds)
            setTimeout(() => {
                this.form.link = fileContent;
            }, 5000);
        },
        showConfirmation(data) {
            this.selectedProcedure = data;
            this.$refs.confirmationAlert.showAlert();
        }, */
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