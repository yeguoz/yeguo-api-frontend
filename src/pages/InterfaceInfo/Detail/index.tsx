import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import doc from '/public/assets/document.svg';
import bug from '/public/assets/bug.svg';
import errorcode from '/public/assets/errorcode.svg';
import code from '/public/assets/code.svg';

const style: React.CSSProperties = { padding: '8px 2px' };

export default function index() {
  const {
    state: {
      id,
      userId,
      name,
      description,
      method,
      url,
      requestParams,
      requestHeader,
      responseHeader,
      responseFormat,
      requestExample,
      interfaceStatus,
      invokingCount,
      avatarUrl,
      requiredGoldCoins,
      createTime,
    },
  } = useLocation();

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <ProCard title={name} bordered headerBordered gutter={16}>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div style={style}>接口地址：{url}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>返回格式：{responseFormat}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>消费果币：{requiredGoldCoins}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>请求方式：{method}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>调用总次数：{invokingCount}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>接口状态：{interfaceStatus}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>接口描述：{description}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>请求示例：{requestExample}</div>
          </Col>
        </Row>
      </ProCard>

      <ProCard
        tabs={{
          type: 'card',
        }}
        style={{ marginTop: '20px' }}
      >
        <ProCard.TabPane key="tab1" tab="API文档" icon={<img src={doc} height={20}></img>}>
          API文档
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="在线调试" icon={<img src={bug} height={20}></img>}>
          在线调试
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="错误码参照" icon={<img src={errorcode} height={20}></img>}>
         错误码参照
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="示例代码" icon={<img src={code} height={20}></img>}>
         示例代码
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  );
}
