import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型

// 与后端约定的响应数据格式
interface ResponseStructure {
    code?: number;
    data?: any;
    message?: string;
    description?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {},

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      // console.log(response);
      
      const { data } = response as unknown as ResponseStructure;

      if (data?.message !== "成功") {
        // message.error('请求数据失败！');
      }
      return response;
    },
  ],
};
