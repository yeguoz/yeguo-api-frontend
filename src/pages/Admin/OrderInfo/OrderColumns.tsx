import { handleDeleteOrderInfo } from '@/pages/OrderInfo';
import formatDate from '@/pages/utils/formatDateUtil';
import { recharge, updateOrderInfoStatus } from '@/services/yeguo-api/orderInfoController';
import { ProColumns } from '@ant-design/pro-components';
import { message } from 'antd';

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
        <a
          key="pay"
          onClick={async () => {
            // 调用接口设置支付状态已完成，给当前用户加上金币
            const extractNumber = (str: string) => {
              const matches = str.match(/\d+/);
              if (matches) {
                return parseInt(matches[0], 10);
              }
              return null; // 或者其他你认为合适的默认值或处理方式
            };
            const goldCoin = extractNumber(record.commodityContent!);
            // 给用户加上硬币,record.userId goldCoin
            const result = await updateOrderInfoStatus(record.orderId!, 3);
            const rechargeRst = await recharge(record.userId!, goldCoin!);
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
          通过
        </a>
      ),
      record.payStatus === 2 ? (
        <a
          key="cancel"
          onClick={async () => {
            const result = await updateOrderInfoStatus(record.orderId!, 1);
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
          未通过
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
export default OrderColumns;
