import {
    RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'guest'
export const authRoute = (prop) => [
    routeModel.appendRoute(prop, '.login', '/', 'Login', () => import('@/views/Auth/Login.vue'), userType),
    routeModel.appendRoute(prop, '.login', '/login', 'Login', () => import('@/views/Auth/Login.vue'), userType),
    routeModel.appendRoute(prop, '.forget-password', '/forget-password', 'Forget Password', () => import('@/views/Auth/Login.vue'), userType)
]