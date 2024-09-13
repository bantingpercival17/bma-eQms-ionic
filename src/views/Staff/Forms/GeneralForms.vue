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
            <p class="display-6 fw-bolder text-primary">{{ pageTitle }}</p>
            <div class="row">
                <div class="col-md-5">
                    <div v-if="data.length > 0">
                        <ion-card v-for="(item, index) in data" :key="index">
                            <ion-card-content @click="openPDF(item.document.file_link, item.document.password)">
                                <small class="text-muted fw-bolder">{{ item.form_code }}</small>
                                <br>
                                <label for="" class="fw-bolder text-primary h6">{{ item.form_name }}</label>
                            </ion-card-content>
                        </ion-card>
                    </div>
                    <div v-else>
                        <ion-card>
                            <ion-card-content>
                                <label for="" class="fw-bolder text-primary h6">NO CONTENT</label>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </div>
                <div class="col-md-7">
                    <ion-card>
                        <ion-card-content>
                            <div class="pdf-viewer-container" v-if="link">
                                <PDFViewerComponent :pdfUrl="link" :pdfPassword="password" />
                                <!--   <iframe id="pdfViewer" class="pdf-viewer" ref="pdfViewer"></iframe> -->
                            </div>
                        </ion-card-content>
                    </ion-card>
                </div>
            </div>

        </div>
        <div v-else>
            <p class="badge bg-danger">{{ errorDetails }}</p>
        </div>
    </div>
    <div v-else>
        <p class="badge bg-info">LOADING CONTENTS</p>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent } from '@ionic/vue';
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
export default {
    name: 'GeneralForms',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, PDFViewerComponent
    },
    data() {
        return {
            pageTitle: 'GENERAL FORMS',
            data: [],
            isLoading: true,
            link: "",
            password: "",
            errorDetails: null,
            retriveContentLink: '/forms/retrive-general-forms'
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
        })
    },
    mounted() {
        this.retriveContents()
    },
    methods: {
        async retriveContents() {
            this.isLoading = true
            this.errorDetails = null
            this.data = []
            axios.get(this.retriveContentLink, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.data = response.data.forms
                    this.isLoading = false
                })
                .catch(error => {
                    this.errorDetails = error
                    console.error('Error fetching file content:', error);
                    this.isLoading = false
                });
        },
        async handleScroll(event) {
            event.target.complete();
            this.retriveContents()
        },
        encrypt(data) {
            return btoa(data)
        },
        async openPDF(fileContent, password) {
            navigator.clipboard.writeText(password).then(() => {
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
            /*
              const pdfViewer = this.$refs.pdfViewer;
               pdfViewer.src = fileContent;
                 pdfViewer.password = password
            */

            this.link = fileContent;
            this.password = password
            console.log(fileContent, password)

        },
    },
}
</script>
