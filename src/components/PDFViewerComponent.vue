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
                <div class="button-tool float-end mb-3">
                    <ion-button size="default" shape="round" @click="printPdf">
                        <ion-icon slot="icon-only" size="small" :icon="print"></ion-icon>
                    </ion-button>
                    <ion-button size="default" shape="round" @click="donwloadFile">
                        <ion-icon slot="icon-only" size="small" :icon="downloadSharp"></ion-icon>
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
</style>

<script>

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/vue';
import axios from 'axios';
import { GeneralController } from '../controller/GeneralContorller';
import { print, download, downloadSharp } from 'ionicons/icons';
export default {
    props: {
        pdfUrl: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true
        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton },
    data() {
        return {
            pdfDoc: null,
            pageNum: 1,
            numPages: 0,
            error: null,
            errorMessage: null,
            print, download, downloadSharp
        };
    },
    methods: {
        async loadFile() {
            this.error = null;
            try {
                const response = await this.generalController.retriveFile(this.link, { link: this.pdfUrl });
                console.log(response)
                /*   const response = await axios.post(this.link, { link: this.pdfUrl }, {
                      responseType: 'blob' // Important to handle the file as binary
                  }); */
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                this.pdfDoc = url; // Store the URL without fragments
                console.log(this.pdfDoc);
            } catch (error) {
                console.error(error);
                this.error = 'Unable to load PDF. Check the password or PDF file.';
                this.errorMessage = error.message;
            }
        },
        printPdf() {
            if (this.pdfDoc) {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = this.pdfDoc;
                document.body.appendChild(iframe);
                iframe.contentWindow.print();
            } else {
                console.error('No PDF document available for printing.');
            }
        },
    },
    mounted() {
        this.generalController = new GeneralController();
        this.loadFile()

        //window.addEventListener("keydown", this.disableBackNavigation);
    },
};
</script>
