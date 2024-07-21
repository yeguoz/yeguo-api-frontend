import Container from '@/components/Container';
import { cancelOrderInfo } from '@/services/yeguo-api/orderInfoController';
import { ProCard } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { Button, Col, Row, message } from 'antd';
import { useLayoutEffect, useState } from 'react';

export default () => {
  const [buttonIsLoading, setButtonIsLoading] = useState({
    btn1: false,
    btn2: false,
  });
  // 从订单列表跳转带过来变量
  const { orderId, userId, commodityContent, money, payType, expireTime } =
    (useLocation().state as API.PayState) || {};
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>();
  const navigate = useNavigate();
  const handleCancel = async (btn: string) => {
    setButtonIsLoading((prevState) => ({
      ...prevState,
      [btn]: true,
    }));
    const result = await cancelOrderInfo(orderId);
    if (!result.data) {
      setButtonIsLoading((prevState) => ({
        ...prevState,
        [btn]: false,
      }));
      message.error(result.message);
      navigate('/orderinfo');
      return;
    }
    if (result.data === 2) {
      setButtonIsLoading((prevState) => ({
        ...prevState,
        [btn]: false,
      }));
      message.info('订单已失效');
      navigate('/orderinfo');
      return;
    }
    setButtonIsLoading((prevState) => ({
      ...prevState,
      [btn]: false,
    }));
    message.success(result.message);
    navigate('/orderinfo');
  };

  useLayoutEffect(() => {
    const expireT = new Date(expireTime).getTime();

    const interval = setInterval(async () => {
      const now = new Date().getTime();

      const timeLeft = expireT - now;

      if (timeLeft > 0) {
        setCountdown(Math.ceil(timeLeft / 1000));
      } else {
        clearInterval(interval);
        await cancelOrderInfo(orderId);
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <ProCard
        title={<strong>订单信息</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={10}>
            <strong>订单号：</strong>
            {orderId}
          </Col>
          <Col className="gutter-row" span={10}>
            <strong>用户Id：</strong>
            {userId}
          </Col>
          <Col className="gutter-row" span={10}>
            <strong>商品内容：</strong>
            {commodityContent}
          </Col>
          <Col className="gutter-row" span={10}>
            <strong>支付金额：</strong>
            <span style={{ color: '#d23918' }}>{money}</span>
          </Col>
          <Col className="gutter-row" span={10}>
            <strong>支付方式：</strong>
            {payType === 0 || payType === 1 ? (
              payType === 0 ? (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(246, 255, 237, 0.3)',
                    border: '0.03125rem solid skyblue',
                    borderRadius: '0.5rem',
                    color: '#8faa0d',
                  }}
                >
                  微信支付
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.3rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(22, 119, 255, 0.8)',
                    border: '0.03125rem solid #8faa0d',
                    borderRadius: '0.5rem',
                    color: '#fff',
                  }}
                >
                  支付宝支付
                </span>
              )
            ) : null}
          </Col>
        </Row>
      </ProCard>
      <ProCard
        title={<strong>支付二维码</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        {!isExpired ? (
          <>
            <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
              <div>
                <span>￥</span>
                <span style={{ color: '#d23918' }}>{money}</span>
              </div>
              <img
                src={`/assets/payqr/vx_${money}.png`}
                alt="支付二维码"
                style={{ width: '20rem' }}
              />
              <div style={{ fontSize: '1rem' }}>
                <p>
                  请使用微信扫描二维码进行支付，支付成功后请点击
                  <span style={{ color: '#d23918' }}>“我已经支付”</span>按钮
                </p>
                <p>该订单{countdown}秒后失效，请尽快支付</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button type="primary">我已经支付</Button>
              <Button
                type="primary"
                loading={buttonIsLoading.btn2}
                onClick={() => {
                  handleCancel('btn2');
                }}
              >
                取消支付
              </Button>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '1.5rem', color: '#d23918', textAlign: 'center' }}>
            该订单不存在或已失效或已完成！
          </div>
        )}
      </ProCard>
    </Container>
  );
};
