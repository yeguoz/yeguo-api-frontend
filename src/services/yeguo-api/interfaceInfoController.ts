import { generateNonce } from '@/pages/utils/generateNonce';
import { request } from '@umijs/max';

/** 接口注册 POST /api/interfaceInfo/register */
export async function interfaceInfoRegister(
  body: API.InterfaceRegisterParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 按照id删除接口 DELETE /api/interfaceInfo/${id} */
export async function interfaceInfoDelete(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/interfaceInfo/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 按照id修改接口 PUT /api/interfaceInfo/update */
export async function interfaceInfoUpdate(
  body: API.InterfaceUpdateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/update`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 动态接口查询 GET /api/interfaceInfo/dynamicQuery */
export async function interfaceInfoDynamicQuery(
  params: API.InterfaceInfoQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/interfaceInfo/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 在线接口调用 */
export async function onlineInvoking(
  body: any,
  accessKey: string,
  secretKey: string,
  file?: File,
  options?: { [key: string]: any },
) {
  let fileName = file?.name || '';
  let fileSize = file?.size || 0;
  const formData = new FormData();

  formData.append(
    'invokingRequest',
    new Blob([JSON.stringify(body)], { type: 'application/json' }),
  );

  if (file) {
    formData.append('file', file);
  }

  // 5 分钟后时间戳
  const expiryTimestamp = Date.now() + 5 * 60 * 1000;
  const nonce = generateNonce();
  return request<API.ResponseData>(`/api/interfaceInfo/onlineInvoking`, {
    method: 'POST',
    headers: {
      'X-Access-Key': accessKey,
      'X-Secret-Key': secretKey,
      'X-File-Name': fileName,
      'X-File-Size': fileSize,
      'X-Expiry-Timestamp': expiryTimestamp,
      'X-Nonce': nonce,
    },
    data: formData,
    ...(options || {}),
  });
}
