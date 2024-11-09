<template>
    <IonModal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>Activity Logs</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal()">Cancel</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item v-for="(user, index) in users" :key="index" lines="none">
                    <ion-avatar slot="start">
                        <img :src="user.profileImage" alt="Profile picture" />
                    </ion-avatar>
                    <ion-label>
                        <h2>
                            <a :href="user.profileLink" target="_blank" rel="noopener noreferrer">
                                {{ user.name }}
                            </a>
                        </h2>
                        <div class="float-end">
                            102-20-2024
                        </div>
                        <p>{{ user.title }}</p>

                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-item v-for="(user, index) in users" :key="index" lines="none">
                    <ion-avatar slot="start">
                        <img :src="user.profileImage" alt="Profile picture" />
                    </ion-avatar>
                    <ion-label>
                        <h2>
                            <a :href="user.profileLink" target="_blank" rel="noopener noreferrer">
                                {{ user.name }}
                            </a>
                        </h2>
                        <p>{{ user.title }}</p>
                        <div class="badge">
                            <ion-icon name="ellipse"></ion-icon> {{ user.connectionDegree }}
                        </div>
                    </ion-label>
                    <img slot="end" src="https://static.licdn.com/aero-v1/sc/h/4c1dzspg0yqfip47a9y26tnx8"
                        alt="Like icon" class="like-icon" />
                </ion-item>
            </ion-list>
            <div v-if="activityLogs" class="content">
                <ion-list>
                    <ion-item v-for="(item, index) in activityLogs" :key="index">
                        <ion-item>
                            <ion-avatar aria-hidden="true" slot="start">
                                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </ion-avatar>
                            <ion-label>

                                <label for=""> {{ item.user.name }}</label>

                                <h2>{{ item.action }}</h2>


                            </ion-label>
                            <ion-note slot="end">{{ item.created_at }}</ion-note>
                        </ion-item>


                        <!-- <ion-label slot="start"></ion-label>
                    <ion-label slot="end">{{ item.created_at }}</ion-label> -->
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
                    profileImage: "https://media.licdn.com/dms/image/v2/D5603AQFBS53tM4gkuQ/profile-displayphoto-shrink_100_100/0/1675613538614?e=1736380800&v=beta&t=n4IOXUv6vte219TR6sXTMKL_FEPfqzpIB27N4hasjHM",
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