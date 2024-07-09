import CryptoJS from 'crypto-js';

export default (accessKey: string | undefined, secretKey: string | undefined) => {
  // 将所有参数按键名排序后拼接成字符串，然后加上 secretKey
  const message = accessKey! + secretKey!;
  // 计算 HMAC-MD5 签名
  const hash = CryptoJS.HmacMD5(message, 'yeguoapi');
  console.log('hash::' + hash);
  // 将签名转换为字符串输出
  return hash.toString(CryptoJS.enc.Hex);
};
