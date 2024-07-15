import Container from '@/components/Container';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row } from 'antd';
import CoinMallCard from './components/CoinMallCard';

export default () => {
  const { initialState } = useModel('@@initialState');

  return (
    <Container>
      <ProCard
        title={<strong>我的钱包</strong>}
        tooltip="调用接口使用"
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={15}>
            <strong>果币：</strong>
            <span style={{ color: '#d23918', fontSize: '1.2rem' }}>
              {initialState!.currentUser?.goldCoin}
            </span>
          </Col>
        </Row>
      </ProCard>
      <ProCard
        title={
          <>
            <strong>果币商城</strong> <img src="/assets/money.png" style={{ height: '1.5rem' }} />
          </>
        }
        bordered
        headerBordered
        gutter={5}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        style={{ marginTop: '1rem' }}
      >
        <Row gutter={[20, 24]}>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
          <Col
            xs={{
              flex: '100%',
            }}
            sm={{
              flex: '50%',
            }}
            md={{
              flex: '40%',
            }}
            lg={{
              flex: '20%',
            }}
            xl={{
              flex: '5%',
            }}
          >
            <CoinMallCard />
          </Col>
        </Row>
      </ProCard>
    </Container>
  );
};
