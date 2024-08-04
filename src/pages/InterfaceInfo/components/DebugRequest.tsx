import Search from 'antd/es/input/Search';

export default function DebugRequest({
  method,
  invoking,
  url,
  isLoading,
}: {
  method: string;
  invoking: any;
  url: string;
  isLoading: boolean;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Search
        size={'large'}
        addonBefore={method}
        style={{ width: '70%' }}
        enterButton="发送请求"
        onSearch={invoking}
        value={url}
        loading={isLoading}
      />
    </div>
  );
}
