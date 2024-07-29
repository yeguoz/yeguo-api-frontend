import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

export default ({ getFile }: { getFile: (file: File) => void }) => {
  const handleBeforeUpload = (file: File) => {
    getFile(file);
    return false;
  };
  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }} size="large">
      <Upload beforeUpload={handleBeforeUpload} listType="picture" maxCount={1}>
        <Button icon={<UploadOutlined />} style={{ width: '67vw' }}>
          Upload
        </Button>
      </Upload>
    </Space>
  );
};
