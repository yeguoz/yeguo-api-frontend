export const generateNonce = (length = 16) => {
  // 创建一个指定长度的Uint8Array
  const array = new Uint8Array(length);
  // 使用浏览器的加密API（crypto）生成随机值，填充到array中
  window.crypto.getRandomValues(array);
  // 将数组转换成一个由数字和字母组成的字符串并返回
  return Array.from(array)
    .map((byte) => byte.toString(36))
    .join('');
};
