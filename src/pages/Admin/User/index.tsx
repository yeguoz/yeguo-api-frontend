import { userDelete, userQuery, userUpdate } from '@/services/yeguo-api/userController';
import { ActionType, ProColumns, ProTable, WaterMark } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';

const columns: ProColumns<API.UserVO>[] = [
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

export default () => {
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);
  const [paramsState, setParamsState] = useState({});


  const userQueryList = async (params: API.UserQueryParams) => {
    setParamsState(params);
    const result = await userQuery(params);
    if (!result.data) {
      message.warning('查询数据为空');
      return;
    }
    setTableData(result.data);
    message.success('查询数据成功');
  };

  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    userQueryList({}); 
  }, []);

  return (
    <WaterMark
      content={
        initialState?.currentUser?.username
          ? initialState?.currentUser?.username
          : initialState?.currentUser?.userAccount
      }
    >
      <ProTable<API.UserVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        dataSource={tableData}
        // 请求失败时触发
        onRequestError={(error) => {
          message.error(error.message);
        }}
        // 重置时触发
        onReset={async () => {
          // @ts-ignore
          const result = await userQuery({});
          if (!result.data) {
            message.warning('查询数据为空');
            return;
          }
          setTableData(result.data);
          message.success('查询所有用户成功');
        }}
        // // 提交时触发
        onSubmit={(params) => userQueryList(params)}
        toolbar={{
          title: '用户列表',
          tooltip: '提供用户信息',
        }}
        // 编辑配置
        editable={{
          type: 'multiple',
          //  修改后刷新展示数据
          onSave: async (_, row) => {
            // @ts-ignore
            const result = await userUpdate(row);
            if (result.data === null) {
              message.error(result.description);
              return;
            }
            userQueryList(paramsState);
            message.success('修改成功');
          },
          // 保留保存和取消
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        // search配置
        search={{
          labelWidth: 'auto',
          showHiddenNum: true,
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values: any, type: any) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
      />
    </WaterMark>
  );
};
