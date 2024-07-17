import Container from '@/components/Container';
import { ProCard } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';

export default () => {
  const { userId, commodityContent, money, orderInfoId, payType } =
    (useLocation().state as API.payState) || {};
  return (
    <Container>
      <ProCard
        title={<strong>商品信息</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <p>用户Id:{userId}</p>
        <p>订单号:{orderInfoId}</p>
        <p>商品内容:{commodityContent}</p>
        <p>支付金额:{money}</p>
      </ProCard>
      <ProCard
        title={<strong>支付方式</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <p>{payType === 0 ? '微信支付' : '支付宝支付'}</p>
      </ProCard>
      <ProCard
        title={<strong>支付二维码</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      ></ProCard>
    </Container>
  );
};
