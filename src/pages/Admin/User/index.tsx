import OperationButton from '@/components/OperationButton';
import { userDelete, userDynamicQuery, userUpdate } from '@/services/yeguo-api/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [tableData, setTableData] = useState([]);
  const [paramsState, setParamsState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        <OperationButton
          key="editable"
          onClick={() => {
            // @ts-ignore
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </OperationButton>,
        <OperationButton
          key="delete"
          onClick={async () => {
            setIsLoading(true);
            // @ts-ignore
            const result = await userDelete(record.id);
            setIsLoading(false);

            // 1成功
            if (result.data < 1) {
              message.error('删除失败');
              return;
            }
            message.success('删除成功');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
          style={{ color: '#ea5514' }}
        >
          删除
        </OperationButton>,
      ],
    },
  ];

  const dynamicQueryUsers = async (params: API.UserQueryParams) => {
    setParamsState(params);
    setIsLoading(true);
    const result = await userDynamicQuery(params);
    setIsLoading(false);

    if (!result.data) {
      message.warning(result.message);
      return;
    }
    setTableData(result.data);
    message.success(result.message);
  };

  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    dynamicQueryUsers({});
  }, []);

  return (
    <ProTable<API.UserVO>
      columns={UserColumns}
      scroll={{ x: 'max-content' }}
      cardBordered
      dataSource={tableData}
      options={{ reload: false }}
      // 请求失败时触发
      onRequestError={(error) => {
        message.error(error.message);
      }}
      loading={isLoading}
      // 重置时触发
      onReset={async () => {
        setIsLoading(true);
        // @ts-ignore
        const result = await userDynamicQuery({});
        setIsLoading(false);

        if (!result.data) {
          message.warning('查询数据为空');
          return;
        }
        setTableData(result.data);
        message.success('查询成功');
      }}
      // 提交时触发
      onSubmit={(params) => dynamicQueryUsers(params)}
      toolbar={{
        title: '用户列表',
        tooltip: '提供用户信息',
      }}
      // 编辑配置
      editable={{
        type: 'multiple',
        //  修改后刷新展示数据
        onSave: async (_, row) => {
          setIsLoading(true);
          const result = await userUpdate(row);
          setIsLoading(false);

          if (result.data === null) {
            message.error(result.description);
            return;
          }
          dynamicQueryUsers(paramsState);
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
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
