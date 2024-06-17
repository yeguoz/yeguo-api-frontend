import styles from './index.css';

export default ({ name, description, iconUrl, invokingCount, onClick }: any) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.invokingCount}>{invokingCount}</div>
      <img src={iconUrl} alt="" className={styles.icon} />
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.description}>{description}</h4>
    </div>
  );
};
