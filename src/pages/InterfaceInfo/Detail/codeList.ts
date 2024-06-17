export interface Code {
  code?: number;
  message?: string;
}

const codeList: Code[] = [
  {
    code: 200,
    message: '成功',
  },
  {
    code: 400,
    message: '请求参数错误',
  },
  {
    code: 500,
    message: '服务器错误',
  },
];
export default codeList;
