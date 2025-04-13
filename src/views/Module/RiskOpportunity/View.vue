<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <p class="display-6 fw-bolder text-primary">{{ pageTitle }}</p>
        <router-link :to="{ name: 'staff-layout.risk-and-opportunity-create' }"
            class="btn btn-sm btn-outline-primary  mb-3">
            <ion-label>Create Risk and Opportunity</ion-label>
        </router-link>
        <ion-card>
            <ion-card-content>
                <div class="table-responsive">
                    <table class="table table-bordered mt-3">
                        <thead>
                            <tr class="fw-bolder">
                                <th>ACTION</th>
                                <th>Date</th>
                                <th>Activity/Process/Procedure:</th>
                                <th width="20%" style="word-wrap: break-word;">Hazards/Risks Description</th>
                                <th>Existing Control Measures</th>
                                <th>Who/What is at Risks?</th>
                                <th>Opportunity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="riskData.length > 0">
                                <tr v-for="(risks, key) in riskData" :key="key">
                                    <td :rowspan="risks.length">
                                        <small class="badge bg-primary me-2" @click="viewPDF(risks.id)">VIEW </small>
                                        <router-link class="badge bg-info me-2"
                                            :to="{ name: 'staff-layout.risk-and-opportunity-update', params: { view: encrypt(risks.id) } }">
                                            EDIT
                                        </router-link>
                                        <small class="badge bg-danger me-2" @click="viewPDF(risks.id)">REMOVE </small>
                                        <!--  <small class="btn btn-outline-primary btn-sm">VIEW</small> -->
                                    </td>
                                    <td :rowspan="risks.length">{{ risks.date_created }}</td>
                                    <td :rowspan="risks.length">{{ risks.activity }}</td>
                                    <template v-for="(registeredRisk, index) in risks.registered_risk" :key="index">
                                        <td>{{ registeredRisk.risks_description }}</td>
                                        <td>{{ registeredRisk.initial_risk_level }}</td>
                                        <td>{{ registeredRisk.residual_risk }}</td>
                                        <td>{{ registeredRisk.opportunity_identified ? 'Yes' : 'No' }}</td>
                                    </template>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="6">No Data Available</td>
                                </tr>
                            </template>
                        </tbody>

                    </table>
                </div>
            </ion-card-content>
        </ion-card>

        <PDFModalViewerComponent :isOpen="isModalOpen" @close="isModalOpen = false" :pdfLink="pdfLink" />
    </div>
    <div v-else>
        <p class="badge bg-info">LOADING CONTENTS</p>
    </div>
</template>
<script>
import { IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonLabel } from '@ionic/vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import PDFModalViewerComponent from '../../../components/PDFModalViewerComponent.vue';

export default {
    name: 'RiskAssessmentView',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, PDFModalViewerComponent, IonLabel
    },
    data() {
        return {
            isLoading: false,
            pageTitle: "RISK AND OPPORTUNITY",
            riskData: [],
            isModalOpen: false,
            pdfLink: 'null'
        }
    },
    mounted() {
        this.generalController = new GeneralController()
        this.retrieveData()
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.retrieveData()
        },
        async retrieveData() {
            const response = await this.generalController.retrieveData('/risk-and-opportunity/retrieve-data', '', 'riskList')
            this.riskData = response
            console.log(this.riskData)

        },
        async viewPDF(value) {
            this.isModalOpen = true;
            const response = await this.generalController.retriveFile('/risk-and-opportunity/risk-pdf-report', { risk: value })
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            window.open(url)
            /*  this.pdfUrl = url */
            this.pdfLink = url;

            console.log(response.data)
        },
        encrypt(data) {
            return btoa(data)
        },
    },
}
</script>
