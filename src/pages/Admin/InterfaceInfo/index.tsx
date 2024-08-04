import OperationButton from '@/components/OperationButton';
import {
  interfaceInfoDelete,
  interfaceInfoDynamicQuery,
  interfaceInfoRegister,
  interfaceInfoUpdate,
} from '@/services/yeguo-api/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);
  const [paramsState, setParamsState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const InterfaceInfoColumns: ProColumns<API.InterfaceInfoVO>[] = [
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
    },
    {
      title: '接口名',
      dataIndex: 'name',
      valueType: 'text',
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
      title: '总调用次数',
      dataIndex: 'invokingCount',
      valueType: 'text',
    },
    {
      title: '果币/次',
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
        <OperationButton
          key="editable"
          onClick={() => {
            // @ts-ignore
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </OperationButton>,
        // todo 删除后刷新展示数据
        <OperationButton
          key="delete"
          onClick={async () => {
            setIsLoading(true);
            // @ts-ignore
            const result = await interfaceInfoDelete(record.id);
            setIsLoading(false);

            // 1成功 -1失败
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

  const interfaceInfoQueryList = async (params: API.UserQueryParams) => {
    setParamsState(params);
    setIsLoading(true);
    const result = await interfaceInfoDynamicQuery(params);
    setIsLoading(false);
    if (!result.data) {
      message.warning(result.message);
      return;
    }
    setTableData(result.data);
    message.success(result.message);
  };

  useEffect(() => {
    interfaceInfoQueryList({}); // 在组件挂载后调用一次数据查询
  }, []);

  return (
    <ProTable<API.InterfaceInfoVO>
      columns={InterfaceInfoColumns}
      scroll={{ x: 'max-content' }}
      actionRef={actionRef}
      cardBordered
      dataSource={tableData}
      // 请求失败时触发
      onRequestError={(error) => {
        message.error(error.message);
      }}
      loading={isLoading}
      // 重置时触发
      onReset={async () => {
        // @ts-ignore
        setIsLoading(true);
        const result = await interfaceInfoDynamicQuery({});
        setIsLoading(false);
        if (!result.data) {
          message.warning('查询数据为空');
          return;
        }
        setTableData(result.data);
        message.success('成功');
      }}
      // 提交时触发
      onSubmit={(params) => interfaceInfoQueryList(params)}
      toolbar={{
        title: '接口列表',
        tooltip: '提供接口信息',
      }}
      editable={{
        type: 'multiple',
        // todo 修改后刷新展示数据
        onSave: async (_, row) => {
          setIsLoading(true);
          // @ts-ignore
          const result = await interfaceInfoUpdate(row);
          setIsLoading(false);
          if (result.data === null) {
            message.error(result.description);
            return;
          }
          // 查询数据
          interfaceInfoQueryList(paramsState);
          message.success('成功');
        },
        // 保留保存和取消
        actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        showHiddenNum: true,
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
        reload: false,
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
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
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="接口信息列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={async () => {
            const obj = {
              name: '',
              description: '',
              method: '',
              url: '',
              requestParams: '',
              requestHeader: '',
              responseHeader: '',
              responseFormat: '',
              requestExample: '',
              interfaceStatus: 0,
              invokingCount: 0,
              avatarUrl: '',
              requiredGoldCoins: 0,
            };
            const result = await interfaceInfoRegister(obj);
            actionRef.current?.addEditRecord?.({
              id: result.data,
            });
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
