// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户注册 POST /api/user/register */
export async function userRegister(body:API.UserRegisterParams,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function userLogin(body:API.UserLoginParams,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前用户 POST /api/user/current */
export async function userCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/current`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 注销 POST /api/user/logout */
export async function userlogout(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 查询所有用户 GET /api/user/selectAll */
export async function userSelectAll(params:API.UserQueryParams,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 按照id删除用户 DELETE /api/user/selectAll */
export async function userDelete(id:number,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 按照id修改用户 PUT /api/user */
export async function userUpdate(body:API.UserVO,options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/update`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}