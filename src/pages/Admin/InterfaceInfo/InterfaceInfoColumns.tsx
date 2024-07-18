import { interfaceInfoDelete } from '@/services/yeguo-api/interfaceInfoController';
import { ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

const InterfaceInfoColumns: ProColumns<API.InterfaceInfoVO>[] = [
  {
    title: 'id',
    width: 30,
    dataIndex: 'id',
    valueType: 'text',
    editable: false,
    ellipsis: true,
  },
  {
    title: '发布人id',
    dataIndex: 'userId',
    valueType: 'text',
    editable: false,
  },
  {
    title: '接口名',
    width: 80,
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '接口头像',
    width: 80,
    dataIndex: 'avatarUrl',
    valueType: 'image',
    copyable: true,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '接口详细',
    width: 80,
    dataIndex: 'description',
    valueType: 'text',
  },
  {
    title: '请求方法',
    width: 70,
    dataIndex: 'method',
    valueType: 'text',
    copyable: false,
    ellipsis: true,
  },
  {
    title: '请求地址',
    width: 80,
    dataIndex: 'url',
    valueType: 'text',
    copyable: false,
  },
  {
    title: '请求参数',
    width: 80,
    dataIndex: 'requestParams',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应参数',
    width: 80,
    dataIndex: 'responseParams',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应格式',
    width: 80,
    dataIndex: 'responseFormat',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '请求示例',
    width: 80,
    dataIndex: 'requestExample',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应示例',
    width: 80,
    dataIndex: 'responseExample',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '总调用次数',
    width: 50,
    dataIndex: 'invokingCount',
    valueType: 'text',
  },
  {
    title: '果币/次',
    width: 30,
    dataIndex: 'requiredGoldCoins',
    valueType: 'text',
  },
  {
    title: '接口状态',
    dataIndex: 'interfaceStatus',
    copyable: false,
    valueEnum: {
      0: { text: '正常', status: 'Success' },
      1: { text: '关闭', status: 'Error' },
    },
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    valueType: 'jsonCode',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
    hideInForm: true,
  },
  {
    title: '响应头',
    dataIndex: 'responseHeader',
    valueType: 'jsonCode',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    editable: false,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // @ts-ignore
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      // todo 删除后刷新展示数据
      <a
        key="delete"
        onClick={async () => {
          // @ts-ignore
          const result = await interfaceInfoDelete(record.id);
          // 1成功 -1失败
          const data = result.data;

          if (data < 1) {
            message.error('删除失败');
            return;
          }
          message.success('删除成功');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
      >
        删除
      </a>,
    ],
  },
];

export default InterfaceInfoColumns;
