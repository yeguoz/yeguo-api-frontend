// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResponseData = {
    code?: number;
    data?: T;
    message?: string;
    description?: string;
  };

  // 用户 ======================================

  type UserVO = {
    id?: number;
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    goldCoin?: number;
    accessKey?: string;
    secretKey?: string;
    userStatus?: number;
    userRole?: number;
    createTime?: Date;
  };

  type UserPersonUpdateParams = {
    id?: number;
    username?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
  };

  type UserLoginParams = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterParams = {
    username?: string;
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type VerifyCodeEmail = {
    email?: string;
    verifyCode?: string;
  };

  type UserQueryParams = {
    id?: number;
    username?: string;
    userAccount?: string;
    gender?: number;
    phone?: string;
    email?: string;
    goldCoin?: number;
    userStatus?: number;
    userRole?: number;
  };

  type ForgetPasswordParams = {
    email?: string;
    verifyCode?: string;
    newPassword?: string;
    checkNewPassword?: string;
  };

  // 接口 ======================================

  type InterfaceInfoVO = {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    method?: string;
    url?: string;
    requestParams?: string;
    responseParams?: string;
    responseFormat?: string;
    requestExample?: string;
    responseExample?: string;
    interfaceStatus?: number;
    invokingCount?: number;
    avatarUrl?: string;
    requiredGoldCoins?: number;
    requestHeader?: string;
    responseHeader?: string;
    createTime?: Date;
  };

  type InterfaceRegisterParams = {
    name: string;
    description: string;
    method: string;
    url: string;
    requestParams: string;
    requestHeader: string;
    responseHeader: string;
    responseFormat: string;
    requestExample: string;
    interfaceStatus: number;
    invokingCount: number;
    avatarUrl: string;
    requiredGoldCoins: number;
  };

  type InterfaceUpdateParams = {
    id: number;
    name: string;
    description: string;
    method: string;
    url: string;
    requestParams: string;
    requestHeader: string;
    responseHeader: string;
    responseFormat: string;
    requestExample: string;
    interfaceStatus: number;
    invokingCount: number;
    avatarUrl: string;
    requiredGoldCoins: number;
  };

  type InterfaceInfoQueryParams = {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    method?: string;
    url?: string;
    responseFormat?: string;
    invokingCount?: number;
    requiredGoldCoins?: number;
  };

  // 订单 ======================================

  type OrderInfoVO = {
    orderId?: string;
    userId?: number;
    payType?: number;
    money?: number;
    payStatus?: number;
    commodityContent?: string;
    createTime?: DdateTime;
    updateTime?: DateTime;
    expireTime: Date;
  };

  type CreateOrderInfoRequest = {
    userId: number;
    payType: number;
    money: number;
    commodityContent: string;
  };

  type UserOrderInfoQueryParams =
    | {
        orderId?: string;
        payType?: number;
        money?: number;
        payStatus?: number;
      }
    | {};

  type OrderInfoQueryParams =
    | {
        orderId: string;
        userId: number;
        payType: number;
        money: number;
        payStatus: number;
      }
    | {};

  type PayState = {
    userId: number;
    commodityContent: string;
    money: number;
    payType: number;
    orderId: string;
    expireTime: Date;
  };

  type OrderInfoNotificationRequest = {
    orderId: string;
    userId: number;
    commodityContent: string;
    money: number;
    payType: number;
    expireTime: Date;
  };
}
