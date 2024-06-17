import Container from '@/components/Container';
import {
  interfaceInfoDelete,
  interfaceInfoQuery,
  interfaceInfoRegister,
  interfaceInfoUpdate,
} from '@/services/yeguo-api/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, WaterMark } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
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

const columns: ProColumns<API.InterfaceInfoVO>[] = [
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
    title: '请求头',
    dataIndex: 'requestHeader',
    valueType: 'jsonCode',
    copyable: false,
    hideInSearch: true,
    ellipsis: true,
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

export default () => {
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);
  const [paramsState, setParamsState] = useState({});

  const interfaceInfoQueryList = async (params: API.UserQueryParams) => {
    setParamsState(params);
    const result = await interfaceInfoQuery(params);
    if (!result.data) {
      message.warning('查询数据为空');
      return;
    }
    setTableData(result.data);
    message.success('查询数据成功');
  };

  useEffect(() => {
    interfaceInfoQueryList({}); // 在组件挂载后调用一次数据查询
  }, []);

  return (
    <Container>
      <WaterMark
        content={
          initialState?.currentUser?.username
            ? initialState?.currentUser?.username
            : initialState?.currentUser?.userAccount
        }
      >
        <ProTable<API.InterfaceInfoVO>
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
            const result = await interfaceInfoQuery({});
            if (!result.data) {
              message.warning('查询数据为空');
              return;
            }
            setTableData(result.data);
            message.success('查询所有用户成功');
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
              // @ts-ignore
              const result = await interfaceInfoUpdate(row);
              if (result.data === null) {
                message.error(result.description);
                return;
              }
              interfaceInfoQueryList(paramsState);
              message.success('修改成功');
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
            pageSize: 5,
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
      </WaterMark>
    </Container>
  );
};
