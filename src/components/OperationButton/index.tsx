import React from 'react';
import styles from './index.css'; // 导入 CSS 文件

interface LoadingLinkProps {
  children?: React.ReactNode; // 支持文本和其他 React 元素
  onClick?: () => void; // 点击事件处理函数
  style?: React.CSSProperties; // 自定义样式
}

export default ({ children, onClick, style }: LoadingLinkProps) => {
  return (
    <a onClick={onClick} className={styles.loadingLink} style={style}>
      {children}
    </a>
  );
};
