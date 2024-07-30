import Container from '@/components/Container';
import OperationButton from '@/components/OperationButton';
import formatDate from '@/pages/utils/formatDateUtil';
import {
  deleteOrderInfo,
  orderInfoDynamicQuery,
  recharge,
  updateOrderInfoStatus,
} from '@/services/yeguo-api/orderInfoController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      width: 80,

      ellipsis: true,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'select',
      width: 80,
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
      width: 80,
      ellipsis: true,
    },
    {
      title: '商品内容',
      dataIndex: 'commodityContent',
      hideInSearch: true,
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
      hideInSearch: true,
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
        record.payStatus === 2 ? (
          <OperationButton
            key="pay"
            onClick={async () => {
              // 调用接口设置支付状态已完成，给当前用户加上金币,从string中取出number
              const extractNumber = (str: string) => {
                const matches = str.match(/\d+/);
                if (matches) {
                  return parseInt(matches[0], 10);
                }
                return null; // 或者其他你认为合适的默认值或处理方式
              };
              const goldCoin = extractNumber(record.commodityContent!);

              setIsLoading(true);
              // 给用户加上硬币,record.userId goldCoin
              const result = await updateOrderInfoStatus(record.orderId!, 3);
              const rechargeRst = await recharge(record.userId!, goldCoin!);
              setIsLoading(false);
              if (!result.data || !rechargeRst.data) {
                message.error(result.message);
                return;
              }
              message.success(result.message + '--' + rechargeRst.message);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            通过
          </OperationButton>
        ) : (
          <OperationButton
            style={{
              pointerEvents: 'none',
              color: 'gray',
              textDecoration: 'none',
              cursor: 'default',
            }}
          >
            通过
          </OperationButton>
        ),
        record.payStatus === 2 ? (
          <OperationButton
            key="cancel"
            onClick={async () => {
              setIsLoading(true);
              const result = await updateOrderInfoStatus(record.orderId!, 1);
              setIsLoading(false);
              if (!result.data) {
                message.error(result.message);
                return;
              }
              message.success(result.message);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            未通过
          </OperationButton>
        ) : (
          <OperationButton
            style={{
              pointerEvents: 'none',
              color: 'gray',
              textDecoration: 'none',
              cursor: 'default',
            }}
          >
            未通过
          </OperationButton>
        ),
        record.payStatus !== 2 && record.payStatus !== 0 ? (
          <OperationButton
            key="cancel"
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

  const dynamicQueryOrderInfos = async (params: API.OrderInfoQueryParams) => {
    setIsLoading(true);
    const result = await orderInfoDynamicQuery(params);
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
    // @ts-ignore
    dynamicQueryOrderInfos({});
  }, []);

  return (
    <Container>
      <ProTable<API.OrderInfoVO>
        columns={OrderColumns}
        actionRef={actionRef}
        cardBordered
        loading={isLoading}
        dataSource={tableData}
        options={{ reload: false }}
        // 请求失败时触发
        onRequestError={(error) => {
          message.error(error.message);
        }}
        onSubmit={(params: any) => dynamicQueryOrderInfos(params)}
        onReset={async () => {
          setIsLoading(true);
          const result = await orderInfoDynamicQuery({});
          setIsLoading(false);
          if (!result.data) {
            message.warning('查询数据为空');
            return;
          }
          setTableData(result.data);
          message.success('成功');
        }}
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
