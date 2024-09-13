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
            </form>
        </ion-card-content>
    </ion-card>
</template>
<script>
import axios from 'axios'
import { IonLabel, loadingController, alertController, IonCard, IonCardContent } from '@ionic/vue'
import FileAttachComponent from '@/components/FileAttachComponent.vue'
export default {
    name: 'AddProcedureFile',
    components: {
        IonLabel, FileAttachComponent, IonCard, IonCardContent
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
            axios.post('procedure/store-procedure/file', this.formData, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                loading.dismiss();

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