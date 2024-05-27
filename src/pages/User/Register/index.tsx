import { Footer } from '@/components';
import { LockOutlined, MailTwoTone, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history } from '@umijs/max';
import { Divider, Space, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { userRegister } from '@/services/yeguo-api/userController';

// 样式
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
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Register: React.FC = () => {
  const [type, setType] = useState<string>('platform_register');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserRegisterParams) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('两次密码输入不一致');
      return;
    }

    try {
      // 注册  API.ResponseData
      const result = await userRegister({ ...values });
      console.log("id:"+result.data);
      
      // 注册成功返回id 
      if (result.data > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      }
      // 失败直接抛出异常
      // @ts-ignore
      throw new Error(result.description);
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      // ?? 如果 error.message  的值为 null 或 undefined，则返回 dLFM，否则返回 error.message的值。
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="野果-api开放平台"
          subTitle={'野果-api 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'platform_register',
                label: '平台注册',
              },
              {
                key: 'mail_register',
                label: '邮箱注册',
              },
            ]}
          />

          {type === 'platform_register' && (
            <>
               <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入昵称'}
              />
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    message: '长度不小于4！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '长度不小于8！',
                  },
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '长度不小于8！',
                  },
                ]}
              />
            </>
          )}

          {type === 'mail_register' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入邮箱'}
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
                  prefix: <MailTwoTone />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                // 手机号的 name，onGetCaptcha 会注入这个值
                phoneName="email"
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ]}
                placeholder="请输入验证码"
                // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
                // throw new Error("获取验证码错误")
                onGetCaptcha={async (email) => {
                  await waitTime(500);
                  // 调用后端发送验证码接口，发送邮件
                  
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
              <Link to="/user/login">登录</Link>
              <a onClick={()=>{alert("请联系管理员:aidjajd@163.com")}}>忘记密码？</a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
