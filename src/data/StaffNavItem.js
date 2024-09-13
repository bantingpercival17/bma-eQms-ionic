const dashboard = [{
        name: 'Statistics',
        url: '/admin/statistics'
    },
    {
        name: 'Announcements',
        url: '/admin/announcement'
    },
    {
        name: 'Monitoring',
        url: '/admin/monitoring'
    },
    {
        name: 'Calendar',
        url: '/admin/calendar'
    },
];

const managing = [
    /*  { name: 'Policy Documents', url: '/admin/Add-Policy-Documents' }, */
    {
        name: 'Procedures',
        url: '/admin/procedures'
    },
    /*   { name: 'Work Instructions', url: '/admin/Add-Work-Instructions' }, */
    /*      { name: 'Departments', url: '/admin/Add-Departments' }, */
    {
        name: 'Forms',
        url: '/admin/forms'
    },
    /*   { name: 'Records', url: '/admin/Add-Records' }, */
];

const settings = [{
    name: 'Account Management',
    url: '/administrative/user-management'
}, ];

const items = [{
        name: 'Dashboard',
        child: dashboard,
        link: null
    },
    {
        name: 'QMS',
        child: managing,
        link: null
    },
    {
        name: 'Settings',
        child: settings,
        link: null
    },
    /*      { name: 'User Management', child:[], link: '/administrative/user-management' } */
];

export default {
    items
};