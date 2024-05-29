import { QuestionCircleOutlined } from '@ant-design/icons';
import '@umijs/max';
export type SiderTheme = 'light' | 'dark';
// 头像旁小问号
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://yeguo.icu');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
