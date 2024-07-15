import Container from '@/components/Container';
import {
  interfaceInfoQuery,
  interfaceInfoRegister,
  interfaceInfoUpdate,
} from '@/services/yeguo-api/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProTable, WaterMark } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import InterfaceInfoColumns from './InterfaceInfoColumns';

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
          columns={InterfaceInfoColumns}
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
