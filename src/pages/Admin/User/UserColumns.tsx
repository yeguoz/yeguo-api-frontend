import { userDelete } from '@/services/yeguo-api/userController';
import { ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

const UserColumns: ProColumns<API.UserVO>[] = [
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
    valueType: 'dateTime',
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

export default UserColumns;
