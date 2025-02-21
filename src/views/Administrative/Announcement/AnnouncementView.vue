<template>
    <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
        <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
            refreshing-text="Refreshing...">
        </ion-refresher-content>
    </ion-refresher>
    <!-- TITLE HEADER -->
    <p class="display-6 fw-bolder text-primary">ANNOUNCEMENT</p>
    <!-- CONTENT -->
    <div class="row">
        <div class="col-md-5">
            <!-- CREATE FORMS -->
            <form action="" method="post">
                <CreateAnnouncement />
            </form>
        </div>
        <div class="col-md-7">

            <div v-if="!isLoading">
                <div v-if="!errorDetails">
                    <div class="mt-3">
                        <div v-if="announcementList.length > 0" class="content">
                            <ion-card v-for="announcement in announcementList" :key="announcement.id">
                                <ion-card-header>
                                    <span class="text-primary fw-bolder h4">{{ announcement.title }}</span>
                                    <span class="text-muted fw-bolder h6">{{ announcement.content }}</span>
                                    <br>
                                    <label for="">CREATED BY: <br>
                                        <span class="text-primart fw-bolder">{{ announcement.user.name }}</span>
                                    </label>
                                </ion-card-header>
                                <ion-footer>

                                    <div class="float-end m-2">
                                        <span class="btn btn-outline-danger btn-sm me-3">REMOVE</span>
                                        <!-- <router-link class="btn btn-primary btn-sm me-3"
                                            :to="{ name: 'admin-layout.form-view-files', params: { view: encrypt(form.id) } }">
                                            SEE FORM
                                        </router-link> -->
                                    </div>

                                </ion-footer>
                            </ion-card>
                            <!-- <div class="mt-3 mb-3">
                                <PaginationComponent :currentPage="pagination.current" :totalPages="pagination.total"
                                    @change="data" />
                            </div> -->
                        </div>
                        <div v-else>
                            <ion-card>
                                <ion-card-header>
                                    <span v-if="searchTerm.length > 0" class="text-primary fw-bolder h4">NOT
                                        FOUND</span>
                                    <span v-else class="text-primary fw-bolder h4">NO DATA</span>
                                </ion-card-header>
                            </ion-card>
                        </div>
                    </div>

                </div>
                <div v-else>
                    <p class="badge bg-danger">{{ errorDetails }}</p>
                </div>
            </div>


        </div>

    </div>
</template>
<script>

import { IonContent, IonFooter, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonCardHeader } from '@ionic/vue';
import CreateAnnouncement from './CreateAnnouncement.vue';
import { GeneralController } from '../../../controller/GeneralContorller';
export default {
    name: 'AnnouncementView',
    data() {
        return {
            isLoading: true,
            announcementList: [],
            departments: [],
            announcementList: [],
            errorDetails: [],
        }
    },
    async created() {
        this.generalController = new GeneralController();
        this.departments = await this.generalController.retriveData('role-list', 'roles')
        //this.announcementList = await this.generalController.retriveData('/announcement/fetch-announcement', 'announcementList')
        this.retrieveData()
        console.log(this.announcementList)
    },
    components: {
        IonContent, IonButton, IonSearchbar, IonInput, IonRefresher, IonRefresherContent,
        IonCard, IonCardContent, IonCardHeader, IonFooter, CreateAnnouncement
    },
    methods: {
        async handleScroll(event) {
            event.target.complete();
            this.isLoading = true
        },
        async retrieveData() {

            this.errorDetails = null
            this.announcementList = await this.generalController.retriveData('/announcement/fetch-announcement', 'announcementList')
            this.isLoading = false

        },
    }
}
</script>