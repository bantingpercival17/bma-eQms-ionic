<template>
    <ion-card>
        <ion-card-content>
            <ion-label class="fw-bolder h5 text-primary">ADD FORMS</ion-label>
            <div class="contact-form mt-3">
                <form @submit.prevent="storeProcedure" method="post">
                    <div class="col-md-12">
                        <input-component label="FORM NAME" v-model:value="formData.formName" :error="errors.formName" />
                    </div>
                    <div class="col-md-12">
                        <input-component label="FOrm code " v-model:value="formData.formCode"
                            :error="errors.formCode" />
                    </div>
                    <div class="col-md-12">
                        <select-component label="Department" :data="departmentList" v-model:value="formData.role"
                            :error="errors.role" columnName="name" />
                    </div>
                    <div class="col-md-12">
                        <select-component label="procedure" :data="procedureList" v-model:value="formData.procedure"
                            :error="errors.procedure" columnName="procedure_name" />
                    </div>
                    <div class="col-md-12">
                        <FileAttachComponent label="attach file" v-model:value="formData.file" :error="errors.file" />
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>FORM STATUS<span class="text-danger">*</span></small>
                            </label>
                            <select v-model="formData.status" class="form-select form-select-sm border border-primary">
                                <option value="">Select Status</option>
                                <option value="1">GENERAL PROCEDURE</option>
                                <option value="0">DEPARTMENTAL PROCEDURE</option>
                            </select>
                            <span class="badge bg-danger mt-2" v-if="errors['status']">{{
                                errors['status'][0] }}</span>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <button class="btn btn-primary btn-sm rounded w-100 mb-5" type="submit">SAVE </button>
                    </div>
                    <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                        header="ADD FORMS" message="Do you want to add Form?" confirmText="Yes" :data="selectedData" />
                </form>
            </div>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonLabel, IonCard, IonCardContent } from '@ionic/vue'
import InputComponent from '@/components/InputComponents.vue'
import SelectComponent from '@/components/SelectComponents.vue'
import FileAttachComponent from '@/components/FileAttachComponent.vue'
import { GeneralController } from '../../../../controller/GeneralContorller';
import ConfirmationAlert from '../../../../components/alert/ConfirmationAlert.vue';
export default {
    name: 'CreateForm',
    components: {
        IonLabel, IonCard, IonCardContent, InputComponent, SelectComponent, FileAttachComponent, ConfirmationAlert
    },
    props: {
        departmentList: Object, procedureList: Object, token: String
    },
    data() {
        const formData = {
            formName: '',
            formCode: '',
            role: '',
            procedure: '',
            status: '',
            file: [],

        }
        return {
            formData,
            errors: [],
            procedures: [],
            departments: [],
            selectedData: []
        };
    },
    created() {
        this.generalController = new GeneralController();
    },
    methods: {
        async storeProcedure() {
            this.errors = []
            this.selectedData = this.formData;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const response = await this.generalController.storeItem('forms/store-forms', data);
                await this.$showMessageBox("FORM ADDED", response.data.data);
                window.location.reload()
            } catch (error) {
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
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
        }
    }
}
</script>