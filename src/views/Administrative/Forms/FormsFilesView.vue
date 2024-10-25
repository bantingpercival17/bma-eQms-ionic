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

                </div>
                <div class="col-md-5">
                    <UploadFormFile :module="encrypt(contentItem.id)" />
                </div>
            </div>
        </div>
        <div v-else>

        </div>
    </div>
    <ContentLoaderView :isOpen="isLoading" />

</template>
<script>
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, } from '@ionic/vue';
import ContentLoaderView from '../../../components/widgets/ContentLoaderView.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import UploadFormFile from './widgets/UploadFormFile.vue';

export default {
    name: 'FormsFileView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent,
        ContentLoaderView,
        UploadFormFile
    },
    data() {
        return {
            isLoading: true,
            contentItem: [],
            contentList: [],
            errorDetails: '',
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
        },
        encrypt(data) {
            return btoa(data)
        },
        async retriveDataList() {
            const response = await this.generalController.retriveData(`/forms/retrive/${this.$route.params.view}`, 'forms')
            this.contentItem = response
            this.contentList = response.documents
            this.isLoading = false
            console.log(response)
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