import { useNavigate, useSearchParams } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const App: React.FC = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tradeStatus = searchParams.get('trade_status');
  if (tradeStatus !== 'TRADE_SUCCESS') {
    return (
      <Result
        status="error"
        title="支付错误"
        subTitle="请联系管理员"
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/')}>
            返回主页
          </Button>,
        ]}
      />
    );
  }
  return (
    <Result
      status="success"
      title="支付成功"
      subTitle="请到个人主页查看"
      extra={[
        <Button type="primary" key="person" onClick={() => navigate('/person')}>
          个人主页
        </Button>,
        <Button type="primary" key="order" onClick={() => navigate('/orderinfo')}>
          订单列表
        </Button>,
      ]}
    />
  );
};

export default App;
