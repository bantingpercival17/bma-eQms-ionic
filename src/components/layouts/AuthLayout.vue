<template>
  <ion-page>
    <ion-content class="main-content">
      <div class="fuild-container">
        <router-view></router-view>
      </div>
    </ion-content>

  </ion-page>
</template>

<script>
import {
  IonPage, IonLabel,
  IonContent
} from '@ionic/vue';
import GuestFooter from '../widgets/Fotters/GuestFooter.vue';
export default {
  name: 'StudentLoginPage',
  components: {
    IonPage, IonLabel, IonContent, GuestFooter
  },

}

</script>