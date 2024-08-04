import Container from '@/components/Container';
import generateSignature from '@/pages/utils/generateSignatureUtil';
import { onlineInvoking } from '@/services/yeguo-api/interfaceInfoController';
import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, message } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import DebugRequest from '../components/DebugRequest';
import { default as ListInfo, default as ParamList } from '../components/ParamList';
import RequestParamsList from '../components/RequestParamsList';
import TipUtil from '../components/TipUtil';
import UploadFile from '../components/UploadFile';
import { codeCol, codeList, requestParamsCol, responseParamsCol } from './definition';
import bug from '/public/assets/bug.svg';
import code from '/public/assets/code.svg';
import doc from '/public/assets/document.svg';
import errorcode from '/public/assets/errorcode.svg';

const style: React.CSSProperties = { padding: '8px 4px' };
const JSONStrToObjArr = (paramsStr: string) => {
  let ObjArray;
  try {
    ObjArray = JSON.parse(paramsStr);
    return ObjArray;
  } catch (e) {
    console.error('Parsing error:', e);
    // message.error('解析错误:' + e);
  }
};

export default () => {
  const { initialState } = useModel('@@initialState');
  const [invokingResult, setInvokingResult] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSvgOrJpg, setIsSvgOrJpg] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { data } = useModel('dataModel');
  const {
    id,
    userId,
    name,
    description,
    method,
    url,
    requestParams,
    responseFormat,
    requestExample,
    responseExample,
    interfaceStatus,
    invokingCount,
    avatarUrl,
    requiredGoldCoins,
    responseParams,
    requestHeader,
    responseHeader,
    createTime,
  } = (useLocation().state as API.InterfaceInfoVO) || {};

  // 生成签名
  const currentUser = initialState?.currentUser;
  const signature = generateSignature(currentUser?.accessKey, currentUser?.secretKey);
  const ak = currentUser?.accessKey;
  // 请求参数+响应参数，转换为obj[]
  const reqObjArr = JSONStrToObjArr(requestParams || '');
  const respObjArr = JSONStrToObjArr(responseParams || '');

  // 在线调用处理函数
  const Invoking = async () => {
    // 防止出现 map_row_parentKey: undefined,
    const transformedData = JSON.parse(JSON.stringify(data));
    console.log(transformedData);
    console.log({ irp: transformedData, method, url });
    setIsLoading(true);
    if (file) {
      const result = await onlineInvoking(
        { irp: transformedData, method, url },
        ak!,
        signature,
        file,
      );
      // result.data包含status=400,未正确设置参数
      if (result.data && result.data.indexOf('status=400') !== -1) {
        setIsLoading(false);
        setInvokingResult(null);
        message.error('请正确设置请求参数！' + 'status=400');
        return;
      }
      console.log(result);
      setIsLoading(false);
      setInvokingResult(result.data);
    } else if (!file) {
      const result = await onlineInvoking({ irp: transformedData, method, url }, ak!, signature);

      // result.data包含status=400,未正确设置参数
      if (result.data && result.data.indexOf('status=400') !== -1) {
        setIsLoading(false);
        setInvokingResult(null);
        message.error('请正确设置请求参数！' + 'status=400');
        return;
      }
      console.log(result);
      // 如果返回的是svg，则将svg转换为dataUri
      const svgPattern = /<svg[^>]*>[\s\S]*?<\/svg>/i;
      if (svgPattern.test(result.data)) {
        const encodedSvg = btoa(result.data);
        const dataUri = `data:image/svg+xml;base64,${encodedSvg}`;
        setIsSvgOrJpg(true);
        setInvokingResult(dataUri);
        setIsLoading(false);
        return;
      }
      // 普通JSON数据返回
      setIsLoading(false);
      setInvokingResult(result.data);
    }
  };

  return (
    <Container>
      <ProCard title={<strong>{name}</strong>} bordered headerBordered gutter={16}>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>接口id：</strong>
              {id}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>接口地址：</strong>
              {url}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>返回格式：</strong>
              {responseFormat}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>消费果币：</strong>
              {requiredGoldCoins}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>请求方式</strong>：
              {
                <span
                  style={{
                    display: 'inline-block',
                    width: '2.2rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(201, 211, 46, 0.3)',
                    border: '0.03125rem solid skyblue',
                    borderRadius: '0.5rem',
                  }}
                >
                  {method}
                </span>
              }
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>调用总次数：</strong>
              {invokingCount}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>接口状态：</strong>
              {interfaceStatus === 0 ? (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2.2rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(201, 211, 46, 0.3)',
                    border: '0.03125rem solid skyblue',
                    borderRadius: '0.5rem',
                  }}
                >
                  正常
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2.2rem',
                    textAlign: 'center',
                    backgroundColor: '#d83b01',
                    borderRadius: '0.5rem',
                  }}
                >
                  关闭
                </span>
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={style}>
              <strong>接口描述：</strong>
              {description}
            </div>
          </Col>
          <Col className="gutter-row" span={100}>
            <div style={style}>
              <strong>请求示例：</strong>
              {requestExample}
            </div>
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
          <ParamList columns={requestParamsCol} data={reqObjArr} />
          <TipUtil text="响应参数对照" />
          {/* @ts-ignore */}
          <ParamList columns={responseParamsCol} data={respObjArr} />
          <TipUtil text="返回示例" />
          <CodeBlock language="json" value={responseExample} />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="在线调试" icon={<img src={bug} height={20}></img>}>
          <DebugRequest
            method={method || ''}
            url={url || ''}
            invoking={Invoking}
            isLoading={isLoading}
          />
          <TipUtil text="请求参数设置：" />
          <RequestParamsList />
          <TipUtil text="上传文件：" />
          <UploadFile
            getFile={(file: File) => {
              setFile(file);
            }}
          />
          <TipUtil text="返回结果：" />
          {isSvgOrJpg ? (
            <img src={invokingResult!} style={{ height: '12rem' }}></img>
          ) : (
            <CodeBlock language="json" value={invokingResult} />
          )}
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="错误码参照" icon={<img src={errorcode} height={20}></img>}>
          <TipUtil text="错误码参照" />
          {/* @ts-ignore */}
          <ListInfo columns={codeCol} data={codeList} />
        </ProCard.TabPane>
        <ProCard.TabPane key="tab4" tab="示例代码" icon={<img src={code} height={20}></img>}>
          <a href="https://apidocs.yeguo.icu" target="_blank" rel="noreferrer">
            使用在线文档
          </a>
        </ProCard.TabPane>
      </ProCard>
    </Container>
  );
};
