export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/interfaceInfo', name: '接口管理页', component: './Admin/InterfaceInfo' },
      { path: '/admin/user', name: '用户管理页', component: './Admin/User' },
    ],
  },
  { name: '接口市集', icon: 'table', path: '/interfaceInfo', component: './InterfaceInfo' },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '个人主页', icon: 'table', path: '/person', component: './Person' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
