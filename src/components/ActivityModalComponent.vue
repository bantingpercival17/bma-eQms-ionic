<template>
    <IonModal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>Analytics</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div v-if="activityLogs" class="content">
                <ion-item v-for="(item, index) in activityLogs" :key="index">
                    <ion-label>
                        <h2>H2 Heading</h2>
                        <p>Paragraph</p>
                    </ion-label>
                </ion-item>
            </div>
            <div v-else class="empty-content">
                <ion-item>
                    <ion-label>
                        <h2>No Activity Logs</h2>
                    </ion-label>
                </ion-item>
            </div>
        </ion-content>

    </IonModal>
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
    IonLabel
} from '@ionic/vue';
export default {
    name: 'ActivityModalComponent',
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        activityLogs: {
            type: Object,
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
        }
    }
}
</script>

<style scoped>
.modal-content {
    padding: 20px;
    text-align: center;
}
</style>