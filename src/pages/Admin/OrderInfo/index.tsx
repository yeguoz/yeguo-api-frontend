import Container from '@/components/Container';
import { orderInfoDynamicQuery } from '@/services/yeguo-api/orderInfoController';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import OrderColumns from './OrderColumns';

export default () => {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);

  const queryOrderInfoList = async (params: API.OrderInfoQueryParams) => {
    const result = await orderInfoDynamicQuery(params);
    if (!result.data) {
      message.warning(result.message);
      return;
    }
    setTableData(result.data);
    message.success(result.message);
  };

  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    // @ts-ignore
    queryOrderInfoList({});
  }, []);

  return (
    <Container>
      <ProTable<API.OrderInfoVO>
        columns={OrderColumns}
        actionRef={actionRef}
        cardBordered
        dataSource={tableData}
        // 请求失败时触发
        onRequestError={(error) => {
          message.error(error.message);
        }}
        onSubmit={(params: any) => queryOrderInfoList(params)}
        toolbar={{
          title: '订单列表',
          tooltip: '展示订单信息',
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
        headerTitle="订单列表"
      />
    </Container>
  );
};
