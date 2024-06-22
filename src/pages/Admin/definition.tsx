import { interfaceInfoDelete } from '@/services/yeguo-api/interfaceInfoController';
import { ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

export const interfaceInfoColumns: ProColumns<API.InterfaceInfoVO>[] = [
  {
    title: 'id',
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
    ellipsis: true,
  },
  {
    title: '接口名',
    dataIndex: 'name',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '接口头像',
    dataIndex: 'avatarUrl',
    valueType: 'image',
    copyable: true,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '接口详细',
    dataIndex: 'description',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    valueType: 'text',
    copyable: false,
    ellipsis: true,
  },
  {
    title: '请求地址',
    dataIndex: 'url',
    valueType: 'text',
    copyable: false,
    ellipsis: true,
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应参数',
    dataIndex: 'responseParams',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应格式',
    dataIndex: 'responseFormat',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '请求示例',
    dataIndex: 'requestExample',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '响应示例',
    dataIndex: 'responseExample',
    valueType: 'text',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '接口状态',
    dataIndex: 'interfaceStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Error',
      },
      1: {
        text: '开启',
        status: 'Success',
      },
    },
    ellipsis: true,
    editable: false,
    hideInTable: true,
    hideInSearch: true,
  },
  {
    title: '总调用次数',
    dataIndex: 'invokingCount',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '果币/次',
    dataIndex: 'requiredGoldCoins',
    valueType: 'text',
    ellipsis: true,
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
    valueType: 'date',
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
          message.success('删除成功,请手动刷新数据');
        }}
      >
        删除
      </a>,
    ],
  },
];

export const UserColumns: ProColumns<API.UserVO>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    ellipsis: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    valueType: 'image',
    // render: (_, record) => (
    //   <div>
    //     <Image src={record.avatarUrl} height={50} />
    //   </div>
    // ),
    copyable: true,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '女',
        status: 'Processing',
      },
      1: {
        text: '男',
        status: 'Processing',
      },
    },
    ellipsis: true,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '果币',
    dataIndex: 'goldCoin',
    ellipsis: true,
  },
  {
    title: '访问key',
    dataIndex: 'accessKey',
    copyable: true,
    editable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '密钥key',
    dataIndex: 'secretKey',
    valueType: 'password',
    copyable: true,
    editable: false,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Processing',
      },
      1: {
        text: '封禁',
        status: 'Warning',
      },
    },
    ellipsis: true,
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Processing',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    hideInSearch: true,
    ellipsis: true,
  },

  {
    title: '操作',
    valueType: 'option',
    // action 根据request才能触发
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
          const result = await userDelete(record.id);
          // 1成功
          const data = result.data;
          if (data < 1) {
            message.error('删除失败');
            return;
          }
          message.success('删除成功,请手动刷新数据');
        }}
      >
        删除
      </a>,
    ],
  },
];
