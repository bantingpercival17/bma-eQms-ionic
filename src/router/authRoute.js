const addRoute = (prop, name, path, metaName, component) => ({
    path,
    name: prop + name,
    meta: {
        auth: false,
        name: metaName,
        user: 'guest'
    },
    component: () => import(component)
})
export const authRoute = (prop) => [
    addRoute(prop, '.login', '/', 'Login', '../views/Auth/Login.vue'),
    addRoute(prop, '.login', '/login', 'Login', '../views/Auth/Login.vue'),
    addRoute(prop, '.forget-password', '/forget-password', 'Forget Password', '../views/Auth/Login.vue')
]