import {
  RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'admin'
export const adminRoute = (prop) => [
  routeModel.appendRoute(prop, '.dashboard', '/', 'Dashboard', () => import('@/views/Students/Dashboard/AdminDashboard.vue'), userType),
  routeModel.appendRoute(prop, '.dashboard', '/admin/dashboard', 'Dashboard', () => import('@/views/Students/Dashboard/AdminDashboard.vue'), userType),
  routeModel.appendRoute(prop, '.user-management', '/administrative/user-management', 'User Management', () => import('@/views/Administrative/User/UserView.vue'), userType),
  /* Procedure */
  routeModel.appendRoute(prop, '.procedure', '/admin/procedures', 'Procedures', () => import(`@/views/Administrative/Procedure/ProcedureView.vue`), userType),
  routeModel.appendRoute(prop, '.procedure-view', '/admin/procedure/view/:view', 'Procedure', () => import(`@/views/Administrative/Procedure/ProcedureFile.vue`), userType),
  /* Forms */
  routeModel.appendRoute(prop, '.form-view', '/admin/forms/', 'Forms', () => import('@/views/Administrative/Forms/FormsView.vue'), userType),
  routeModel.appendRoute(prop, '.form-view-files', '/admin/forms/:view/files/', 'Form File', () => import('@/views/Administrative/Forms/FormsFilesView.vue'), userType),
  /* Form Drafts */
  /* Mission And Vission */
  routeModel.appendRoute(prop, '.mission-and-vision', '/admin/mission-and-vision', () => import('@/views/Administrative/MissionAndVision/View.vue'),userType),
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