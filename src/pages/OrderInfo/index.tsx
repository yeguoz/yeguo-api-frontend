import Container from '@/components/Container';
import {
  cancelOrderInfo,
  deleteOrderInfo,
  getUserAllOrderInfos,
} from '@/services/yeguo-api/orderInfoController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import formatDate from '../utils/formatDateUtil';

export const handleDeleteOrderInfo = async (orderId: string) => {
  const result = await deleteOrderInfo(orderId);
  if (!result.data) {
    message.error(result.message);
    return;
  }
  message.success(result.message);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export default () => {
  const navigate = useNavigate();
  const handlePay = async (
    orderId: string,
    userId: number,
    payType: number,
    money: number,
    commodityContent: string,
  ) => {
    navigate(`/${orderId}/pay`, {
      replace: false,
      state: {
        orderInfoId: orderId,
        userId,
        payType,
        money,
        commodityContent,
      },
    });
  };

  const handleCancelOrderInfo = async (orderId: string) => {
    // 调用接口，设置状态为已失效
    const result = await cancelOrderInfo(orderId);
    if (!result.data) {
      message.error(result.message);
      return;
    }
    if (result.data === 2) {
      message.info('订单已失效');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }
    message.success(result.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const OrderColumns: ProColumns<API.OrderInfoVO>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      valueType: 'text',
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
      title: '商品内容',
      dataIndex: 'commodityContent',
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
      valueType: 'dateTime',
      ellipsis: true,
    },
    {
      title: '完成时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      render: (text, record, _, action) => [
        record.payStatus === 3 ? (
          <span key="time">{formatDate(record.updateTime)}</span>
        ) : (
          <span></span>
        ),
      ],
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        record.payStatus === 0 ? (
          <a
            key="pay"
            onClick={() => {
              handlePay(
                record.orderId!,
                record.userId!,
                record.payType!,
                record.money!,
                record.commodityContent!,
              );
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
              if (record.payStatus === 0) handleCancelOrderInfo(record.orderId!);
            }}
            style={{ color: '#ea5514' }}
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
        record.payStatus !== 2 && record.payStatus !== 0 ? (
          <a
            key="cancel"
            onClick={() => {
              if (record.payStatus === 1 || record.payStatus === 3)
                handleDeleteOrderInfo(record.orderId!);
            }}
            style={{ color: '#e60012' }}
          >
            删除订单
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
            删除订单
          </a>
        ),
      ],
    },
  ];
  const { initialState } = useModel('@@initialState');
  const [tableData, setTableData] = useState([]);

  const queryOrders = async (userId: number) => {
    const result = await getUserAllOrderInfos(userId);
    if (!result.data) {
      return;
    }
    setTableData(result.data);
  };
  // 在组件挂载后调用一次数据查询
  useEffect(() => {
    queryOrders(initialState?.currentUser?.id as number);
  }, []);

  return (
    <Container>
      <ProTable<API.OrderInfoVO>
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
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户列表"
      />
    </Container>
  );
};
