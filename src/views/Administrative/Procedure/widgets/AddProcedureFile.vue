<template>
    <ion-card>
        <ion-card-content>
            <ion-label class="fw-bolder h5 text-primary">UPLOAD PROCEDURE FILE</ion-label>
            <form @submit.prevent="storeProcedure" method="post">
                <div class="col-md-12">
                    <FileAttachComponent label="attach file" v-model:value="formData.file" :error="errors.file" />
                </div>
                <div class="col-12 mt-3">
                    <button class="btn btn-primary btn-sm rounded w-100 mb-5" type="submit">UPLOAD</button>
                </div>
                <ConfirmationAlert ref="confirmationAlert" @confirmed="onConfirmed" @cancelled="onCancelled"
                    header="UPLOAD PROCEDURE FILE" message="Do you want to upload a new Procedure File?"
                    confirmText="Yes" :data="selectedData" />
            </form>
        </ion-card-content>
    </ion-card>
</template>
<script>
import axios from 'axios'
import { IonLabel, IonCard, IonCardContent } from '@ionic/vue';
import FileAttachComponent from '@/components/FileAttachComponent.vue';
import ConfirmationAlert from '../../../../components/alert/ConfirmationAlert.vue';
import { GeneralController } from '../../../../controller/GeneralContorller';
export default {
    name: 'AddProcedureFile',
    components: {
        IonLabel, FileAttachComponent, IonCard, IonCardContent, ConfirmationAlert
    },
    props: {
        token: String, procedure: String
    },
    data() {
        const formData = {
            procedure: this.procedure,
            file: [],
        }
        return {
            formData,
            errors: [],
            selectedData: null,
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
                const response = await this.generalController.storeItem('procedure/store-procedure/file', data);
                await this.$showMessageBox("File Removed", response.data.data);
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