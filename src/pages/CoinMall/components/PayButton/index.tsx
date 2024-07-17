import styles from './index.css';

export default ({
  text,
  img,
  isSelected,
  handelClick,
}: {
  text: string;
  img: string;
  isSelected: boolean;
  handelClick: () => void;
}) => {
  return (
    <div
      className={isSelected ? `${styles.btn} ${styles.active}` : `${styles.btn}`}
      onClick={() => {
        handelClick();
      }}
    >
      <div className={styles.content}>
        <div className={styles.circle}></div>
        <img src={img} className={styles.img} />
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};
