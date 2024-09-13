const addRoute = (prop, name, path, metaName, component) => ({
  path,
  name: prop + name,
  meta: {
    auth: true,
    name: metaName,
    user: 'admin'
  },
  component: () => import(component)
});

const path = '../views/Administrative/'
export const adminRoute = (prop) => [
  addRoute(prop, '.dashboard', '/', 'Dashboard', '../views/Students/Dashboard/AdminDashboard.vue'),
  addRoute(prop, '.dashboard', '/admin/dashboard', 'Dashboard', '../views/Students/Dashboard/AdminDashboard.vue'),
  addRoute(prop, '.user-management', '/administrative/user-management', 'User Management', '../views/Administrative/User/UserView.vue'),
  /* Procedure */
  addRoute(prop, '.procedure', '/admin/procedures', 'Procedures', path + 'Procedure/ProcedureView.vue'),
  addRoute(prop, '.procedure-view', '/admin/procedure/view/:view', 'Procedure', path + 'Procedure/ProcedureFile.vue'),

  /* Forms */
  addRoute(prop, '.form-view', '/admin/forms/', 'Forms', path + 'Forms/FormsView.vue'),
  {
    path: '/admin/Add-Policy-Documents',
    name: prop + '.add-policy-documents',
    meta: {
      auth: true,
      name: 'Add Policy Documents',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Policy Documents/PolicyDocuments.vue')
  },
  {
    path: '/admin/Add-Procedures',
    name: prop + '.add-procedures',
    meta: {
      auth: true,
      name: 'Add Procedures',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Procedures/AddProcedures.vue')
  },
  {
    path: '/admin/Add-Work-Instructions',
    name: prop + '.add-work-instructions',
    meta: {
      auth: true,
      name: 'Add Work Instructions',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Work Instructions/AddWorkInstruction.vue')
  },
  {
    path: '/admin/Add-Departments',
    name: prop + '.add-departments',
    meta: {
      auth: true,
      name: 'Add Departments',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Departments/AddDepartments.vue')
  },
  {
    path: '/admin/Add-Forms',
    name: prop + '.add-forms',
    meta: {
      auth: true,
      name: 'Add Forms',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Forms/AddForm.vue')
  },
  {
    path: '/admin/upload-forms/',
    name: 'admin.upload-forms',
    meta: {
      auth: true,
      name: 'Upload Forms',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Forms/UploadForm.vue')
  },
  {
    path: '/admin/Add-Records',
    name: prop + '.add-records',
    meta: {
      auth: true,
      name: 'Add Records',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Records/AddRecords.vue')
  },
  {
    path: '/admin/Account-Management',
    name: prop + '.account-management',
    meta: {
      auth: true,
      name: 'Account Management',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Settings/AccountManagement.vue')
  },
  {
    path: '/admin/statistics',
    name: prop + '.statistics',
    meta: {
      auth: true,
      name: 'Statistics',
      user: 'admin'
    },
    component: () => import('../views/Students/Dashboard/AdminDashboard.vue')
  },
  {
    path: '/admin/announcement',
    name: prop + '.annnouncement',
    meta: {
      auth: true,
      name: 'Announcement',
      user: 'admin'
    },
    component: () => import('../views/Students/Dashboard/Announcement.vue')
  },
  {
    path: '/admin/monitoring',
    name: prop + '.monitoring',
    meta: {
      auth: true,
      name: 'Monitoring',
      user: 'admin'
    },
    component: () => import('../views/Students/Dashboard/Monitoring.vue')
  },
  {
    path: '/admin/calendar',
    name: prop + '.calendar',
    meta: {
      auth: true,
      name: 'Calendar',
      user: 'admin'
    },
    component: () => import('../views/Students/Dashboard/Calendar.vue')
  },
  {
    path: '/admin/edit-account/',
    name: 'admin.edit-account',
    meta: {
      auth: true,
      name: 'Edit Account',
      user: 'admin'
    },
    component: () => import('../views/Students/Management/Settings/EditAccount.vue')
  },
]