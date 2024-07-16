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
      ></ProCard>
      <ProCard
        title={<strong>支付方式</strong>}
        bordered
        headerBordered
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={<></>}
      ></ProCard>
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
