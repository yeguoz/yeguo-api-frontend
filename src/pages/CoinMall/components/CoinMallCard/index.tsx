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
  onClick: (cardPriceRef: any) => void;
}) => {
  const cardPriceRef = useRef<HTMLSpanElement>(null);

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.active : ''}`}
      onClick={() => onClick(cardPriceRef)}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <span>{goldCoin}果币</span>
          <img src="/assets/money.png" alt="" className={styles.smallIcon} />
          <span className={styles.price}>
            ￥<span ref={cardPriceRef}>{CNY}</span>
          </span>
        </div>
        <p>增加{goldCoin}果币</p>
      </div>
      <div className={styles.bottom}>
        <img src="/assets/moneyC.png" alt="" className={styles.btmImg} />
      </div>
    </div>
  );
};

export default CoinMallCard;
