import { CreateOrderInfo } from '@/services/yeguo-api/orderInfoController';
import { ProCard } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Button, Col, Row, Tooltip, message } from 'antd';
import { useRef, useState } from 'react';
import CoinMallCard from './components/CoinMallCard';
import PayButton from './components/PayButton';

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
  const [commodityContent, setCommodityContent] = useState<string>(''); // 商品内容
  const [money, setMoney] = useState<number>(0); // 支付金额
  const [payType, setPayType] = useState<number>(1); // 0微信 1支付宝
  const [isLoading, setIsLoading] = useState<boolean>(false); // 加载状态

  const navigate = useNavigate();

  const handleCardClick = (index: number, ref: any, goldCoin: number, commodityContent: string) => {
    setCommodityContent(commodityContent);
    // 选中高亮
    setSelectedCard(index);
    selectedCardPriceRef.current = ref.current;
    if (selectedCardPriceRef.current) {
      const priceStr = selectedCardPriceRef.current.textContent;
      const moneyNum = parseFloat(priceStr!);
      setMoney(moneyNum);
    }
  };

  const handleBuy = async () => {
    if (money <= 0) {
      message.error('请选择购买商品');
      return;
    }
    setIsLoading(true);
    // 创建订单
    const result = await CreateOrderInfo({
      userId: initialState?.currentUser?.id as number,
      payType,
      money,
      commodityContent,
    });
    // 返回OrderInfoVO对象
    const orderInfoVO: API.OrderInfoVO = result.data;
    if (!orderInfoVO) {
      setIsLoading(false);
      message.error('生成订单失败==' + result.message);
      return;
    }
    setIsLoading(true);
    message.success(result.message);
    // 跳转到支付页面
    window.location.href = `https://pay.tianmuzf.top/Submit/Mcode_Pay.php?trade_no=${orderInfoVO.orderId}`;
  };

  const handleClick = (mode: number) => {
    setPayType(mode);
  };
  return (
    <>
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
                onClick={(cardPriceRef, goldCoin, commodityContent) =>
                  handleCardClick(index, cardPriceRef, goldCoin, commodityContent)
                }
              />
            </Col>
          ))}
        </Row>
        <p style={{ textAlign: 'center', padding: '1rem 0 0' }}>
          本商品为虚拟内容，用于平台接口调用，购买后不支持
          <span style={{ color: '#d23918' }}>退换</span>
          ，如付款成功后10分钟后未到账，请联系站长微信：
          <Tooltip title={<img src="/assets/vx.png" width={100} />}>a1419593965</Tooltip>。
        </p>
      </ProCard>
      <ProCard
        title={<strong>支付方式</strong>}
        bordered
        headerBordered
        gutter={5}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        style={{ marginTop: '1rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {/* <PayButton
            text="微信支付"
            img="/assets/vxpay.png"
            isSelected={payType === 0}
            handelClick={() => {
              handleClick(0);
            }}
          /> */}
          <PayButton
            text="支付宝支付"
            img="/assets/alipay.png"
            isSelected={payType === 1}
            handelClick={() => {
              handleClick(1);
            }}
          />
        </div>
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
            ￥<span>{money}</span>
          </span>
          <Button type="primary" loading={isLoading} onClick={handleBuy}>
            确认购买
          </Button>
        </div>
      </ProCard>
    </>
  );
};
