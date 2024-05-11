// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResponseData = {
    code?: number;
    data?: T;
    message?: string;
    description?: string;
  }

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
  }

  type UserLoginParams = {
     userAccount?: string;
     userPassword?: string;
  }

  type UserRegisterParams = {
     username?: string;
     userAccount?: string;
     userPassword?: string;
     checkPassword?: string;
  }

}
