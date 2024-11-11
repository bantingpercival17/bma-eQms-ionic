const dashboard = [
    { name: 'Announcements', url: '/staff/Announcements' },
];
const qms = [
    { name: 'Procedures', url: '/staff/procedures' },
    { name: 'Forms', url: '/staff/general-forms' },
    { name: 'Mission and Vision', url: '/staff/mission-and-vision' }
]


/*   const policy = [
      { name: 'General Policy', url: '/staff/General-Policy' },
      { name: 'Department Policy', url: '/staff/Department-Policy' },
  ]; */
const forms = [
    { name: 'Draft', url: '/' },
    { name: 'Submitted', url: '/' }
]
const setting = [
    { name: 'Profile', url: '/staff/Profile' },
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