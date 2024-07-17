import { useRef } from 'react';
import styles from './index.css';

const CoinMallCard = ({
  CNY,
  goldCoin,
  isSelected,
  onClick,
}: {
  CNY: number;
  goldCoin: number;
  isSelected: boolean;
  onClick: (cardPriceRef: any, goldCoin: number,commodityContent: string) => void;
}) => {
  const cardPriceRef = useRef<HTMLSpanElement>(null);
  const commodityContent = `增加${goldCoin}果币`;
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.active : ''}`}
      onClick={() => onClick(cardPriceRef,goldCoin,commodityContent)}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <span>{goldCoin}果币</span>
          <img src="/assets/money.png" alt="" className={styles.smallIcon} />
          <span className={styles.price}>
            ￥<span ref={cardPriceRef}>{CNY}</span>
          </span>
        </div>
        <p>{commodityContent}</p>
      </div>
      <div className={styles.bottom}>
        <img src="/assets/moneyC.png" alt="" className={styles.btmImg} />
      </div>
    </div>
  );
};

export default CoinMallCard;
