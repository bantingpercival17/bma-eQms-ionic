<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div v-if="!errorDetails">
            <p class="h5 fw-bolder text-muted">{{ contentItem.form_code }}</p>
            <p class="display-6 fw-bolder text-primary">{{ contentItem.form_name }}</p>

            <div class="row">
                <div class="col-md-7">
                    <ion-card style="height: 100%;">
                        <ion-card-content>
                            <div class="pdf-viewer-container" v-if="!contentLoading">
                                <PDFViewerComponent v-if="fileDetails.fileLink" :fileID="fileDetails.fileLink"
                                    :link="fileDetails.axiosLink" :filename="fileDetails.filename"
                                    model="FormDocuments" />
                                <div class="content-framce" v-else>
                                    <label for="" class="fw-bolder text-primary h3">SELECT FILES</label>
                                </div>
                            </div>
                            <div v-else class="content-loading text-center">
                                <div class="spinner-container">
                                    <ion-spinner name="lines" size="large" color="success"></ion-spinner>
                                </div>
                            </div>
                        </ion-card-content>
                    </ion-card>

                </div>
                <div class="col-md-5">
                    <UploadFormFile :module="encrypt(contentItem.id)" />
                    <div class="content-list">
                        <label for="" class="text-primary fw-bolder h6">LIST OF FILE VERSION</label>
                        <div v-if="contentList.length > 0" class="list">
                            <ion-card v-for="item in contentList" :key="item.id">
                                <ion-card-content>
                                    <div class="float-end">
                                        <ion-button size="default" color="primary" @click="() => viewItem(item)">
                                            <ion-icon slot="icon-only" size="small" :icon="eye"></ion-icon>
                                        </ion-button>
                                        <ion-button size="default" color="danger" @click="() => deleteItem(item)">
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

        </div>
    </div>
    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled" header="Remove File"
        :data="removeData" />
    <ContentLoaderView :isOpen="isLoading" />

</template>
<style>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}


.spinner-container ion-spinner {
    width: 64px;
    height: 64px;
}
</style>
<script>
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonIcon, IonSpinner } from '@ionic/vue';
import ContentLoaderView from '../../../components/widgets/ContentLoaderView.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import UploadFormFile from './widgets/UploadFormFile.vue';
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import { trashSharp, eye } from 'ionicons/icons';
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
export default {
    name: 'FormsFileView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonIcon, IonSpinner,
        ContentLoaderView,
        UploadFormFile,
        PDFViewerComponent,
        ConfirmationAlert
    },
    data() {
        return {
            isLoading: true,
            contentItem: [],
            contentList: [],
            contentLoading: false,
            errorDetails: '',
            fileDetails: {
                fileLink: null,
                axiosLink: 'forms/retrive/file/',
                filename: null
            },
            trashSharp,
            eye,
            removeData: []
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.contentLoading = true
            this.retriveDataList()
        },
        encrypt(data) {
            return btoa(data)
        },
        async retriveDataList() {
            const response = await this.generalController.retriveData(`/forms/retrive/${this.$route.params.view}`, 'forms')
            this.contentItem = response
            this.contentList = response.documents
            this.viewItem(this.contentList[0])
            this.isLoading = false
            this.contentLoading = false
        },
        async viewItem(data) {
            this.contentLoading = true;
            this.fileDetails.fileLink = null; // Reset fileLink to trigger reactivity
            this.fileDetails.filename = null
            setInterval(() => {
                this.fileDetails.fileLink = this.encrypt(data.id);
                this.fileDetails.filename = this.contentItem.form_code
                this.contentLoading = false;
            }, 1000);

        },
        async deleteItem(data) {
            this.removeData = data;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const formData = { file_id: this.encrypt(data.id) };
                const response = await this.generalController.removeItem('/forms/delete-forms/file', formData);
                await this.$showMessageBox("File Removed", response.data.data);
                this.retriveDataList()

            } catch (error) {
                await loading.dismiss();
                await this.$showMessageBox(error.code, error.message);
            } finally {
                await loading.dismiss();
            }
        },
        onCancelled() {
            console.log('Cancelled action');
        }
    },
    mounted() {
        this.retriveDataList()
    },
    async created() {
        this.generalController = new GeneralController();
    }

}
</script>