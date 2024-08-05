import Skip from '@/components/Skip';
import { userPersonInfoUpdate, userPersonKeysUpdate } from '@/services/yeguo-api/userController';
import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, Row, message } from 'antd';
import { useState } from 'react';
import generateSignature from '../utils/generateSignatureUtil';
import InfoItem from './components/InfoItem';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [modified, setModified] = useState(false);
  // 页面信息状态
  const [values, setValues] = useState<{ [key: string]: any }>({
    username: currentUser?.username,
    email: currentUser?.email,
    phone: currentUser?.phone,
    accessKey: currentUser?.accessKey,
    secretKey: currentUser?.secretKey,
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.avatarUrl as string);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [avatarList] = useState([
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/2.jpg',
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/drem.jpg',
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/pkc1.jpg',
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/api1.jpg',
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/api2.jpg',
    'https://cdn.jsdelivr.net/gh/ye-guo/Images/images/miku0.jpg',
  ]);

  // button 加载状态
  const [isLoading, setIsLoading] = useState({
    updateInfo: false,
    updateKey: false,
    generateSignature: false,
  });

  const setLoading = (btnKey: string, isLoading: boolean) => {
    setIsLoading((prevState) => ({
      ...prevState,
      [btnKey]: isLoading,
    }));
  };

  // 修改个人信息内容后 回调设置values，点击更新信息一同更改
  const handleValueChange = (uniqueKey: string, newValue: string) => {
    // 处理InfoItem值变化，修改后才可以更新
    setModified(true);
    // 更新信息状态值
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
      avatarUrl: avatarUrl,
    };
    setLoading('updateInfo', true);
    const result = await userPersonInfoUpdate(userUpdateParams);
    setLoading('updateInfo', false);
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
    setLoading('updateKey', true);
    const result = await userPersonKeysUpdate(currentUser?.id as number);
    setLoading('updateKey', false);
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
    setAvatarUrl(url);
    setModified(true);
    setShowImageSelector(false);
  };

  const handleGenerateSignature = () => {
    setLoading('generateSignature', true);
    const sign = generateSignature(values.accessKey, values.secretKey);
    setLoading('generateSignature', false);
    message.success('签名为：' + sign);
  };

  return (
    <>
      <ProCard
        title={<strong>个人信息</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        extra={
          <Button type="primary" onClick={updateInfo} loading={isLoading.updateInfo}>
            更新信息
          </Button>
        }
      >
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={15}>
            {showImageSelector ? (
              <div>
                <h3 style={{ color: initialState?.settings?.colorPrimary }}>
                  选择您的头像
                  <span
                    style={{ color: 'skyblue', marginLeft: '1rem', cursor: 'pointer' }}
                    onClick={() => {
                      setShowImageSelector(false);
                    }}
                  >
                    返回
                  </span>
                </h3>
                <Row gutter={[16, 24]}>
                  {avatarList.map((url) => (
                    <Col
                      key={url}
                      xs={{
                        flex: '100%',
                      }}
                      sm={{
                        flex: '50%',
                      }}
                      md={{
                        flex: '40%',
                      }}
                      lg={{
                        flex: '30%',
                      }}
                      xxl={{
                        flex: '20%',
                      }}
                    >
                      <img
                        src={url}
                        alt="选择的图片"
                        style={{ width: '4rem', cursor: 'pointer' }}
                        onClick={() => handleImageClick(url)}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <div
                onClick={() => setShowImageSelector(true)}
                style={{ cursor: 'pointer', width: '5rem' }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" style={{ width: '5rem' }} />
                ) : (
                  <div
                    style={{
                      padding: '20px',
                      border: '1px dashed #ccc',
                      textAlign: 'center',
                      width: '5rem',
                      height: '5rem',
                    }}
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </div>
            )}
          </Col>

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
              name={'手机'}
              value={values['phone']}
              type={'editor'}
              uniqueKey={'phone'}
              onValueChange={handleValueChange}
            />
          </Col>
          <Col className="gutter-row" span={15}>
            <InfoItem name={'果币'} value={currentUser?.goldCoin} />
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
          <>
            <Button type="primary" onClick={updateKeys} loading={isLoading.updateKey}>
              更新密钥
            </Button>
          </>
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

      <ProCard
        title={<strong>签名生成</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        style={{ marginTop: '1rem' }}
      >
        <InfoItem
          name={'signature'}
          value={
            <a style={{ color: '#fca92f' }} onClick={handleGenerateSignature}>
              点击获取签名
            </a>
          }
        />
      </ProCard>
      <ProCard
        title={<strong>引入SDK</strong>}
        bordered
        headerBordered
        gutter={16}
        headStyle={{ backgroundColor: '#f3f2f1', borderRadius: '0.5rem' }}
        style={{ marginTop: '1rem', overflow: 'auto' }}
      >
        <InfoItem
          name={'SDK'}
          value={
            <a
              href="https://apidocs.yeguo.icu/guide/getting-started#-%E5%AE%89%E8%A3%85"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fca92f' }}
            >
              点击获取SDK <Skip />
            </a>
          }
        />
      </ProCard>
    </>
  );
};
