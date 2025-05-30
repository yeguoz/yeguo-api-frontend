import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'YGAPI开放平台',
  navTheme: 'light',
  colorPrimary: '#a6559d',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  pwa: true,
  logo: 'https://gw.yeguo.icu/static/picture/ygIcon512.png',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //     //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  splitMenus: false,
};

export default Settings;
