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
                    <div class="accordion-content" slot="content" v-for="(data1, index) in data.child" :key="index">
                        <!--  <router-link v-if="data1.url" :to="{ name: data1.url }" class="nav-item">
                            <ion-label>{{ data1.name }}</ion-label>
                        </router-link> -->
                        <router-link v-if="data1.url" :to="{ name: data1.url }"
                            :class="`accordion-content-item ${activeNav(data1.url) ? 'item-active' : ''}`">
                            <ion-label>{{ data1.name }}</ion-label>
                        </router-link>
                    </div>
                </template>
            </ion-accordion>
        </ion-accordion-group>
    </div>
</template>
<style scoped>
.accordion-content {
    cursor: default;
    border-radius: 5px;
}

.accordion-content[slot="content"]:hover {
    color: #18995B;
}

ion-accordion.accordion-collapsing ion-item[slot='content'],
ion-accordion.accordion-collapsed ion-item[slot='content'] {
    --background: var(--ion-color-light);
    --color: var(--ion-color-light-contrast);
}

.accordion-content-item {
    display: flex;
    align-items: center;
    padding: 12px 32px;
    text-decoration: none;
    /* Removes the default underline */
    transition: background-color 0.3s ease;
    color: #8D8C8F;
    margin: 5px 10px;
}

.accordion-content-item:hover,
.item-active {
    background-color: #18995B;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    margin: 5px 10px;
}

.accordion-content-item ion-label {
    font-size: 16px;
    color: var(--ion-text-color);
    /* Keep the text color consistent */
}


ion-item[slot='header']:hover {
    --background: #18995B;
    --color: #fff;
    font-weight: bold;
}

ion-accordion.accordion-expanding ion-item[slot='header'],
ion-accordion.accordion-expanded ion-item[slot='header'] {
    --background: #18995B;
    --color: #fff;
    font-weight: bold;
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
    },
    methods: {
        activeNav(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        }
    }
};
</script>
