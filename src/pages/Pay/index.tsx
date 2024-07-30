import Container from '@/components/Container';
import {
  getUserOrderInfos,
  sendNotificationMail,
  updateOrderInfoStatus,
} from '@/services/yeguo-api/orderInfoController';
import { ProCard } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { Button, Col, Row, message } from 'antd';
import { useLayoutEffect, useState } from 'react';

export default () => {
  // 从订单列表和商城跳转带过来变量
  const { orderId, userId, commodityContent, money, payType, expireTime } =
    (useLocation().state as API.PayState) || {};

  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>();
  const navigate = useNavigate();

  // button 加载状态
  const [isLoading, setIsLoading] = useState({
    btn1: false,
    btn2: false,
  });

  const setLoading = (btnKey: string, isLoading: boolean) => {
    setIsLoading((prevState) => ({
      ...prevState,
      [btnKey]: isLoading,
    }));
  };

  const handleCancel = async (btn: string) => {
    setLoading(btn, true);
    const result = await updateOrderInfoStatus(orderId, 1);
    setLoading(btn, false);
    if (!result.data) {
      message.error(result.message);
      navigate('/orderinfo');
      return;
    }
    message.success(result.message);
    navigate('/orderinfo');
  };

  // 点击成功支付按钮，发送邮件给管理员，审核
  const handlePay = async (btn: string) => {
    setLoading(btn, true);
    const result = await sendNotificationMail({
      orderId,
      userId,
      commodityContent,
      money,
      payType,
      expireTime,
    });

    // 修改订单状态
    const payStatusR = await updateOrderInfoStatus(orderId, 2);
    setLoading(btn, false);
    if (!result.data || !payStatusR.data) {
      message.error(result.message);
      return;
    }
    message.success(result.message);
    navigate('/orderinfo');
  };

  useLayoutEffect(() => {
    // 从浏览器地址输入路径不会传递数据，设置为过期无效
    if (!orderId && !userId && !commodityContent && !money && !payType && !expireTime) {
      setIsExpired(true);
      return;
    }

    getUserOrderInfos(userId, { orderId }).then((res) => {
      const data: API.OrderInfoVO[] = res.data;
      if (data[0].payStatus !== 0) {
        setIsExpired(true);
      }
    });

    // 过期后订单页面因未刷新未更新订单状态，付款后判断是否过期更改订单状态
    const expireT = new Date(expireTime).getTime();
    const now = new Date().getTime();
    if (expireT - now <= 0) {
      updateOrderInfoStatus(orderId, 1).then(() => setIsExpired(true));
      return;
    }

    // 倒计时定时器
    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const timeLeft = expireT - now;

      if (timeLeft > 0) {
        setCountdown(Math.ceil(timeLeft / 1000));
      } else {
        clearInterval(interval);
        await updateOrderInfoStatus(orderId, 1);
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
              {payType === 0 ? (
                <img
                  src={`/assets/payqr/vx_${money}.png`}
                  alt="支付二维码"
                  style={{ width: '20rem' }}
                />
              ) : (
                <img
                  src={`/assets/payqr/alipay_${money}.png`}
                  alt="支付二维码"
                  style={{ width: '20rem' }}
                />
              )}
              <div style={{ fontSize: '1rem' }}>
                <p>
                  请使用<span style={{ color: '#d23918' }}>微信/支付宝</span>
                  扫描二维码进行支付，支付成功后请点击
                  <span style={{ fontSize: '1.5rem', color: '#d23918' }}>“我已经支付”</span>按钮
                </p>
                <p style={{ fontSize: '1.5rem', color: '#d23918' }}>务必备注好订单号！</p>
                <p>
                  该订单<span style={{ color: '#d23918' }}>{countdown}</span>秒后失效，请尽快支付
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Button
                type="primary"
                loading={isLoading.btn1}
                onClick={() => {
                  handlePay('btn1');
                }}
              >
                我已经支付
              </Button>
              <Button
                type="primary"
                loading={isLoading.btn2}
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
            该订单不存在或已结束！
          </div>
        )}
      </ProCard>
    </Container>
  );
};
