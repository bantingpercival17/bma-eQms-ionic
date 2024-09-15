import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import {
  staffRoute
} from './RouteStaff.js'
import {
  adminRoute
} from './RouteAdmin.js'
import {
  authRoute
} from './RouteAuthentication.js'
import {
  RouteModel
} from './RouteModel'
import store from '../store/index'
import {
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TYPE,
  AUTO_LOGIN_ACTION,
} from '@/store/storeConstants'

store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)

const routeModel = new RouteModel();
const routes = [{
    path: '/',
    redirect: '/login',
    name: 'client-layout',
    component: () => import('@/components/layouts/AuthLayout.vue'),
    children: authRoute('client-layout')
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    name: 'admin-layout',
    component: () => import('@/components/layouts/MainLayout.vue'),
    children: adminRoute('admin-layout')
  },
  {
    path: '/staff',
    redirect: '/staff/dashboard',
    name: 'staff-layout',
    component: () => import('@/components/layouts/StaffLayout.vue'),
    children: staffRoute('staff-layout')
  },
];


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`

  if (isAuth) {
    if (isAuthType === 'admin') {
      routeModel.adminUserMiddleware(to, from, next)
    } else if (isAuthType === 'staff') {
      routeModel.staffUserMiddleware(to, from, next)
    }
  } else {
    if (to.meta.user !== 'guest') {
      next('/')
    } else {
      next()
    }
  }
  /* console.log('BASE_URL:',
    import.meta.env.BASE_URL); */
})
export default router