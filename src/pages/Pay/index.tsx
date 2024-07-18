import Container from '@/components/Container';
import { cancelOrderInfo } from '@/services/yeguo-api/orderInfoController';
import { ProCard } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { Button, Col, Row, message } from 'antd';

export default () => {
  const { userId, commodityContent, money, orderInfoId, payType } =
    (useLocation().state as API.PayState) || {};
  // const [countdown, setCountdown] = useState(300); // 初始化为5分钟，即300秒
  // useEffect(() => {
  //   // 设置倒计时
  //   const timer = setInterval(() => {
  //     if (countdown <= 0) {
  //       // 倒计时结束，可以清除定时器或者执行其他逻辑
  //       clearInterval(timer);
  //       // 可以在这里添加倒计时结束后的操作，比如隐藏二维码等
  //       console.log('倒计时结束');
  //       return;
  //     }
  //     setCountdown(countdown - 1 );
  //   }, 1000);

  // }, [countdown]);
  const navigate = useNavigate();
  const handleCancel = async () => {
    const result = await cancelOrderInfo(orderInfoId);
    if (!result.data) {
      message.error(result.message);
      navigate(-1);
      return;
    }
    if (result.data === 2) {
      message.info('订单已失效');
      navigate(-1);
      return;
    }
    message.success(result.message);
    navigate(-1);
  };

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
            <strong>用户Id：</strong>
            {userId}
          </Col>
          <Col className="gutter-row" span={10}>
            <strong>订单号：</strong>
            {orderInfoId}
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
            {payType === 0 ? (
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
            )}
          </Col>
        </Row>
      </ProCard>
      <ProCard
        title={<strong>支付二维码</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <div>{300}</div>
        <Button type="primary">我已经支付</Button>
        <Button
          type="primary"
          onClick={() => {
            handleCancel();
          }}
        >
          取消支付
        </Button>
      </ProCard>
    </Container>
  );
};
