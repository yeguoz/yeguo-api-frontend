// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户注册 */
export async function userRegister(body: API.UserRegisterParams, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 */
export async function userLogin(body: API.UserLoginParams, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前用户 */
export async function userCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/current`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 注销 */
export async function userlogout(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 动态查询用户 */
export async function userDynamicQuery(
  params: API.UserQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/dynamicQuery`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 按照id删除用户 */
export async function userDelete(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 按照id修改用户 */
export async function userUpdate(body: API.UserVO, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/update`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改用户信息 */
export async function userPersonInfoUpdate(
  body: API.UserPersonUpdateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/personInfoUpdate`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改用户密钥 */
export async function userPersonKeysUpdate(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 请求后端向邮箱发送验证码 */
export async function userEmailVerifyCode(email: string, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/verifyCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
    },
    ...(options || {}),
  });
}
/** 邮箱注册 */
export async function userEmailRegister(
  body: API.UserEmailRegisterLoginParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/emailRegister`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 邮箱登录 */
export async function userEmailLogin(
  body: API.UserEmailRegisterLoginParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/emailLogin`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
