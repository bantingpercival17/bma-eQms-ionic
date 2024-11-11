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
                <div class="col-md">
                    <div v-for="(item, index) in data" :key="index">
                        <label for="" class="h3 fw-boder text-primary">{{ item.title }}</label>
                        <p>{{ item.data }}</p>
                    </div>
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
    name: 'MissionAndVision',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel,
    },
    data() {
        const mission = "The Baliwag Maritime Academy shall offer its students a competency based Maritime Education & Training Program to produce competent marine officers with an adequate knowledge, attitudes, & leadership skills necessary in pursuing their respective professional maritime career which complies to national and international standards."
        const vision = "The Baliwag Maritime Academy as one of the leading Maritime Higher Educational Institution visualizes itself as a producer of highly competent marine officers who will excel in the practice of the seafaring profession in both domestic and international shipping, and as competent maritime educators."
        const data = [
            { title: 'MISSION', data: mission },
            { title: 'VISION', data: vision }
        ]
        return {
            isLoading: false,
            data
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
