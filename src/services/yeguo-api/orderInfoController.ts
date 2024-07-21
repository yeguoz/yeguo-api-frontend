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

/** 取消订单  */
export async function cancelOrderInfo(orderId: string, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/orderInfo/cancel/${orderId}`, {
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
