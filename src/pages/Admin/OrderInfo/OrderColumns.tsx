import { handleDeleteOrderInfo } from '@/pages/OrderInfo';
import formatDate from '@/pages/utils/formatDateUtil';
import { ProColumns } from '@ant-design/pro-components';

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
        <a key="pay" onClick={async () => {}}>
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
        <a key="cancel" onClick={() => {}}>
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
