import axios, { type Method, type AxiosRequestConfig } from 'axios';
import { getConfig } from './config';

const { FEISHU_CONFIG } = getConfig();

/**
 * 任意请求
 * @param options
 * @returns
 */
export const request = async <T>(options: AxiosRequestConfig<T>) => {
  try {
    return axios.request(options);
  } catch (error) {
    throw error;
  }
};

interface IMethodV {
  url: string;
  method?: Method;
  headers?: { [key: string]: string };
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export interface IRequest {
  data: any;
  code: number;
}

/**
 * @description: 带 version 的通用 api 请求
 */
export const methodV = async ({
  url,
  method,
  headers,
  params = {},
  query = {},
}: IMethodV): Promise<IRequest> => {
  let sendUrl = '';
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    sendUrl = url;
  } else {
    sendUrl = `${FEISHU_CONFIG.FEISHU_URL}${url}`;
  }
  try {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...headers,
        },
        url: sendUrl,
        method,
        params: query,
        data: {
          ...params,
        },
      })
        .then(({ data, status }) => {
          console.log('status', status);
          resolve({ data, code: status });
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};
