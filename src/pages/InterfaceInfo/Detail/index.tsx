import { onlineInvoking, onlineInvokingGet } from '@/services/yeguo-api/interfaceInfoController';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, TableProps } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DebugRequest from '../components/DebugRequest';
import MyTabs from '../components/MyTabs';
import { default as ListInfo, default as ParamList } from '../components/ParamList';
import RequestParamsList from '../components/RequestParamsList';
import TipUtil from '../components/TipUtil';
import codeList, { Code } from './codeList';
import { Params } from './requestParam';
import bug from '/public/assets/bug.svg';
import code from '/public/assets/code.svg';
import doc from '/public/assets/document.svg';
import errorcode from '/public/assets/errorcode.svg';

const style: React.CSSProperties = { padding: '8px 2px' };

export default () => {
  const [invokingResult, setInvokingResult] = useState(null);
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
  const { data, setData } = useModel('dataModel');

  const codeCol: TableProps<Code>['columns'] = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  const paramsDoc: TableProps<Params>['columns'] = [
    {
      title: '参数名称',
      dataIndex: 'param',
      key: 'param',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '必选',
      dataIndex: 'required',
      key: 'required',
    },
    {
      title: '描述',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  // 请求参数，转换为obj[]
  const rpStr = requestParams;
  let objArray;
  try {
    objArray = JSON.parse(rpStr);
  } catch (e) {
    console.error('Parsing error:', e);
  }

  const Invoking = async () => {
    console.log(JSON.stringify(data));
    console.log({...data});
    
    // const result = await onlineInvokingGet({...data});
    // alert(result.data)
    // setInvokingResult(result.data);
  };
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
            <div style={style}>
              请求方式：
              {
                <span
                  style={{
                    display: 'inline-block',
                    width: 25,
                    backgroundColor: '#b7d332',
                    borderRadius: 5,
                  }}
                >
                  {method}
                </span>
              }
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>调用总次数：{invokingCount}</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>接口状态：{interfaceStatus === 0 ? '正常' : '关闭'}</div>
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
          <TipUtil text="请求参数说明" />
          {/* @ts-ignore */}
          <ParamList columns={paramsDoc} data={objArray} />
          <TipUtil text="响应参数对照" />
          <TipUtil text="返回示例" />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="在线调试" icon={<img src={bug} height={20}></img>}>
          <DebugRequest method={method} url={url} invoking={Invoking} />
          <TipUtil text="请求参数设置：" />
          {/* todo 自己封装个请求参数列表比较好 */}
          <RequestParamsList />
          <TipUtil text="返回结果：" />
          <div>{invokingResult}</div>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="错误码参照" icon={<img src={errorcode} height={20}></img>}>
          <TipUtil text="错误码参照" />
          {/* @ts-ignore */}
          <ListInfo columns={codeCol} data={codeList} />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="示例代码" icon={<img src={code} height={20}></img>}>
          <MyTabs />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  );
};
