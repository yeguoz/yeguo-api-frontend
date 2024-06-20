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
