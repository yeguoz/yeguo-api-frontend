import { ProColumns } from '@ant-design/pro-components';

const OrderColumns: ProColumns<API.OrderInfoVO>[] = [
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
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a key="pay" onClick={async () => {}}>
        去支付
      </a>,
      <a key="cancel" onClick={() => {}}>
        取消订单
      </a>,
    ],
  },
];
export default OrderColumns;
