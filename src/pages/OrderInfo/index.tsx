import OperationButton from '@/components/OperationButton';
import {
  deleteOrderInfo,
  getUserOrderInfos,
  updateOrderInfoStatus,
} from '@/services/yeguo-api/orderInfoController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import formatDate from '../utils/formatDateUtil';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  // button 加载状态
  const [isLoading, setIsLoading] = useState(false);

  // 支付处理
  const handlePay = async (
    orderId: string,
    userId: number,
    payType: number,
    money: number,
    commodityContent: string,
    expireTime: Date,
  ) => {
    navigate(`/${orderId}/pay`, {
      replace: false,
      state: {
        orderId,
        userId,
        commodityContent,
        money,
        payType,
        expireTime,
      },
    });
  };

  // 取消处理
  const handleCancelOrderInfo = async (orderId: string) => {
    setIsLoading(true);
    // 设置无效状态
    const result = await updateOrderInfoStatus(orderId, 1);
    setIsLoading(false);
    if (!result.data) {
      message.error(result.message);
      return;
    }
    message.success(result.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // 删除处理
  const handleDeleteOrderInfo = async (orderId: string) => {
    setIsLoading(true);
    const result = await deleteOrderInfo(orderId);
    setIsLoading(false);

    if (!result.data) {
      message.error(result.message);
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
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: '过期时间',
      dataIndex: 'expireTime',
      valueType: 'dateTime',
      hideInSearch: true,
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
          <OperationButton
            key="pay"
            onClick={() => {
              handlePay(
                record.orderId!,
                record.userId!,
                record.payType!,
                record.money!,
                record.commodityContent!,
                record.expireTime!,
              );
            }}
          >
            付款
          </OperationButton>
        ) : (
          <OperationButton
            key="pay"
            style={{
              pointerEvents: 'none',
              color: 'gray',
              textDecoration: 'none',
              cursor: 'default',
            }}
          >
            付款
          </OperationButton>
        ),
        record.payStatus === 0 ? (
          <OperationButton
            key="cancel"
            onClick={() => {
              if (record.payStatus === 0) handleCancelOrderInfo(record.orderId!);
            }}
            style={{ color: '#ea5514' }}
          >
            取消订单
          </OperationButton>
        ) : (
          <OperationButton
            key="cancel"
            style={{
              pointerEvents: 'none',
              color: 'gray',
              textDecoration: 'none',
              cursor: 'default',
            }}
          >
            取消订单
          </OperationButton>
        ),
        record.payStatus !== 2 && record.payStatus !== 0 ? (
          <OperationButton
            key="delete"
            onClick={() => {
              if (record.payStatus === 1 || record.payStatus === 3)
                handleDeleteOrderInfo(record.orderId!);
            }}
            style={{ color: '#e60012' }}
          >
            删除订单
          </OperationButton>
        ) : (
          <OperationButton
            key="delete"
            style={{
              pointerEvents: 'none',
              color: 'gray',
              textDecoration: 'none',
              cursor: 'default',
            }}
          >
            删除订单
          </OperationButton>
        ),
      ],
    },
  ];

  const dynamicQueryOrderInfos = async (params: API.UserOrderInfoQueryParams) => {
    setIsLoading(true);
    const result = await getUserOrderInfos(initialState?.currentUser?.id as number, params);
    setIsLoading(false);
    if (!result.data) {
      message.warning(result.message);
      return;
    }
    setTableData(result.data);
    message.success(result.message);
  };

  const handleExpireOrderInfo = async (data: API.OrderInfoVO[]) => {
    const nonpaymentArr = data.filter((orderInfo: API.OrderInfoVO) => orderInfo.payStatus === 0);

    for (const element of nonpaymentArr) {
      const now = new Date();
      const expireTime = new Date(element.expireTime);
      if (now > expireTime) {
        await updateOrderInfoStatus(element.orderId as string, 1);
      }
    }

    const result = await getUserOrderInfos(initialState?.currentUser?.id as number, {});
    setTableData(result.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserOrderInfos(initialState?.currentUser?.id as number, {});
      await handleExpireOrderInfo(result.data);
    };
    fetchData();
  }, []);

  return (
    <ProTable<API.OrderInfoVO>
      columns={OrderColumns}
      scroll={{ x: 'max-content' }}
      cardBordered
      dataSource={tableData}
      onRequestError={(error) => {
        message.error(error.message);
      }}
      options={{ reload: false }}
      onSubmit={(params: any) => dynamicQueryOrderInfos(params)}
      onReset={async () => {
        await dynamicQueryOrderInfos({});
      }}
      loading={isLoading}
      toolbar={{
        title: '订单列表',
        tooltip: '展示订单信息',
      }}
      editable={{
        type: 'multiple',
        actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        showHiddenNum: true,
      }}
      form={{
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
