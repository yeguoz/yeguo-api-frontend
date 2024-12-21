import { TableProps } from 'antd';

interface Code {
  code?: number;
  message?: string;
}

interface Params {
  param?: string;
  type?: string;
  message?: string;
}

export const signatureStrExample = `GET
/api/app/weibo/hot
X-Access-Key:290F6AA4F0BFE8F584DE60D25E56706F
X-Expiry-Timestamp:1734707922252
X-Nonce:414f345k4g4l3o1s1k4z4f35z4jv6f`;

export const codeExample = `const generateSignature = (message: string, secretKey: string) => {
  // 拼接签名串，使用secretKey进行签名
  // HMAC-SHA256 算法签名
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return hash.toString(CryptoJS.enc.Hex);
};`;
export const requestHeadersExample = `"X-Access-Key":"个人主页获取",
"X-Expiry-Timestamp":"",
"X-Nonce":"",
"X-Signature":""
`;

export const codeList: Code[] = [
  {
    code: 200,
    message: '成功',
  },
  {
    code: 400,
    message: '请求参数错误',
  },
  {
    code: 500,
    message: '服务器错误',
  },
];

export const codeCol: TableProps<Code>['columns'] = [
  {
    title: '状态码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '描述',
    dataIndex: 'message',
    key: 'message',
  },
];

export const requestParamsCol: TableProps<Params>['columns'] = [
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
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '描述',
    dataIndex: 'message',
    key: 'message',
  },
];

export const responseParamsCol: TableProps<Params>['columns'] = [
  {
    title: '参数名称',
    dataIndex: 'param',
    key: 'param',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '说明',
    dataIndex: 'message',
    key: 'message',
  },
];
