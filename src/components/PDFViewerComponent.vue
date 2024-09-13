<template>
    <div>


        <p class="badge bg-info mt-2">Page {{ pageNum }} of {{ numPages }}</p>
        <div class="float-end">
            <button class="btn btn-secondary btn-sm me-3" @click="prevPage" :disabled="pageNum <= 1">Previous</button>
            <button class="btn btn-primary btn-sm" @click="nextPage" :disabled="pageNum >= numPages">Next</button>
        </div>

        <br>
        <div v-if="error" class="mt-3">
            <ion-card color="danger">
                <ion-card-header>
                    <ion-card-title>PDF DISPLAY ERROR</ion-card-title>
                    <ion-card-subtitle>{{ error }}</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content> {{ errorMessage }} </ion-card-content>
            </ion-card>

        </div>
        <canvas ref="pdfCanvas" v-else>
        </canvas>
    </div>
</template>
<style scoped>
/* .scorm-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
} */

canvas {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>
<script>
import * as pdfjsLib from 'pdfjs-dist';
/* import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.js';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
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
        async loadPdf(url, password) {
            try {
                const loadingTask = pdfjsLib.getDocument({
                    url: url,
                    password: password,
                });

                loadingTask.onPassword = (updatePassword, reason) => {
                    if (reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
                        this.error = "Incorrect password";
                    }
                };

                this.pdfDoc = await loadingTask.promise;
                this.numPages = this.pdfDoc.numPages;
                this.renderPage(this.pageNum);
            } catch (e) {
                this.error = "Failed to load PDF";
                this.errorMessage = /* e.details + " " + */ e.message
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
        this.loadPdf(this.pdfUrl, this.pdfPassword);
    },
};
</script>
