import { Footer } from '@/components';

import {
  userEmailLogin,
  userEmailVerifyCode,
  userLogin,
} from '@/services/yeguo-api/userController';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Divider, Space, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import isEmailVerifyData from '../common/isEmailverifyData';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: "url('/assets/74.jpg')", //63 80 56 74
      backgroundSize: '100% 100%',
    },
  };
});
// const ActionIcons = () => {
//   const { styles } = useStyles();
//   return (
//     <>
//       <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
//       <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
//       <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
//     </>
//   );
// };

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.UserLoginParams>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const EmailHandleSubmit = async (values: API.UserEmailRegisterLoginParams) => {
    try {
      // 邮箱登录 API.ResponseData
      const result = await userEmailLogin({ ...values });

      // 登录成功返回userVO
      if (result.data) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      message.error(result.description);
    } catch (error: any) {
      const defaultLoginFailureMessage = '网络繁忙,请稍后重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleSubmit = async (values: API.UserLoginParams) => {
    try {
      // 登录
      const result = await userLogin({
        ...values,
      });

      if (result.data) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      message.error(result.description);
    } catch (error: any) {
      const defaultLoginFailureMessage = '网络繁忙,请稍后重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}-{Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title={'YGAPI开放平台'}
          subTitle={'YGAPI 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            if (isEmailVerifyData(values)) {
              await EmailHandleSubmit(values);
              return;
            }
            await handleSubmit(values as API.UserLoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'email',
                label: '邮箱登录',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号!'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码!'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="email"
                placeholder={'请输入邮箱！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误！',
                  },
                ]}
              />

              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                // 手机号的 name，onGetCaptcha 会注入这个值
                phoneName="email"
                name="verifyCode"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
                placeholder="请输入验证码!"
                // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
                // throw new Error("获取验证码错误")
                onGetCaptcha={async (email) => {
                  await waitTime(0);
                  // 调用后端发送验证码接口，发送邮件
                  const result = await userEmailVerifyCode(email);
                  if (!result.data) {
                    message.error(`${result.description}`);
                    return;
                  }
                  // 成功
                  message.success(`邮箱 ${email} 验证码发送成功!`);
                }}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />} size={105}>
              <Link to="/user/register">注册</Link>
              <a
                onClick={() => {
                  alert('请联系管理员:aidjajd@163.com');
                }}
              >
                忘记密码？
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
