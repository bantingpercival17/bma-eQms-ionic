<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">MISSION AND VISION</p>
            <div class="row">
                <div class="col-md-5">

                </div>
                <div class="col-md-7">

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
<style>
.accordion-content {
    cursor: default;
}

.accordion-content:hover {
    color: #18995B;
    /* Adjust as needed */
}
</style>
<script>
import { GeneralController } from '../../../controller/GeneralContorller';
import PDFViewerComponent from '../../../components/PDFViewerComponent.vue'
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
export default {
    name: 'ProcedureView',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel,
        PDFViewerComponent
    },
    data() {
        return {
            isLoading: true,
        };
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
        },
    },
    async created() {

    }

}
</script>
