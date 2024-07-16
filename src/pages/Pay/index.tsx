import Container from '@/components/Container';
import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <Container>
      <ProCard
        title={<strong>商品信息</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={<></>}
      >
        <p>订单号</p>
        <p>商品内容</p>
        <p>支付金额</p>
      </ProCard>
      <ProCard
        title={<strong>支付方式</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={<></>}
      >
        <p>微信支付</p>
      </ProCard>
      <ProCard
        title={<strong>支付二维码</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={<></>}
      ></ProCard>
    </Container>
  );
};
