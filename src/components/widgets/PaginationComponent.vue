<template>
    <div class="">
        <div class="row">
            <div class="col-md-5">

            </div>
            <div class="col-md">
                <button :class="['btn', 'btn-sm', 'me-3', currentPage <= 1 ? 'btn-secondary' : 'btn-primary']"
                    @click="previousPage" :disabled="currentPage <= 1">
                    Previous
                </button>

                <span class="text-muted fw-bold">Page {{ currentPage }} of {{ totalPages }}</span>

                <button :class="['btn', 'btn-sm', 'ms-3', currentPage >= totalPages ? 'btn-secondary' : 'btn-primary']"
                    @click="nextPage" :disabled="currentPage >= totalPages">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { IonContent, IonFooter, IonCard, IonCardContent, } from '@ionic/vue';
export default {
    name: 'PaginationComponent',
    components: {
        IonContent, IonFooter, IonCard, IonCardContent
    },
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        /*  nextPage() {
             this.$emit('change', this.currentPage + 1);
         },
         previousPage() {
             this.$emit('change', this.currentPage - 1);
         } */
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('page-changed', this.currentPage + 1);
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.$emit('page-changed', this.currentPage - 1);
            }
        }
    }
};
</script>

<style scoped>
ion-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
}
</style>

<!-- <template>
    <ion-footer>
        <div class="pagination-container">
            <ion-button fill="outline" size="small" :disabled="currentPage <= 1" @click="previousPage">
                Previous
            </ion-button>
            <span class="text-muted fw-bold">Page {{ currentPage }} of {{ totalPages }}</span>
            <ion-button fill="outline" size="small" :disabled="currentPage >= totalPages" @click="nextPage">
                Next
            </ion-button>
        </div>
    </ion-footer>
</template>

<script>
import { IonFooter, IonButton } from '@ionic/vue';

export default {
    name: 'PaginationComponent',
    components: {
        IonFooter, IonButton
    },
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true,
            validator: value => value >= 1
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('page-changed', this.currentPage + 1);
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.$emit('page-changed', this.currentPage - 1);
            }
        }
    }
};
</script>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
}
</style>
 -->