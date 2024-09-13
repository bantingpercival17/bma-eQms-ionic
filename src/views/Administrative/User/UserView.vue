<template>
    <div v-if="!isLoading" class="content">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <div class="page-content">
            <p class="display-6 fw-bolder text-primary">USER MANAGEMENT</p>
            <div class="row">
                <div class="col-md-8">
                    <template v-if="accountList.length > 0">
                        <router-link v-for="(data, index) in accountList" :key="index" to="/">
                            <ion-card>
                                <ion-card-header>
                                    <div class="header-title">
                                        <div class="d-flex flex-wrap">
                                            <div class="media-support-user-img me-3">
                                                <img src="@/resources/logo/midship-man.jpg" alt="teacher-image"
                                                    class="img-fluid avatar avatar-70 rounded-circle">
                                            </div>
                                            <div class="media-support-info mt-2">
                                                <h5 class="mb-0 fw-bolder">
                                                    {{ data.name }}
                                                </h5>
                                                <!-- <p class="mb-0 text-white">
                                                    {{ data.staff.first_name + " " + data.staff.last_name }}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                </ion-card-header>
                            </ion-card>
                        </router-link>
                    </template>
                    <template v-else>
                        <div>

                        </div>
                    </template>
                </div>
                <div class="col-md-4">
                    <AddUserForm :departmentList="departmentList" :roleList="roleList" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="content">
        <h1 class="text-primary fw-bolder">LOADING...</h1>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import {
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    loadingController, IonRefresher, IonRefresherContent,
    IonPopover,
    IonItemGroup,
    IonContent
} from "@ionic/vue";
import AddUserForm from '../User/AddUser.vue'
export default {
    name: 'UserManagement',
    components: {
        IonTitle,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonButton,
        IonList,
        IonItem,
        IonLabel,
        loadingController, IonRefresher, IonRefresherContent, IonCardHeader,
        IonPopover,
        IonItemGroup,
        IonContent, AddUserForm
    },
    data() {
        return {
            isLoading: false,
            subjectLists: [],
            departmentList: [],
            roleList: [],
            accountList: []
        }
    },
    async created() {
        this.departmentList = await this.fetchDataList('department-list', 'departments')
        this.roleList = await this.fetchDataList('role-list', 'roles')
        this.accountList = await this.fetchDataList('user/retrive-accounts', 'accounts')
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    methods: {
        async fetchDataList(apiLink, columnName) {
            let returnData = []
            try {
                const response = await axios.get(apiLink, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
                returnData = response.data[columnName];
            } catch (error) {
                console.error('Error fetching for ' + columnName + ':', error);
                returnData = [];
            }
            return returnData
        },
        async handleScroll(event) {
            event.target.complete();
            /* const parameter = this.$route.query.key
            this.mountedData(parameter) */
        },
    },

}
</script>