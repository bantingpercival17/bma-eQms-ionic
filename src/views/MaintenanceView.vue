<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">MAINTAINANCE</p>
            <div class="row">
                <div class="col-md-7">

                    <h3 class="fw-bolder text-prima">This Page is under-maintainance</h3>
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
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
export default {
    name: 'MaintancePage',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel,
    },
    data() {

        return {
            isLoading: false,

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
