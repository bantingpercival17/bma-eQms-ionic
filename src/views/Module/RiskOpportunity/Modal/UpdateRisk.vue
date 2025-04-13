<template>
    <IonModal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title for="" class="text-primary fw-bolder">EDIT HAZARDS / RISKS</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" style="--padding-bottom: 0; height: 100%;">
            <form v-if="!isLoading" @submit.prevent="storeRisk" method="post">
                <ion-card-content class="row">
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Hazards/Risks Description" v-model:value="formData.risks_description"
                            :error="errors.risks_description" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Existing Control Measures" v-model:value="formData.control_measures"
                            :error="errors.control_measures" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Who / What is at Risks?" v-model:value="formData.who_at_risk"
                            :error="errors.who_at_risk" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <select-component label="Consequence" :data="consequence" columnName="term"
                            v-model:value="formData.consequence" :error="errors.consequence" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <select-component label="Likelihood" :data="likelihood" columnName="term"
                            v-model:value="formData.likelihood" :error="errors.likelihood" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Action to be taken to minimize the Risks?"
                            v-model:value="formData.action_to_minimize" :error="errors.action_to_minimize" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Action by Whom?" v-model:value="formData.action_by_whom"
                            :error="errors.action_by_whom" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <select-component label="Action by When?" :data="when_action" columnName="name"
                            v-model:value="formData.action_by_when" :error="errors.action_by_when" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <input-component label="Action Effectiveness" v-model:value="formData.action_effectiveness"
                            :error="errors.action_effectiveness" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <input-component label="Is Opportunities identified over the Risk?"
                            v-model:value="formData.opportunity_identified" :error="errors.opportunity_identified" />
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <select-component label="Risk Decision" :data="risk_desicion" columnName="name"
                            v-model:value="formData.risk_decision" :error="errors.risk_decision" />
                    </div>

                    <div class="col-md-12 col-lg-6">
                        <select-component label="Opportunity Rate" :data="opportunity_rating" columnName="name"
                            v-model:value="formData.opportunity_rate" :error="errors.opportunity_rate" />
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <button class="btn btn-primary btn-sm rounded w-100 mb-5" type="submit">ADD RISK </button>
                    </div>
                </ion-card-content>

            </form>
            <div v-else>
                <ImageLoading />
            </div>
            <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                header="RISK AND OPPRTUNITY" message="Do you want to update hazard / risks?" confirmText="Yes"
                :data="selectedData" />
        </ion-content>

    </IonModal>
</template>
<script>

import {
    IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonAvatar,
    IonNote,
    IonList
} from '@ionic/vue';
import InputComponent from '@/components/InputComponents.vue'
import SelectComponent from '@/components/SelectComponents.vue'
import { GeneralController } from '../../../../controller/GeneralContorller';
import ConfirmationAlert from '../../../../components/alert/ConfirmationAlert.vue';
import ImageLoading from '../../../../components/widgets/ImageLoading.vue';
export default {
    name: 'UpdateRisk',
    components: {
        IonContent, loadingController, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel,
        IonAvatar,
        IonNote,
        IonList,
        SelectComponent,
        InputComponent,
        ConfirmationAlert,
        ImageLoading
    },
    data() {
        const formData = {
            risk: '',
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
            pageTitle: "CREATE RISK AND OPPORTUNITY",
            formData,
            errors,
            likelihood,
            consequence,
            when_action,
            risk_desicion,
            opportunity_rating,
            selectedData: []
        }
    },
    mounted() {
        this.generalController = new GeneralController()
        this.loadRiskData()
        console.log(this.registerRisk)
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
        },
        async loadRiskData() {
            const response = await this.generalController.retriveData("/risk-and-opportunity/view-register-risk?risk=" + this.registerRisk, 'registeredRisk')
            this.formData = {
                risk:response.id,
                risks_description: response.risks_description,
                control_measures: response.control_measures,
                who_at_risk: response.who_at_risk,
                consequence: response.consequence,
                likelihood: response.likelihood,
                action_to_minimize: response.action_to_minimize,
                action_by_whom: response.action_by_whom,
                action_by_when: response.action_by_when,
                action_effectiveness: response.action_effectiveness,
                risk_decision: response.risk_decision,
                opportunity_identified: response.opportunity_identified,
                opportunity_rate: response.opportunity_rate,
            }
            this.riskData = response
            this.isLoading = false
            console.log(response)
        },
        async storeRisk() {
            this.errors = []
            this.selectedData = this.formData;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const response = await this.generalController.storeItem('risk-and-opportunity/update-register-risk', data);
                await this.$showMessageBox("RISK REGISTED UPDATED", response.data.data);
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
        onCancelled() {
            console.log('Cancelled action');
        },
        closeModal() {
            this.$emit('close');
        },
        handleLike() {
            console.log('Liked!');
            this.closeModal();
        },
        encrypt(data) {
            return btoa(data)
        },
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        registerRisk: String
    },
}
</script>
