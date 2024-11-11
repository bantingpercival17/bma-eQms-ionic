export class RouteModel {
    appendRoute(prop, name, path, metaName, importComponent, userType) {
        return {
            path: path,
            name: prop + name,
            meta: {
                auth: false,
                name: metaName,
                user: userType
            },
            component: importComponent
        };
    }
    appendUserRoute(prop, name, path, metaName, userType, importComponent) {
        return {
            path: path,
            name: prop + name,
            meta: {
                auth: true,
                name: metaName,
                user: userType
            },
            component: importComponent
        };
    }
    adminUserMiddleware(to, from, next) {
        if (to.meta.user !== 'admin') {
            next('/admin/dashboard')
        } else {
            next()
        }
    }
    staffUserMiddleware(to, from, next) {
        if (to.meta.user !== 'staff') {
            next('/staff/dashboard')
        } else {
            next()
        }
    }
}