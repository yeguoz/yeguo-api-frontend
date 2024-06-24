import Container from '@/components/Container';
import { userQuery, userUpdate } from '@/services/yeguo-api/userController';
import { ActionType, ProTable, WaterMark } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { UserColumns } from '../definition';

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
    <Container>
      <WaterMark
        content={
          initialState?.currentUser?.username
            ? initialState?.currentUser?.username
            : initialState?.currentUser?.userAccount
        }
      >
        <ProTable<API.UserVO>
          columns={UserColumns}
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
    </Container>
  );
};
