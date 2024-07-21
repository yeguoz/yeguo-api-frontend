import Container from '@/components/Container';
import { userDynamicQuery, userUpdate } from '@/services/yeguo-api/userController';
import { ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import UserColumns from './UserColumns';

export default () => {
  const [tableData, setTableData] = useState([]);
  const [paramsState, setParamsState] = useState({});

  const userQueryList = async (params: API.UserQueryParams) => {
    setParamsState(params);
    const result = await userDynamicQuery(params);
    if (!result.data) {
      message.warning(result.message);
      return;
    }
    setTableData(result.data);
    message.success(result.message);
  };

  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    userQueryList({});
  }, []);

  return (
    <Container>
      <ProTable<API.UserVO>
        columns={UserColumns}
        cardBordered
        dataSource={tableData}
        options={{ reload: false }}
        // 请求失败时触发
        onRequestError={(error) => {
          message.error(error.message);
        }}
        // 重置时触发
        onReset={async () => {
          // @ts-ignore
          const result = await userDynamicQuery({});
          if (!result.data) {
            message.warning('查询数据为空');
            return;
          }
          setTableData(result.data);
          message.success('查询所有用户成功');
        }}
        // 提交时触发
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
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
      />
    </Container>
  );
};
