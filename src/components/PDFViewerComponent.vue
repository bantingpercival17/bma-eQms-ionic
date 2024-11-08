<template>
    <div>
        <div v-if="error" class="mt-3">
            <ion-card color="danger">
                <ion-card-header>
                    <ion-card-title>PDF DISPLAY ERROR</ion-card-title>
                    <ion-card-subtitle>{{ error }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>{{ errorMessage }}</ion-card-content>
            </ion-card>
        </div>
        <div v-else>
            <div class="full-screen-container-a">
                <route-link v-if="model == 'FormDocuments'" class="btn btn-outline-info btn-sm float-end">CREATE
                    REQUEST FORM
                </route-link>
                <div class="interaction-group" aria-label="Social interaction stats" role="group">
                    <!-- Views (non-interactive link) -->
                    <ion-button fill="clear" aria-label="Views">
                        <ion-icon :icon="eyeOutline" size="small"></ion-icon>
                        <span>{{ analyticData ? analyticData.viewedLogs : 0 }}</span>
                    </ion-button>
                    <!-- Download -->
                    <ion-button fill="clear" aria-label="Download-Count" @click="downloadFile">
                        <ion-icon :icon="downloadOutline" size="meduim"></ion-icon>
                        <span>{{ analyticData ? analyticData.downloadLogs : '' }}</span>
                    </ion-button>

                    <!-- Print -->
                    <ion-button fill="clear" aria-label="Print Count" @click="printPdf">
                        <ion-icon :icon="printOutline" size="small"></ion-icon>
                        <span>{{ analyticData ? analyticData.printLogs : '' }}</span>
                    </ion-button>
                </div>

                <iframe v-if="pdfDoc" :src="`${pdfDoc}#toolbar=0&navpanes=0`" class=" full-screen-iframe"
                    frameborder="0" @contextmenu.prevent></iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.full-screen-container {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    /* Prevent scrollbars */
}

.full-screen-iframe {
    width: 100%;
    height: 100vh;
    border: none;
    /* Remove iframe border */
}

.interaction-group {
    display: flex;
    /*  justify-content: space-between; */
    /*   padding: 10px; */
}

ion-button span {
    margin-left: 5px;
    font-size: 16px;
}
</style>

<script>

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { GeneralController } from '../controller/GeneralContorller';
import { print, download, downloadSharp, eyeOutline, downloadOutline, printOutline } from 'ionicons/icons';
export default {
    props: {
        fileID: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true
        },
        model: {
            type: String,
            requred: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonItem, IonLabel },
    data() {
        return {
            pdfDoc: null,
            pageNum: 1,
            numPages: 0,
            error: null,
            errorMessage: null,
            analyticData: [],
            print, download, downloadSharp, eyeOutline, downloadOutline, printOutline
        };
    },
    methods: {
        async analiytics() {
            await this.generalController.retriveAnalytics(this.model, { value: this.fileID })
                .then(response => {
                    this.analyticData = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async loadFile() {
            this.error = null;
            try {
                const response = await this.generalController.retriveFile(this.link, { link: this.fileID });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                this.pdfDoc = url; // Store the URL without fragments
            } catch (error) {
                console.error(error);
                this.error = 'Unable to load PDF. Check the password or PDF file.';
                this.errorMessage = error.message;
            }
        },
        printPdf() {
            if (this.pdfDoc) {
                this.generalController.printLog(this.model, { value: this.fileID })
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = this.pdfDoc;
                document.body.appendChild(iframe);
                iframe.contentWindow.print();
                this.analiytics()
            } else {
                console.error('No PDF document available for printing.');
            }
        },
        async downloadFile() {
            const loading = await this.$showLoading();
            this.generalController.downloadFile(this.model, { value: this.fileID })
                .then(async (response) => {
                    const filename = this.filename + ' - ' + Date.now() + '.pdf'
                    // Create a URL for the blob response
                    await loading.dismiss();
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename); // Specify the file name
                    document.body.appendChild(link);
                    link.click();
                    this.analiytics()
                })
                .catch((error) => {
                    console.error('Error downloading file:', error);
                    alert('Error downloading file. Please try again later.');
                });
        }


    },
    mounted() {
        this.generalController = new GeneralController();
        this.loadFile()
        this.analiytics()
        //window.addEventListener("keydown", this.disableBackNavigation);
    },
};
</script>
