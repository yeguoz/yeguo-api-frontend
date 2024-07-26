import { request } from '@umijs/max';

/** 用户页动态查询订单  */
export async function getUserOrderInfos(
  userId: number,
  params: API.UserOrderInfoQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/orderInfo/${userId}/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 管理页动态查询订单  */
export async function orderInfoDynamicQuery(
  params: API.OrderInfoQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/orderInfo/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 取消订单 支付状态（0 未支付 1 已失效 2 正在审核 3 已完成） updateOrderInfoStatus 传递订单号和状态 */
export async function updateOrderInfoStatus(
  orderId: string,
  payStatus: number,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/orderInfo/${orderId}/${payStatus}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 创建订单  */
export async function CreateOrderInfo(
  createOrderInfoRequest: API.CreateOrderInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/orderInfo`, {
    method: 'POST',
    data: createOrderInfoRequest,
    ...(options || {}),
  });
}

/** 删除订单  */
export async function deleteOrderInfo(orderId: string, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/orderInfo/${orderId}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 通知邮件 */
export async function sendNotificationMail(
  body: API.OrderInfoNotificationRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/orderInfo/notifyMail`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
