// src/plugins/globalMethods.js

import {
    loadingController,
    alertController
} from '@ionic/vue';

export default {
    install(app) {
        // Global method for showing a loading indicator
        app.config.globalProperties.$showLoading = async (message = 'Loading...') => {
            const loading = await loadingController.create({
                message,
                cssClass: 'custom-loading',
            });
            await loading.present();
            return loading; // Return the loading instance to allow dismissal
        };

        // Global method for showing an alert
        app.config.globalProperties.$showMessageBox = async (title, message) => {
            const alert = await alertController.create({
                header: title,
                subHeader: message,
                buttons: ['Okay'],
            });
            await alert.present();
        };
    }
};