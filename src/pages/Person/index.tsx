import Container from '@/components/Container';
import { userPersonInfoUpdate, userPersonKeysUpdate } from '@/services/yeguo-api/userController';
import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, Row, message } from 'antd';
import { useState } from 'react';
import InfoItem from './components/InfoItem';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [modified, setModified] = useState(false);
  const [values, setValues] = useState<{ [key: string]: any }>({
    username: currentUser?.username,
    email: currentUser?.email,
    phone: currentUser?.phone,
    accessKey: currentUser?.accessKey,
    secretKey: currentUser?.secretKey,
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [imageList] = useState([
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/2.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ]);

  const handleValueChange = (uniqueKey: string, newValue: string) => {
    // 处理值变化
    setModified(true);
    setValues((prevValues) => ({ ...prevValues, [uniqueKey]: newValue }));
  };

  const updateInfo = async () => {
    if (!modified) {
      message.info('没有修改任何信息');
      return;
    }
    const userUpdateParams: API.UserPersonUpdateParams = {
      id: currentUser?.id,
      username: values.username,
      email: values.email,
      phone: values.phone,
    };
    const result = await userPersonInfoUpdate(userUpdateParams);
    if (!result.data) {
      message.error(`更新信息失败:${result.description}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1000毫秒后重新加载页面
      return;
    }
    message.success('更新信息成功');
    setModified(false);
  };

  const updateKeys = async () => {
    const result = await userPersonKeysUpdate(currentUser?.id as number);
    if (!result.data) {
      message.error(`更新密钥失败:${result.description}`);
      return;
    }
    setValues((prevValues) => ({
      ...prevValues,
      accessKey: result.data.accessKey,
      secretKey: result.data.secretKey,
    }));
    message.success('更新密钥成功');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleImageClick = (url: string) => {
    setImageUrl(url);
    setShowImageSelector(false);
  };

  return (
    <Container>
      <ProCard
        title={<strong>个人信息</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={
          <Button type="primary" onClick={updateInfo}>
            更新信息
          </Button>
        }
      >
        {showImageSelector ? (
          <div>
            <h3>选择图片</h3>
            <Row gutter={[16, 24]}>
              {imageList.map((url) => (
                <Col key={url} span={8}>
                  <img
                    src={url}
                    alt="选择的图片"
                    style={{ width: '2rem', cursor: 'pointer' }}
                    onClick={() => handleImageClick(url)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div onClick={() => setShowImageSelector(true)} style={{ cursor: 'pointer' }}>
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '2rem' }} />
            ) : (
              <div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center' }}>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </div>
        )}
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'昵称'}
              value={values['username']}
              type="editor"
              uniqueKey={'username'}
              onValueChange={handleValueChange}
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'账号'} value={currentUser?.userAccount} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'邮箱'}
              value={values['email']}
              type={'editor'}
              uniqueKey={'email'}
              onValueChange={handleValueChange}
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'性别'}
              value={currentUser?.gender ? (currentUser?.gender === 1 ? '男' : '女') : '未设置'}
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'手机'}
              value={values['phone']}
              type={'editor'}
              uniqueKey={'phone'}
              onValueChange={handleValueChange}
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'金币'} value={currentUser?.goldCoin} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem
              name={'用户类型'}
              value={currentUser?.userRole === 1 ? '管理员' : '普通用户'}
              type={'copy'}
            />
          </Col>
        </Row>
      </ProCard>
      <ProCard
        title={<strong>开发者API密钥</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={
          <Button type="primary" onClick={updateKeys}>
            更新密钥
          </Button>
        }
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'accessKey'} value={values['accessKey']} type={'copy'} />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'secretKey'} value={values['secretKey']} type={'copy'} />
          </Col>
        </Row>
      </ProCard>
    </Container>
  );
};
