import { request } from '@umijs/max';

/** 接口注册 POST /api/interfaceInfo/register */
export async function interfaceInfoRegister(body:API.InterfaceRegisterParams,options?: { [key: string]: any }) {
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
export async function interfaceInfoDelete(id:number,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/interfaceInfo/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 按照id修改接口 PUT /api/interfaceInfo/update */
export async function interfaceInfoUpdate(body:API.InterfaceUpdateParams,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/interfaceInfo/update`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 查询所有用户 GET /api/interfaceInfo/selectAll */
export async function interfaceInfoSelectAll(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/interfaceInfo/dynamicQuery`, {
    method: 'GET',
    ...(options || {}),
  });
}
