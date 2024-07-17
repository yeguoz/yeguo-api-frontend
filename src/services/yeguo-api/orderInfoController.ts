import { request } from '@umijs/max';

/** 查询用户自己所有订单 GET */
export async function getUserAllOrderInfos(userId: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/orderInfo/${userId}/all`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询用户自己所有订单 GET */
export async function getAllOrderInfos(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/orderInfo/all`, {
    method: 'GET',
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
export async function CreateOrderInfo(createOrderInfoRequest: API.CreateOrderInfoRequest, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/orderInfo`, {
    method: 'POST',
    data:createOrderInfoRequest,
    ...(options || {}),
  });
}
