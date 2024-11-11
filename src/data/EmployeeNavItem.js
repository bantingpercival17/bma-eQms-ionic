const prop = 'staff-layout'

const dashboard = [
    { name: 'Announcements', url: prop + '.announcements' },
];
const qms = [
    { name: 'Procedures', url: prop + '.procedures' },
    { name: 'Forms', url: prop + '.general-forms' },
    { name: 'Mission and Vision', url: prop + '.mission-and-vision' }
]


/*   const policy = [
      { name: 'General Policy', url: '/staff/General-Policy' },
      { name: 'Department Policy', url: '/staff/Department-Policy' },
  ]; */
const forms = [
    { name: 'Draft', url: prop + '.maintenance-view' },
    { name: 'Submitted', url: prop + '.maintenance-view' }
]
const setting = [
    { name: 'Profile', url: prop + '.profile', },
];

const items = [
    { name: 'Dashboard', child: dashboard },
    { name: 'E-QMS', child: qms },
    { name: 'Forms', child: forms },
    { name: 'Settings', child: setting },
];



export default {
    items
};