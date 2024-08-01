import { Tabs } from 'antd';
import CodeBlock from './CodeBlock';

export default () => {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={new Array(1).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `java`,
          key: id,
          children: <CodeBlock language="java" />,
        };
      })}
    />
  );
};
