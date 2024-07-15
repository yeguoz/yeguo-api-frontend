import styles from './index.css';
export default () => {
  return (
    <div className={styles.card}>
      {/* 上 */}
      <div className={styles.top}>
        <div className={styles.info}>
          <span>100果币</span>
          <img src="/assets/money.png" alt="" className={styles.smallIcon} />
          <span className={styles.price}>￥ 体验 0.01</span>
        </div>
        <p>增加100果币</p>
      </div>
      <div className={styles.bottom}>
        <img src="/assets/moneyC.png" alt="" className={styles.btmImg} />
      </div>
    </div>
  );
};
