import CryptoJS from 'crypto-js';

const generateSignature = (message: string, secretKey: any) => {
  // method + url + herder 拼接，使用secretKey进行签名
  // 计算 HMAC-SHA256 签名
  const hash = CryptoJS.SHA256(message, secretKey);
  console.log('hash::' + hash);
  // 将签名转换为字符串输出
  return hash.toString(CryptoJS.enc.Hex);
};
export default generateSignature;
