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
},];
const records = [
    { name: 'Document Control Register', url: '/admin/announcement' },
    { name: 'Training', url: '/admin/announcement' },
    { name: 'Ched Marina Internal Audit Record', url: '/admin/announcement' },
    { name: 'ClassNK Internal Audit Record', url: '/admin/announcement' },
    { name: 'Meeting of the Minutes', url: '/admin/announcement' }
]
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
    name: 'Records',
    child: records,
    link: null
},
{
    name: 'Settings',
    child: settings,
    link: null
},

];

export default {
    items
};