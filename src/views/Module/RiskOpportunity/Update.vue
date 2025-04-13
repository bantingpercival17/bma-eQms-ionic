<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <p class="display-6 fw-bolder text-primary">{{ pageTitle }}</p>
        <ion-card>
            <ion-card-content>
                <form @submit.prevent="updateRisk" method="post" class="container mt-3">
                    <div class="row">
                        <div class="col-md-12 col-lg-6">
                            <input-component label="Activity/Process/Procedure" v-model:value="formData.activity"
                                :error="errors.activity" />
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <input-component label="Date" v-model:value="formData.date_created"
                                :error="errors.date_created" type="date" />
                        </div>
                    </div>
                    <div class="">
                        <button type="submit" class="btn btn-outline-primary btn-sm me-2">UPDATE</button>
                        <button class="btn btn-primary btn-sm" @click="viewPDF(riskData.id)">VIEW REPORT</button>
                        <button class="btn btn-outline-danger btn-sm ms-2">REMOVE</button>
                    </div>
                </form>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-content>
                <button class="btn btn-sm btn-outline-primary float-end" @click="addRisk">ADD RISK</button>
                <h3 class="fw-bolder text-primary">2. Risk/s and Opportunity Register</h3>
                <div class="container mt-5">
                    <div class="table-responsive mt-2">
                        <table class="table table-bordered mt-3">
                            <thead>
                                <tr class="fw-bolder">
                                    <th>ACTION</th>
                                    <th>Hazards/Risks Description</th>
                                    <th>Existing Control Measures</th>
                                    <th>Who / What is at Risks?</th>
                                    <th>Consequence</th>
                                    <th>Likelihood</th>
                                    <th>Opportunity</th>
                                    <th>Action to be taken to minimize the Risks?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(risks, key) in riskData.registered_risk" :key="key">
                                    <td>
                                        <small class="badge bg-primary me-2" @click="editRisk(risks.id)">EDIT </small>
                                        <small class="badge bg-danger me-2" @click="removeRegisterRisk(risks.id)">REMOVE
                                        </small>
                                    </td>
                                    <td>{{ risks.risks_description }}</td>
                                    <td>{{ risks.control_measures }}</td>
                                    <td>{{ risks.who_at_risk }}</td>
                                    <td>{{ risks.consequence }}</td>
                                    <td>{{ risks.likelihood }}</td>
                                    <td>{{ risks.initial_risk_level }}</td>
                                    <td>{{ risks.action_to_minimize }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ion-card-content>
        </ion-card>
        <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
            header="RISK AND OPPRTUNITY" :message="alertMessage" confirmText="Yes" :data="selectedData" />

        <AddRisk v-if="risk !== ''" :isOpen="isModalOpen" @close="isModalOpen = false" :risk="risk" />
        <UpdateRisk v-if="registerRisk !== ''" :isOpen="updateModelOpen" @close="updateModelClose()"
            :registerRisk="registerRisk" />
    </div>
    <div v-else>
        <ImageLoading />
    </div>
</template>
<script>
import { IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonCardHeader } from '@ionic/vue';
import { GeneralController } from '../../../controller/GeneralContorller';
import InputComponent from '@/components/InputComponents.vue'
import SelectComponent from '@/components/SelectComponents.vue'
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue';
import AddRisk from './Modal/AddRisk.vue';
import UpdateRisk from './Modal/UpdateRisk.vue';
import ImageLoading from '../../../components/widgets/ImageLoading.vue';
export default {
    name: 'RiskAssessmentUpdateView',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonCardHeader,
        SelectComponent,
        InputComponent,
        ConfirmationAlert,
        AddRisk,
        UpdateRisk,
        ImageLoading
    },
    data() {
        const formData = {
            activity: '',
            date_created: '',
            risks_description: '',
            control_measures: '',
            who_at_risk: '',
            consequence: '',
            likelihood: '',
            action_to_minimize: '',
            action_by_whom: '',
            action_by_when: '',
            action_effectiveness: '',
            residual_risk: '',
            risk_decision: '',
            opportunity_identified: '',
            opportunity_rate: '',
        }

        const consequence = [
            { id: 1, term: '(1) Insignigicant' },
            { id: 2, term: '(2) Minor' },
            { id: 3, term: '(3) Moderate' },
            { id: 4, term: '(4) Major' },
            { id: 5, term: '(5) Severe' },
        ]
        const likelihood =
            [
                { id: 1, term: '(1) Rare' },
                { id: 2, term: '(2) Unlikely' },
                { id: 3, term: '(3) Possible' },
                { id: 4, term: '(4) Likely' },
                { id: 5, term: '(5) Almost Certain' },
            ]
        const when_action = [
            { id: 'urgently', name: 'urgently' },
            { id: 'immediately', name: 'immediately' },
            { id: 'within the day', name: 'within the day' },
            { id: 'within 2 days', name: 'within 2 days' },
            { id: 'within 1 week', name: 'within 1 week' },
            { id: 'within 2 weeks', name: 'within 2 weeks' },
            { id: 'within one month', name: 'within one month' },
            { id: 'within 3 months', name: 'within 3 months' },
            { id: 'within 6 months', name: 'within 6 months' },
            { id: 'within 1 Year', name: 'within 1 Year' },
            { id: 'within 5 Years', name: 'within 5 Years' },
            { id: 'Before Next Audit', name: 'Before Next Audit' },
            { id: 'Countinuos', name: 'Countinuos' },
        ]
        const risk_desicion = [
            { id: 'a', name: 'A' },
            { id: 'b', name: 'B' },
            { id: 'c', name: 'C' },
            { id: 'd', name: 'D' },
            { id: 'e', name: 'E' }
        ]
        const opportunity_rating = [
            { id: 'very-high', name: 'Very High' },
            { id: 'high', name: 'High' },
            { id: 'medium', name: 'Medium' },
            { id: 'low', name: 'Low' },
            { id: 'very-low', name: 'Very Low' }
        ]
        const errors = []
        return {
            isLoading: true,
            pageTitle: "RISK AND OPPORTUNITY VIEW",
            formData,
            errors,
            likelihood,
            consequence,
            when_action,
            risk_desicion,
            opportunity_rating,
            selectedData: [],
            riskData: [],
            isModalOpen: false,
            updateModelOpen: false,
            registerRisk: '',
            risk: null,
            alertMessage: null
        }
    },
    mounted() {
        this.generalController = new GeneralController()
        this.loadRiskData()
    },
    methods: {

        async handleScroll(event) {
            event.target.complete();
        },
        async loadRiskData() {
            const response = await this.generalController.retriveData(`/risk-and-opportunity/view-risk/${this.$route.params.view}`, 'risk')
            this.formData.activity = response.activity
            this.formData.date_created = response.date_created
            this.riskData = response
            this.isLoading = false
        },
        async updateRisk() {
            this.errors = []
            this.formData.risk = this.$route.params.view
            this.formData.alertType = 'update'
            this.selectedData = this.formData;
            this.alertMessage = "Do you want to update risks information?"
            this.$refs.confirmationAlert.showAlert();
        },
        async removeRegisterRisk(data) {
            const formData = { risk: data, alertType: 'remove-registered-risk' }
            this.selectedData = formData;
            this.alertMessage = "Do you want to remove registered risks?"
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                if (data.alertType === 'update') {
                    const response = await this.generalController.storeItem('risk-and-opportunity/update-risk', data);
                    await this.$showMessageBox("UPDATE RISK INFORMATION", response.data.data);
                }
                if (data.alertType === 'remove-registered-risk') {
                    const response = await this.generalController.storeItem('risk-and-opportunity/remove-register-risk', data);
                    await this.$showMessageBox("REMOVE RISK REGISTERED", response.data.data);
                }
                window.location.reload()
            } catch (error) {
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                            this.$showMessageBox("Fill-up Fields", "Please Fill all the Required Fields")
                        } else {
                            this.$showMessageBox(error.code, error.message)
                        }
                    }
                }
            } finally {
                await loading.dismiss();
            }
        },
        async viewPDF(value) {
            this.isLoading = true
            const response = await this.generalController.retriveFile('/risk-and-opportunity/risk-pdf-report', { risk: value })
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            window.open(url)
            this.isLoading = false
            /*  this.pdfUrl = url */
            this.pdfLink = url;

            console.log(response.data)
        },
        onCancelled() {
            console.log('Cancelled action');
        },
        encrypt(data) {
            return btoa(data)
        },
        addRisk() {
            this.isModalOpen = true;
            this.risk = this.$route.params.view
        },
        editRisk(data) {
            this.updateModelOpen = true
            this.registerRisk = this.encrypt(data)
            console.log(data)
        },
        updateModelClose() {
            this.updateModelOpen = false
            this.registerRisk = ""
        },
        encrypt(data) {
            return btoa(data)
        },
    },
}
</script>
