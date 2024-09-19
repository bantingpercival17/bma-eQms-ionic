<template>
    <div v-if="!isLoading">
        <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
            <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
                refreshing-text="Refreshing...">
            </ion-refresher-content>
        </ion-refresher>
        <!--   <ion-content>

        </ion-content> -->
        <div v-if="!errorDetails">
            <p class="display-6 fw-bolder text-primary">FORMS</p>
            <div class="row">
                <div class="col-md-7">
                    <!--   <AddProcedureFile :token="token" :procedure="encrypt(details.id)" /> -->
                    <ion-card class="mt-3">
                        <ion-card-content>
                            <div class="table-responsive">
                                <table id="basic-table" class="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th id="documentType" scope="col">FORM DETAILS</th>
                                            <th id="documentType" scope="col">FORM STATUS</th>
                                            <th>FILE PASSWORD</th>
                                            <th id="actions" scope="col">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="data.length > 0">
                                            <tr v-for="(form, index) in data" :key="index">
                                                <td>
                                                    <span class="text-primary fw-bolder">{{ form.form_name }}</span>
                                                    <br>
                                                    <span class="fw-bolder text-muted">
                                                        {{ form.form_code }}
                                                    </span>

                                                </td>
                                                <td>
                                                    {{ form.is_common === 1 ? 'GENERAL FORM' : 'DEPARTMENTAL FORM' }}
                                                </td>
                                                <td>
                                                    <label class="text-muted " v-if="form.document"
                                                        @click="copyToClipboard(form.document.password)">
                                                        {{ form.document.password }}
                                                    </label>
                                                </td>
                                                <td>
                                                    <span v-if="form.document" @click="openPDF(form.document.file_link)"
                                                        class="btn btn-primary btn-sm me-3">VIEW PDF</span>

                                                    <span v-else @click="openPDF(form.id)"
                                                        class="btn btn-primary btn-sm me-3">UPLOAD FILE</span>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td colspan="4">No Data</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </ion-card-content>
                    </ion-card>
                </div>
                <div class="col-md-5">
                    <CreateForm :token="token" :departmentList="departments" :procedureList="procedures" />
                </div>
            </div>
        </div>
        <div v-else>
            <p class="badge bg-danger">{{ errorDetails }}</p>
        </div>
    </div>
    <div v-else>
        <p class="badge bg-info">LOADING CONTENTS</p>
    </div>

</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, } from '@ionic/vue';
import CreateForm from '../Forms/widgets/CreateForms.vue'
export default {
    name: 'AddProcedurePage',
    components: {
        IonContent, IonButton, IonRefresher, IonRefresherContent, IonCard, IonCardContent, CreateForm
    },
    data() {
        return {
            isLoading: true,
            data: [],
            errorDetails: null,
            procedures: [],
            departments: []
        };
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
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Password copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        },
        encrypt(data) {
            return btoa(data)
        },
        async handleScroll(event) {
            event.target.complete();
            this.retriveForms()
            this.departments = await this.fetchDataList('role-list', 'roles')
            this.procedures = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
        },
        async retriveForms() {
            this.isLoading = true
            this.errorDetails = null
            this.details = []
            axios.get(`forms/retrive-forms`, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.data = response.data.forms
                    this.isLoading = false
                })
                .catch(error => {
                    this.errorDetails = error
                    console.error('Error fetching file content:', error);
                    this.isLoading = false
                });
        },
    },
    mounted() {
        this.retriveForms()
    },
    async created() {
        this.departments = await this.fetchDataList('role-list', 'roles')
        this.procedures = await this.fetchDataList('/procedure/retrive-procedure', 'procedures')
    }

}
</script>