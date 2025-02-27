import { FileTextFilled, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { Tooltip } from 'antd';
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
          href: 'https://apidocs.yeguo.icu',
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
              <Tooltip title={<img src="/assets/vx.png" width={100} />}>
                <WechatOutlined /> 联系作者
              </Tooltip>
            </>
          ),
          href: 'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/myWeChat.jpg',
          blankTarget: true,
        },
      ]}
      copyright={
        new Date().getFullYear() === 2024
          ? `${new Date().getFullYear()} 野果出品`
          : `2024-${new Date().getFullYear()} 野果出品`
      }
    />
  );
};

export default Footer;
