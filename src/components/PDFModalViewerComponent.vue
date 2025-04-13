<template>
    <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="presentingElement">
        <ion-header>
            <ion-toolbar>
                <ion-title>Modal</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismiss()">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <p>You will be prompted when closing this modal.</p>
        </ion-content>
    </ion-modal>
    <!-- <IonModal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <label for="" class="text-primary fw-bolder">REPORT VIEWER</label>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" style="--padding-bottom: 0; height: 100%;">
            <template v-if="pdfLink !== ''">
                <iframe v-if="pdfLink" :src="`${pdfLink}#toolbar=0&navpanes=0`" class=" full-screen-iframe"
                    frameborder="0" @contextmenu.prevent></iframe>
            </template>

</ion-content>

</IonModal> -->
</template>
<script>
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonAvatar,
    IonNote,
    IonList
} from '@ionic/vue';
export default {
    name: 'PDFModalViewerComponent',
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel,
        IonAvatar,
        IonNote,
        IonList
    },
    data() {
        return {
            users: [
                {
                    name: "Rohit Sharma",
                    title: "Software Developer at IBM ISL",
                    profileImage: "https://ionicframework.com/docs/img/demos/avatar.svg",
                    profileLink: "https://www.linkedin.com/in/ACoAADTvAE0BxZVGgjVR32o_AzEpfwWMDRINi4k",
                    connectionDegree: "3rd+"
                }
            ]
        };
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        pdfLink: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleLike() {
            console.log('Liked!');
            this.closeModal();
        },
    }
}
</script>

<style scoped>
.full-screen-iframe {
    width: 100%;
    height: 100vh;
    /* or use 100% depending on modal height */
    border: none;
}

.modal-content {
    padding: 20px;
    text-align: center;
    width: 100vh;
    /* or use 100% depending on modal height */

}

.like-icon {
    width: 24px;
    height: 24px;
}

.badge {
    display: flex;
    align-items: center;
    font-size: 0.9em;
    color: #666;
}

.badge ion-icon {
    font-size: 6px;
    margin-right: 4px;
}
</style>