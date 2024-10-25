<template>
    <ion-loading :is-open="isOpen" message="Please wait..." spinner="crescent"
        @ionLoadingDidDismiss="onDismiss"></ion-loading>
</template>

<script>
import { IonLoading } from '@ionic/vue';
export default {
    name: 'ContentLoaderView',
    components: { IonLoading },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        onDismiss() {
            this.$emit("dismiss");
        }
    }
};
</script>