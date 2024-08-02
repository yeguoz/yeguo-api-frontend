export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
      { name: '忘记密码', path: '/user/forget', component: './User/Forget' },
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
      { path: '/admin/orderinfo', name: '订单管理页', component: './Admin/OrderInfo' },
    ],
  },
  {
    name: '接口市集',
    icon: 'Api',
    path: '/interfaceInfo',
    routes: [
      { path: '/interfaceInfo', component: './InterfaceInfo' },
      {
        path: '/interfaceInfo/detail',
        name: '接口详情',
        component: './InterfaceInfo/Detail',
        hideInMenu: true,
      },
    ],
  },
  { name: '支付页', path: '/:orderId/pay', component: './Pay', hideInMenu: true },
  { name: '果币商城', icon: 'PayCircle', path: '/coinmall', component: './CoinMall' },
  { name: '我的订单', icon: 'UnorderedList', path: '/orderinfo', component: './OrderInfo' },
  { name: '个人主页', icon: 'User', path: '/person', component: './Person' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
