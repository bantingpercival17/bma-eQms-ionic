<template>
    <IonModal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>ACTIVITY LOGS</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">


            <div v-if="activityLogs" class="content">
                <ion-list>
                    <ion-item v-for="(data, index) in activityLogs" :key="index" lines="none">
                        <ion-avatar slot="start">
                            <img alt="Profile Picture" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            <!--  <img :src="user.profileImage" alt="Profile picture" /> -->
                        </ion-avatar>
                        <ion-label>
                            <h2>
                                <span>{{ data.user.name }}</span>
                            </h2>
                            <div class="float-end">
                                <p>{{ convertTimestamp(data.created_at) }}</p>

                            </div>
                            <p> {{ data.action }}</p>

                        </ion-label>
                    </ion-item>
                </ion-list>
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
    IonLabel,
    IonAvatar,
    IonNote,
    IonList
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
        },
        convertTimestamp(timestamp) {
            // Convert to Date object
            const date = new Date(timestamp);

            // Formatting options
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            };

            // Format the date to a more readable string
            const formattedDate = date.toLocaleString("en-US", options);
            return formattedDate

        }
    }
}
</script>

<style scoped>
.modal-content {
    padding: 20px;
    text-align: center;
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