<template>
    <ion-card>
        <ion-card-content>
            <ion-label class="fw-bolder h5 text-primary">CREATE ANNOUNCEMENT</ion-label>
            <div class="contact-form mt-3">
                <form @submit.prevent="storeProcedure" method="post">
                    <div class="col-md-12">
                        <input-component label="Announcement Title" v-model:value="formData.title"
                            :error="errors.title" />
                    </div>
                    <div class="col-md-12">
                        <input-component label="Announcement Content" v-model:value="formData.content"
                            :error="errors.content" />
                    </div>
                    <div class="col-md-12">
                        <select-component label="Select Department" :data="procedureList"
                            v-model:value="formData.department" :error="errors.department" columnName="name" />
                    </div>
                    <div class="col-md-12">
                        <FileAttachComponent label="attach file" v-model:value="formData.file" :error="errors.file" />
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
import { GeneralController } from '../../../controller/GeneralContorller'
import ConfirmationAlert from '../../../components/alert/ConfirmationAlert.vue'
export default {
    name: 'CreateAnnouncement',
    components: {
        IonLabel, IonCard, IonCardContent, InputComponent, SelectComponent, FileAttachComponent, ConfirmationAlert
    },
    props: {
        departmentList: Object, procedureList: Object, token: String
    },
    data() {
        const formData = {
            title: '',
            content: '',
            department: '',
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
                const response = await this.generalController.storeItem('announcement/create-announcement', data);
                await this.$showMessageBox("Announcement Created", response.data.data);
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