<template>
    <ion-card>
        <ion-card-content class="p-3">
            <ion-label class="fw-bolder h5 text-primary">UPLOAD NEW FILE</ion-label>
            <form @submit.prevent="storeFormData" method="post">
                <div class="col-md-12">
                    <FileAttachComponent label="attach file" v-model:value="formData.file" :error="errors.file" />
                </div>
                <div class="col-12">
                    <button class="btn btn-primary btn-sm rounded w-100" type="submit">UPLOAD</button>
                </div>
                <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                    header="UPLOAD FILE" message="Do you want to upload a new File?" confirmText="Yes"
                    :data="storeData" />
            </form>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonLabel, IonCard, IonCardContent } from '@ionic/vue';
import FileAttachComponent from '@/components/FileAttachComponent.vue';
import ConfirmationAlert from '../../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../../controller/GeneralContorller';
export default {
    name: 'UploadFormFile',
    components: {
        IonLabel, FileAttachComponent, IonCard, IonCardContent, ConfirmationAlert
    },
    props: {
        module: String
    },
    data() {
        const formData = {
            data: this.module,
            file: [],
        }
        return {
            formData,
            errors: [],
            storeData: null,
        };
    },
    created() {
        this.generalController = new GeneralController();
    },
    methods: {
        async storeFormData() {
            this.errors = []
            this.storeData = this.formData;
            this.$refs.confirmationAlert.showAlert();
        },
        async onConfirmed(data) {
            const loading = await this.$showLoading();
            try {
                const response = await this.generalController.storeItem('forms/store-forms/file', data);
                await this.$showMessageBox("UPLOAD FILE", response.data.data);
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