import { FileTextFilled, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '使用文档',
          title: (
            <>
              <FileTextFilled /> 使用文档
            </>
          ),
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 支持项目
            </>
          ),
          href: 'https://github.com/ye-guo/yeguo-api-backend',
          blankTarget: true,
        },
        {
          key: '微信联系',
          title: (
            <>
              <WechatOutlined /> 联系作者
            </>
          ),
          href: 'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/myWeChat.jpg',
          blankTarget: true,
        },
      ]}
      copyright={
        new Date().getFullYear() === 2024
          ? `${new Date().getFullYear()} 野果工作室出品`
          : `2024-${new Date().getFullYear()} 野果工作室出品`
      }
    />
  );
};

export default Footer;
