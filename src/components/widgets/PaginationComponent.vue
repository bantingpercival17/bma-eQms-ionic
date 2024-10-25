<template>
    <div class="float-end">
        <button :disabled="currentPage <= 1" @click="previousPage" class="btn btn-secondary btn-sm me-3">
            Previous
        </button>
        <span class="text-muted fw-bold">Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="nextPage" class="btn btn-secondary btn-sm ms-3">
            Next
        </button>
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
        nextPage() {
            this.$emit('change', this.currentPage + 1);
        },
        previousPage() {
            this.$emit('change', this.currentPage - 1);
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