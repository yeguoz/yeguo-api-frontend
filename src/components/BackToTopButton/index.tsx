import React, { useEffect, useState } from 'react';
import styles from './index.css';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 处理滚动事件
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);

    // 清理事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    });
  };

  return (
    <button
      type="button" // 明确指定按钮类型
      className={`${styles.scrollToTop} ${visible ? `${styles.visible}` : ''}`}
      onClick={scrollToTop}
      title="回到顶部"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
