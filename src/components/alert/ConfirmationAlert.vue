<template>
    <div>
        <!-- IonAlert component to show the alert -->
        <ion-alert :is-open="isAlertOpen" :header="header" :message="message" :buttons="buttons"
            @didDismiss="onDismiss" />
    </div>
</template>

<script>
import { ref } from 'vue';
import { IonAlert } from '@ionic/vue';

export default {
    name: 'ConfirmationAlert',
    components: {
        IonAlert,
    },
    props: {
        // You can pass the message dynamically when calling the alert
        header: {
            type: String,
            default: 'Confirm'
        },
        message: {
            type: String,
            default: 'Are you sure you want to proceed?',
        },
        confirmText: {
            type: String,
            default: 'Confirm',
        },
        cancelText: {
            type: String,
            default: 'Cancel',
        },
        data: {
            type: [Object, String, Number],
            default: null,
        },
    },
    data() {
        return {
            isAlertOpen: false, // To control the alert visibility
            buttons: [], // Buttons for the alert
        };
    },
    methods: {
        showAlert() {
            // Setup buttons with handler functions
            this.buttons = [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: () => {
                        this.$emit('cancelled');
                    },
                },
                {
                    text: this.confirmText,
                    handler: () => {
                        this.$emit('confirmed',this.data);
                    },
                },
            ];

            // Show the alert
            this.isAlertOpen = true;
        },
        onDismiss() {
            // Reset state after dismiss
            this.isAlertOpen = false;
        },
    },
};
</script>
