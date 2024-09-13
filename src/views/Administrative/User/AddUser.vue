<template>
    <div>
        <ion-label class="fw-bolder h5 text-primary">CREATE EMPLOYEE ACCOUNT</ion-label>
        <div v-if="errors.message" class="m-0 p-2 alert alert-left alert-info alert-dismissible fade show mt-5"
            role="alert">

            <p class="mt-2" v-html="errors.message"></p>
        </div>
        <div v-if="networkError.code" class="alert alert-left alert-danger alert-dismissible fade show mt-5"
            role="alert">
            <span class="fw-bolder">{{ networkError.code }}</span>
            <p class="mt-3" v-html="networkError.message"> </p>
        </div>
        <div class="contact-form mt-3">
            <form @submit.prevent="createUserAccount" method="post">
                <div class="col-md-12">
                    <input-component label="First Name" v-model:value="formData.first_name"
                        :error="errors.first_name" />
                </div>
                <div class="col-md-12">
                    <input-component label="last Name" v-model:value="formData.last_name" :error="errors.last_name" />
                </div>
                <div class="col-md-12">
                    <select-component label="Department" :data="departmentList" v-model:value="formData.department"
                        :error="errors.deparment" columnName="name" />
                </div>
                <div class="col-md-12">
                    <select-component label="Role" :data="roleList" v-model:value="formData.role" :error="errors.role"
                        columnName="name" />
                </div>
                <div class="col-12 mt-3">
                    <button class="btn btn-primary btn-sm rounded w-100 mb-5" type="submit">SAVE USER</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonLabel, loadingController, alertController } from '@ionic/vue'
import InputComponent from '@/components/InputComponents.vue'
import SelectComponent from '@/components/SelectComponents.vue'
export default {
    name: 'AddUserForm',
    data() {
        const formData = {
            first_name: '',
            last_name: '',
            department: '0',
            role: '0',
            message: 'Check you Email for your Password'
        }
        return {
            errors: [],
            networkError: [],
            validateClass: '',
            formData,
            captchaValue: '',
        }
    },
    components: {
        IonLabel, InputComponent, SelectComponent
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    methods: {
        async createUserAccount() {
            this.networkError = []
            this.errors = []
            const loading = await loadingController.create({
                message: 'Loading...',
                cssClass: 'custom-loading',
            });
            loading.present();
            try {
                const response = await axios.post('/user/create-account', this.formData, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                this.resetForm()
                loading.dismiss();
                this.messageBox('Successfuly Created Account')

            } catch (error) {
                loading.dismiss();
                this.errorMessage = error
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                    this.errorAlert(error)
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
                    }
                }
                console.log(this.errors)
            }
        },
        async messageBox(message) {
            const alert = await alertController.create({
                header: 'Message Alert',
                subHeader: message,
                buttons: ['Okay'],
            });

            await alert.present();
        },
        resetForm() {
            // Reset form data to default values
            this.formData.first_name = '';
            this.formData.last_name = '';
            this.formData.role = '';
            this.formData.department = '';
        }
    },
    props: {
        departmentList: Object, roleList: Object
    }
}
</script>