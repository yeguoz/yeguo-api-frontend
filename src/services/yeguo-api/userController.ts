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
    credentials: 'include',
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
    credentials: 'include',
    ...(options || {}),
  });
}

/** 当前用户 */
export async function userCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/current`, {
    method: 'GET',
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
    ...(options || {}),
  });
}

/** 按照id删除用户 */
export async function userDelete(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    ...(options || {}),
  });
}

/** 按照id修改用户 */
export async function userUpdate(body: API.UserVO, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/update`, {
    method: 'PUT',
    data: body,
    credentials: 'include',
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
    credentials: 'include',
    ...(options || {}),
  });
}

/** 修改用户密钥 */
export async function userPersonKeysUpdate(id: number, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/${id}`, {
    method: 'PUT',
    credentials: 'include',
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
    credentials: 'include',
    ...(options || {}),
  });
}
/** 邮箱注册 */
export async function userEmailRegister(
  body: API.VerifyCodeEmail,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/emailRegister`, {
    method: 'POST',
    data: body,
    credentials: 'include',
    ...(options || {}),
  });
}

/** 邮箱登录 */
export async function userEmailLogin(body: API.VerifyCodeEmail, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/emailLogin`, {
    method: 'POST',
    data: body,
    credentials: 'include',
    ...(options || {}),
  });
}

/** 忘记密码 验证邮箱 */
export async function forgetPwdVerifyCode(
  body: API.VerifyCodeEmail,
  options?: { [key: string]: any },
) {
  return request<API.ResponseData>(`/api/user/forgetPwd/verifyCode`, {
    method: 'POST',
    data: body,
    credentials: 'include',
    ...(options || {}),
  });
}

/** 忘记密码 提交验证 */
export async function forgetPwd(body: API.ForgetPasswordParams, options?: { [key: string]: any }) {
  return request<API.ResponseData>(`/api/user/forgetPwd`, {
    method: 'PUT',
    data: body,
    credentials: 'include',
    ...(options || {}),
  });
}
