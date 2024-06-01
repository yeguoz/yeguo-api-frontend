export interface Code {
  name?:string,
  code?:number,
  message?:string
}

const codeList:Code[] = [
  {
    name: "SUCCESS",
    code: 20000,
    message: "成功"
  },
  {
    name: "PARAMS_ERROR",
    code: 40000,
    message: "请求参数错误"
  },
  {
    name: "USER_EXIST_ERROR",
    code: 40001,
    message: "用户不存在"
  },
  {
    name: "TIME_OUT",
    code: 40002,
    message: "超时"
  },
  {
    name: "NOT_LOGIN_ERROR",
    code: 40100,
    message: "未登录"
  },
  {
    name: "NO_AUTH_ERROR",
    code: 40101,
    message: "无权限"
  },
  {
    name: "FORBIDDEN_ERROR",
    code: 40300,
    message: "禁止访问"
  },
  {
    name: "NOT_FOUND_ERROR",
    code: 40400,
    message: "请求数据不存在"
  },
  {
    name: "SYSTEM_ERROR",
    code: 50000,
    message: "系统内部异常"
  },
  {
    name: "OPERATION_ERROR",
    code: 50001,
    message: "操作失败"
  },
]
export default codeList;
