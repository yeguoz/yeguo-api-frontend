import Container from '@/components/Container';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, Row } from 'antd';
import { useRef, useState } from 'react';
import CoinMallCard from './components/CoinMallCard';

export default () => {
  const { initialState } = useModel('@@initialState');
  const data = [
    { CNY: 0.09, goldCoin: 100 },
    { CNY: 0.99, goldCoin: 1000 },
    { CNY: 1.99, goldCoin: 3000 },
    { CNY: 6.99, goldCoin: 9999 },
    { CNY: 9.99, goldCoin: 18999 },
    { CNY: 19.99, goldCoin: 32999 },
  ];

  const [selectedCard, setSelectedCard] = useState<number>();
  const selectedCardPriceRef = useRef<HTMLSpanElement>();
  const [payment, setPayment] = useState<number>(0);

  const handleCardClick = (index: number, ref: any) => {
    // 选中高亮
    setSelectedCard(index);
    selectedCardPriceRef.current = ref.current;
    if (selectedCardPriceRef.current) {
      const priceStr = selectedCardPriceRef.current.textContent;
      const moneyNum = parseFloat(priceStr!);
      setPayment(moneyNum);
    }
  };

  const handleBuy = () => {
    if (payment <= 0) return;
    // todo 发起订单，跳转支付页面（我已经支付（跳转支付成功页面），取消支付（跳转到订单列表））
    // 后端需要生成订单，成功后跳转支付页面
    console.log('购买');
  };
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
          {data.map((item, index) => (
            <Col
              key={index}
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
              <CoinMallCard
                CNY={item.CNY}
                goldCoin={item.goldCoin}
                isSelected={selectedCard === index}
                onClick={(cardPriceRef) => handleCardClick(index, cardPriceRef)}
              />
            </Col>
          ))}
        </Row>
        <p style={{ textAlign: 'center', padding: '1rem 0 0' }}>
          本商品为虚拟内容，用于平台接口调用，购买后不支持
          <span style={{ color: '#d23918' }}>退换</span>，购买后24小时内审核完成。
        </p>
      </ProCard>
      <ProCard bordered>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>实付</span>
          <span
            style={{
              marginLeft: '0.5rem',
              marginRight: '1.5rem',
              color: '#d23918',
              fontSize: '1.5rem',
            }}
          >
            ￥<span>{payment}</span>
          </span>
          <Button type="primary" onClick={handleBuy}>
            确认购买
          </Button>
        </div>
      </ProCard>
    </Container>
  );
};
