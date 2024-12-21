import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { userCurrent as queryCurrentUser } from '@/services/yeguo-api/userController';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { Link, history } from '@umijs/max';
import { message } from 'antd';
import defaultSettings from '../config/defaultSettings';
import BackToTopButton from './components/BackToTopButton';
import Container from './components/Container';
import generateSignature from './pages/utils/generateSignature';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
const pathList = [loginPath, registerPath];
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const result = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return result.data;
    } catch (error) {
      history.push(loginPath);
      message.error('网络繁忙,稍后重试');
    }
    return undefined;
  };

  // 当前不是登录页面和注册页面，执行
  const { location } = history;
  if (!pathList.includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const username = initialState?.currentUser?.username;
  const userAccount = initialState?.currentUser?.userAccount;
  const avatarUrl = initialState?.currentUser?.avatarUrl;
  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: avatarUrl,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: username ? username : userAccount,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录,并且不在登录页面和注册页面,则重定向到 login
      if (!initialState?.currentUser && !pathList.includes(location.pathname)) {
        message.error('未登录');
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <Container>
            {children}
            <BackToTopButton></BackToTopButton>
            {isDev && (
              <SettingDrawer
                disableUrlParams
                enableDarkTheme
                settings={initialState?.settings}
                onSettingChange={(settings) => {
                  setInitialState((preInitialState) => ({
                    ...preInitialState,
                    settings,
                  }));
                }}
              />
            )}
          </Container>
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  // 多环境设置
  baseURL: process.env.NODE_ENV === 'production' ? 'https://server.api.yeguo.icu' : '',
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      if (url.includes('/api/interfaceInfo/onlineInvoking')) {
        console.log('请求拦截器=================================');
        console.log('URL===>', url);
        console.log('Options===>', options);
        const secretKey = options.headers?.['X-Secret-Key'];
        // 构建签名串
        const message = `${options.ApiMethod}\n${options.pathname}\n${
          'X-Access-Key:' + options.headers?.['X-Access-Key'] || ''
        }\n${'X-Timestamp:' + options.headers?.['X-Timestamp'] || ''}\n${
          'X-Nonce:' + options.headers?.['X-Nonce'] || ''
        }`;
        console.log('签名字符串：\n' + message);
        console.log('密钥：' + secretKey);

        // 生成数字签名
        const signature = generateSignature(message, secretKey);
        console.log('签名：' + signature);
        // 将数字签名添加到请求头中
        delete options.headers?.['X-Secret-Key'];
        console.log('请求拦截器修改后的Headers===>', options.headers);
        options.headers = {
          ...options.headers,
          'X-Signature': signature,
        };
      }
      return { url, options };
    },
  ],
};
