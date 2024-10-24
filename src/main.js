import {
  createApp
} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';
import {
  IonicVue
} from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
//import './registerServiceWorker'
/* Theme variables */
import './theme/variables.css';
import axiosInstance from './axios';
/* import DatabaseSetup from './database'; */
import alertMethods from './components/alert/alertMethods';
const app = createApp(App)
  .use(store)
  .use(IonicVue)
  .use(alertMethods)
  .use(router);
// Provide the Axios instance globally
const initializeApp = async () => {
  /* const databaseConnection = new DatabaseSetup();
  await databaseConnection.initDatabase();
 */
  // Once database setup is initialized, provide the Axios instance globally
  app.config.globalProperties.$axios = axiosInstance;

  // Mount the app once everything is ready
  app.mount('#app');
};
router.isReady().then(initializeApp);

/* router.isReady().then(() => {
  app.config.globalProperties.$axios = axiosInstance;
  app.mount('#app');
}); */