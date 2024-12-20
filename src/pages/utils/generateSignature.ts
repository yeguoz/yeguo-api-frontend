import CryptoJS from 'crypto-js';

const generateSignature = (message: string, secretKey: any) => {
  // method + url + herder 拼接，使用secretKey进行签名
  // 计算 HMAC-SHA256 签名
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  // 将签名转换为字符串输出
  return hash.toString(CryptoJS.enc.Hex);
};
export default generateSignature;
