import Container from '@/components/Container';
import { cancelOrder, getUserAllOrderInfos } from '@/services/yeguo-api/orderInfoController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';

const handleCancelOrder = async (orderId: string) => {
  // 调用接口，设置状态为已失效
  const result = await cancelOrder(orderId);
  // 1 -1
  if (result.data === -1) {
    message.error('取消订单失败--' + result.message);
    return;
  }
  message.success('取消订单成功');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const handlePay = async () => {};

const OrderColumns: ProColumns<API.OrderVO>[] = [
  {
    title: '订单编号',
    dataIndex: 'orderId',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    ellipsis: true,
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '微信',
        status: 'success',
      },
      1: {
        text: '支付宝',
        status: 'success',
      },
    },
    ellipsis: true,
  },
  {
    title: '支付金额',
    dataIndex: 'money',
    ellipsis: true,
  },
  {
    title: '支付状态',
    dataIndex: 'payStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未支付',
        status: 'Error',
      },
      1: {
        text: '已失效',
        status: 'Default',
      },
      2: {
        text: '正在审核',
        status: 'Processing',
      },
      3: {
        text: '已完成',
        status: 'Success',
      },
    },
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      record.payStatus === 0 ? (
        <a
          key="pay"
          onClick={() => {
            handlePay();
          }}
        >
          去支付
        </a>
      ) : (
        <a
          style={{
            pointerEvents: 'none',
            color: 'gray',
            textDecoration: 'none',
            cursor: 'default',
          }}
        >
          去支付
        </a>
      ),
      record.payStatus === 0 ? (
        <a
          key="cancel"
          onClick={() => {
            if (record.payStatus === 0) handleCancelOrder(record.orderId!);
          }}
        >
          取消订单
        </a>
      ) : (
        <a
          style={{
            pointerEvents: 'none',
            color: 'gray',
            textDecoration: 'none',
            cursor: 'default',
          }}
        >
          取消订单
        </a>
      ),
    ],
  },
];

export default () => {
  const { initialState } = useModel('@@initialState');
  const [tableData, setTableData] = useState([]);

  const queryOrders = async (userId: number) => {
    const result = await getUserAllOrderInfos(userId);
    if (!result.data) {
      message.warning('查询数据为空');
      return;
    }
    setTableData(result.data);
    message.success('查询数据成功');
  };

  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    queryOrders(initialState?.currentUser?.id as number);
  }, []);

  return (
    <Container>
      <ProTable<API.OrderVO>
        columns={OrderColumns}
        cardBordered
        dataSource={tableData}
        // 请求失败时触发
        onRequestError={(error) => {
          message.error(error.message);
        }}
        // // 提交时触发
        // onSubmit={(params) => userQueryList(params)}
        toolbar={{
          title: '订单列表',
          tooltip: '展示订单信息',
        }}
        // 编辑配置
        editable={{
          type: 'multiple',
          //  修改后刷新展示数据
          // onSave: async (_, row) => {
          //   const result = await userUpdate(row);
          //   if (result.data === null) {
          //     message.error(result.description);
          //     return;
          //   }
          //   userQueryList(paramsState);
          //   message.success('修改成功');
          // },
          // 保留保存和取消
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        // search配置
        search={false}
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
    </Container>
  );
};
