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
            <p class="badge bg-info mt-2">Page {{ pageNum }} of {{ numPages }}</p>
            <div class="float-end">
                <button class="btn btn-secondary btn-sm me-3" @click="prevPage"
                    :disabled="pageNum <= 1">Previous</button>
                <button class="btn btn-primary btn-sm" @click="nextPage" :disabled="pageNum >= numPages">Next</button>
            </div>
            <!-- Add the canvas element for the PDF -->
            <!--  <canvas class="canvas" ref="pdfCanvas"></canvas> -->
            <pdf :src="pdfUrl">
                <slot name="loading">
                    loading content here...
                </slot>
            </pdf>
        </div>
    </div>
</template>

<style scoped>
.canvas {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>

<script>
import pdf from 'pdfvuer'
import 'pdfjs-dist/build/pdf.worker.entry' // not needed since v1.9.1

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import axios from 'axios';

export default {
    props: {
        pdfUrl: {
            type: String,
            required: true,
        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, pdf },
    data() {
        return {
            pdfDoc: null,
            pageNum: 1,
            numPages: 0,
            error: null,
            errorMessage: null,
        };
    },
    methods: {
        async getFile() {
            this.error = null; // Reset the error before starting the request

            try {
                const response = await axios.post('/open-pdf', { link: this.pdfUrl }/* , { responseType: 'blob' } */);

                // Create a Blob from the response (PDF data)
                /*  const file = new Blob([response.data], { type: 'application/pdf' }); */
                this.pdfUrl = response.data.file

                // Load the PDF using pdfjsLib
                const loadingTask = pdfjsLib.getDocument(file);
                const pdf = await loadingTask.promise;

                this.pdfDoc = pdf; // Store the loaded PDF document
                this.numPages = pdf.numPages; // Get total number of pages
                console.log(this.numPages)

                // Render the first page (starts at 1)
                this.renderPage(1);
            } catch (error) {
                console.error(error);
                this.error = 'Unable to load PDF. Check the password or PDF file.';
                this.errorMessage = error.message;
            }
        },

        // Method to render a PDF page
        async renderPage(pageNumber) {
            try {
                const page = await this.pdfDoc.getPage(pageNumber); // Get the page
                const canvas = document.getElementById('pdf-canvas');
                const context = canvas.getContext('2d');

                const viewport = page.getViewport({ scale: 1.5 }); // You can adjust the scale
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                await page.render(renderContext).promise; // Render the page
            } catch (error) {
                console.error("Error rendering page:", error);
                this.error = 'Unable to render PDF page.';
            }
        },


        nextPage() {
            if (this.pageNum < this.numPages) {
                this.pageNum++;
                this.renderPage(this.pageNum);
            }
        },

        prevPage() {
            if (this.pageNum > 1) {
                this.pageNum--;
                this.renderPage(this.pageNum);
            }
        },
    },

    mounted() {
        this.getFile();
    },
};
</script>
