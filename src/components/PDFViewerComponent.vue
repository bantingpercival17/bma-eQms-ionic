<template>
    <div>


        <div v-if="error" class="mt-3">
            <ion-card color="danger">
                <ion-card-header>
                    <ion-card-title>PDF DISPLAY ERROR</ion-card-title>
                    <ion-card-subtitle>{{ error }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content> {{ errorMessage }} </ion-card-content>
            </ion-card>

        </div>
        <div v-else>
            <p class="badge bg-info mt-2">Page {{ pageNum }} of {{ numPages }}</p>
            <div class="float-end">
                <button class="btn btn-secondary btn-sm me-3" @click="prevPage"
                    :disabled="pageNum <= 1">Previous</button>
                <button class="btn btn-primary btn-sm" @click="nextPage" :disabled="pageNum >= numPages">Next</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
canvas {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>
<script>
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';  // Use the local worker file

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import axios from 'axios';
export default {
    props: {
        pdfUrl: {
            type: String,
            required: true,
        },
        pdfPassword: {
            type: String,
            default: '',
        },
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
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
        async loadPdf(url) {
            try {
                try {
                    const loadingTask = pdfjsLib.getDocument({
                        url: url,
                       /*  password: this.pdfPassword // Add the password here */
                    });

                    // Handle incorrect password scenario
                    loadingTask.onPassword = (updatePasswordCallback) => {
                        // If a wrong password is entered or re-prompt is needed
                        const userEnteredPassword = prompt("This document is password protected. Please enter the password:");
                        updatePasswordCallback(userEnteredPassword);
                    };

                    this.pdfDoc = await loadingTask.promise;
                    this.numPages = this.pdfDoc.numPages;
                    this.renderPage(this.pageNum);
                } catch (e) {
                    if (e.name === 'PasswordException') {
                        this.error = "Incorrect password or failed to open the PDF.";
                    } else {
                        this.error = "Failed to load PDF";
                    }
                    console.error(e);
                }
            } catch (e) {
                if (e.name === 'PasswordException') {
                    this.error = "Incorrect password or failed to open the PDF.";
                } else {
                    this.error = "Failed to load PDF";
                }
                console.error(e);
            }
        },
        async renderPage(num) {
            const page = await this.pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = this.$refs.pdfCanvas;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
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
        // this.setupPdfWorker();;
        this.loadPdf(this.pdfUrl);
    },
};
</script>
