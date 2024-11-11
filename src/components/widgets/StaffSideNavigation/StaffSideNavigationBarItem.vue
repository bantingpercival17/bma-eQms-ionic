<template>
    <div class="mt-5">
        <ion-accordion-group>
            <ion-accordion v-for="(data, index) in items" :key="index">
                <ion-item v-if="!data.child" slot="content">
                    <router-link v-if="data.url" :to="data.url">
                        <ion-label>{{ data.name }}</ion-label>
                    </router-link>
                </ion-item>
                <template v-else>
                    <ion-item slot="header">
                        <ion-label>{{ data.name }}</ion-label>
                    </ion-item>
                    <div class="ion-padding accordion-content" slot="content" v-for="(data1, index) in data.child"
                        :key="index">
                        <router-link v-if="data1.url" :to="{ name: data1.url }">
                            <ion-label>{{ data1.name }}</ion-label>
                        </router-link>
                    </div>
                </template>
            </ion-accordion>
        </ion-accordion-group>
    </div>
</template>
<style>
.accordion-content {
    cursor: default;
}

.accordion-content:hover {
    color: #18995B;
    /* Adjust as needed */
}
</style>
<script>
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
import { RouterLink } from 'vue-router';
import EmployeeNavItem from '../../../data/EmployeeNavItem';
export default {
    name: 'StaffSideNavigationBar',
    components: {
        IonAccordion,
        IonAccordionGroup,
        IonItem,
        IonLabel,
        RouterLink,
    },

    data() {

        return {
            items: EmployeeNavItem.items
        };
    }
};
</script>
