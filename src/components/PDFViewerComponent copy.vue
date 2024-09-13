<template>
    <div>
        <iframe :src="pdfUrl"></iframe>
        <!-- <canvas ref="pdfCanvas"></canvas> -->
    </div>
</template>
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
<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

// Set worker URL for pdfjs-dist
GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.js';

export default {
    name: 'PDFViewerComponent',
    props: {
        pdfUrl: String,
        pdfPassword: String
    },
    methods: {
        async loadPdf() {
            try {
                const loadingTask = getDocument({
                    url: this.pdfUrl,
                    password: this.pdfPassword
                });

                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

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
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        }
    },
    mounted() {
        /*   this.loadPdf(); */
    }
};
</script>
