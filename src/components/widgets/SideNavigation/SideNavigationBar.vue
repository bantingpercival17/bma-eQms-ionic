<template>
    <ion-menu type="push" content-id="main-content" side="start" :class="minisidebar ? 'sidebar-mini' : ''"
        style="width: fit-content;">
        <ion-header class="text-center">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button routerLink="/student-layout/dashboard">
                        <ion-title class=" text-center">
                            <span class="font-weight-bold text-primary">BMA e-QMS</span>
                        </ion-title>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content">
            <div class="sidebar-body pt-0 data-scrollbar">
                <div class="sidebar-list">
                    <SideNavigationBarItem></SideNavigationBarItem>
                </div>
                <div class="p-2"></div>
            </div>
        </ion-content>
    </ion-menu>
</template>

<script>
import { IonHeader, IonToolbar, IonButton, IonButtons, IonMenu, IonMenuButton, IonIcon, IonTitle, IonBreadcrumb, IonLabel, IonContent } from '@ionic/vue';
import SideNavigationBarItem from './SideNavigationBarItem.vue';
import { grid } from 'ionicons/icons';
import Scrollbar from 'smooth-scrollbar'
export default {
    name: 'StaffSideNavigationBar',
    data() {
        return {
            grid
        }
    },
    components: {
        IonHeader, IonToolbar, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonTitle, IonBreadcrumb, IonLabel, SideNavigationBarItem
        , IonContent
    },
    props: {
        minisidebar: { type: Boolean, default: true }
    },
    mounted() {
        this.SmoothScrollbar()
    },
    methods: {
        SmoothScrollbar() {
            const elementExistMain = document.querySelector('.data-scrollbar')
            if (elementExistMain) {
                Scrollbar.init(document.querySelector('.data-scrollbar'), {
                    continuousScrolling: false
                })
            }
        },
        SidebarMini() {
            this.$emit('makeminisidebar', !this.minisidebar)
        }
    }
}
</script>