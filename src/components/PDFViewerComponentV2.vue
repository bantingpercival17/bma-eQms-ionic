<template>
  <div>
    <!--   <iframe :src="pdfUrl" frameborder="0"></iframe> -->
    <canvas ref="pdfCanvas" v-if="isPasswordCorrect"></canvas>
    <p v-if="error">{{ error }}</p>
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
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pdfLink: null,
      password: this.password,
      isPasswordCorrect: false,
      error: '',
    };
  },

  methods: {
    openPdf() {
      axios.post('/open-pdf', {
        link: this.pdfUrl // You can pass this dynamically
      }, {
        responseType: 'blob' // Get the response as a blob
      }).then(response => {
        // Create a blob URL for the PDF
        console.log(response.data)
        /*   const file = new Blob([response.data], { type: 'application/pdf' });
          this.pdfLink = URL.createObjectURL(file);
   */
        // Call function to render PDF in viewer
        /*    this.renderPdf(); */
      }).catch(error => {
        console.error("Error opening PDF:", error);
      });
    },
    renderPdf() {
      // Use pdfjs-dist to render the PDF
      const loadingTask = pdfjsLib.getDocument({ url: this.pdfUrl, password: this.password });

      loadingTask.promise.then(pdf => {
        console.log('PDF loaded');

        // Get the first page
        pdf.getPage(1).then(page => {
          console.log('Page loaded');

          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = this.$refs.pdfCanvas;
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext).promise.then(() => {
            console.log('Page rendered');
          });
        });
      }).catch(error => {
        console.error('Error rendering PDF:', error);
      });
    }
  },
  mounted() {
    // Call the function to open the PDF when the component is mounted
    this.renderPdf();
  }

};
</script>
