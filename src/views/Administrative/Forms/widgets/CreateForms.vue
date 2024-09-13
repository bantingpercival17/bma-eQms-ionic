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
                </form>
            </div>
        </ion-card-content>
    </ion-card>
</template>
<script>
import axios from 'axios'
import { IonLabel, loadingController, IonCard, IonCardContent, alertController } from '@ionic/vue'
import InputComponent from '@/components/InputComponents.vue'
import SelectComponent from '@/components/SelectComponents.vue'
import FileAttachComponent from '@/components/FileAttachComponent.vue'
export default {
    name: 'CreateForm',
    components: {
        IonLabel, IonCard, IonCardContent, InputComponent, SelectComponent, FileAttachComponent
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
            departments: []
        };
    },
    methods: {
        async storeProcedure() {
            this.errors = []
            const loading = await loadingController.create({
                message: 'Loading...',
                cssClass: 'custom-loading',
            });
            loading.present();
            console.log(this.formData)
            axios.post('forms/store-forms', this.formData, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                loading.dismiss();
                location.reload()

            }).catch(error => {
                console.log(error);
                loading.dismiss();

                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        } else {
                            this.messageBox(error.code, error.message)
                        }
                    }
                }
                console.log(this.errors)
            })



        },
        async messageBox(title, message) {
            const alert = await alertController.create({
                header: title,
                subHeader: message,
                buttons: ['Okay'],
            });

            await alert.present();
        },
    }
}
</script>