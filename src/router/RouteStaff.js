import {
  RouteModel
} from './RouteModel'
const routeModel = new RouteModel()
const userType = 'staff'
export const staffRoute = (prop) => [{
  path: '/',
  name: prop + '.dashboard',
  meta: {
    auth: true,
    name: 'Dashboard',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/StaffDashboard.vue')
},
{
  path: '/staff/dashboard',
  name: prop + '.dashboard',
  meta: {
    auth: true,
    name: 'Dashboard',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/StaffDashboard.vue')
},
{
  path: '/staff/Announcements',
  name: prop + '.announcements',
  meta: {
    auth: true,
    name: 'Announcement',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/StaffDashboard.vue')
},
{
  path: '/staff/General-Policy',
  name: prop + '.general-policy',
  meta: {
    auth: true,
    name: 'General Policy',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Policy/GeneralPolicy.vue')
},
{
  path: '/staff/Department-Policy',
  name: prop + '.department-policy',
  meta: {
    auth: true,
    name: 'Department Policy',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Policy/DepartmentPolicy.vue')
},

{
  path: '/staff/General-Form',
  name: prop + '.general-form',
  meta: {
    auth: true,
    name: 'General Form',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Form/GeneralForms.vue')
},
{
  path: '/staff/Department-Form',
  name: prop + '.department-form',
  meta: {
    auth: true,
    name: 'Department Form',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Form/DepartmentForms.vue')
},
{
  path: '/staff/Profile',
  name: prop + '.profile',
  meta: {
    auth: true,
    name: 'Staff Profile',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Settings/Profile.vue')
},
{
  path: '/staff/Procedure',
  name: prop + '.procedures',
  meta: {
    auth: true,
    name: 'Procedure Documents',
    user: 'staff'
  },
  component: () => import('../views/StaffSide/Procedure/Procedures.vue')
},
/* Procedure */
routeModel.appendUserRoute(prop, '.procedures', '/staff/procedures', 'Procedures', userType, () => import('@/views/Staff/Procedures/ProceduresView.vue')),
/* Forms */
routeModel.appendUserRoute(prop, '.departmental-forms', '/staff/departmental-forms', 'DEPARTMENTAL FORMS', userType, () => import('@/views/Staff/Forms/DepartmentalForms.vue')),
routeModel.appendUserRoute(prop, '.general-forms', '/staff/general-forms', 'GENERAL FORMS', userType, () => import('@/views/Staff/Forms/GeneralForms.vue')),
routeModel.appendUserRoute(prop, '.mission-and-vision', '/staff/mission-and-vision', 'Mission and Vision', userType, () => import('@/views/Staff/MissionAndVision/View.vue')),
routeModel.appendUserRoute(prop, '.maintenance-view', '/staff/maintenance', 'Mission and Vision', userType, () => import('@/views/MaintenanceView.vue')),
/* Risk and Opportunity */
routeModel.appendUserRoute(prop, '.risk-and-opportunity', '/staff/risk-and-opportunity', 'Risk and Opportunity', userType, () => import('@/views/Module/RiskOpportunity/View.vue')),
routeModel.appendUserRoute(prop, '.risk-and-opportunity-create', '/staff/risk-and-opportunity/create', 'Create Risk and Opportunity', userType, () => import('@/views/Module/RiskOpportunity/Create.vue')),
routeModel.appendUserRoute(prop, '.risk-and-opportunity-update', '/staff/risk-and-opportunity/:view/update', 'Update Risk and Opportunity', userType, () => import('@/views/Module/RiskOpportunity/Update.vue'))
]