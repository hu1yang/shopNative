import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import EncryptedStorageUtil from './storage';
import Toast from 'react-native-toast-message';
import {IUserInfo} from '@/types/user';

// 请求配置接口
export interface IAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
    loading?: boolean;
}

// 分页接口
export interface Pagination {
    page: number;
    pageSize: number;
    total: number|null;
}

// 自定义响应数据格式
export interface CustomData<D = any> {
    code: number;
    msg: string;
    data?: D;
    pagination?: Pagination;
}

// Axios 响应类型

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        post: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// 白名单配置
const whiteList = ['']; // 添加白名单接口路径
const whiteFilter = (base: string, url: string): boolean => {
    const api = url.replace(base, '');
    return whiteList.includes(api);
};

// 请求拦截器
instance.interceptors.request.use(
    async (config: IAxiosRequestConfig) => {
        if (config.loading) {
            // loading start
        }
        let token = ''
        try {
            const userInfo = await EncryptedStorageUtil.getItem<IUserInfo>('userInfo');
            token = userInfo.token;
        } catch (error) {
            token = ''
        }
        config.headers['Access-Token'] = token || '';
        const date = new Date().valueOf(); // 时间戳
        if (config.method === 'post') {
            config.data = {
                ...config.data,
                timeStamp: date,
            };
        } else if (config.method === 'get') {
            config.params = {
                timeStamp: date,
                ...config.params,
            };
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // loading end
        if (response.status === 200) {
            if (response.data.code === 403) {
                EncryptedStorageUtil.removeItem('userInfo');
            }
            return response;
        }
        return Promise.reject(response);
    },
    (error: AxiosError) => {
        // 错误处理
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Network Error',
            text2: 'Interface 500 error reported!',
            visibilityTime: 3000,
            topOffset: 150,
            text1Style: {
                fontSize: 14,
                color: '#333', // 自定义文字颜色
            },
            text2Style:{
                fontSize: 12,
                color: '#ccc', // 自定义文字颜色
            }
        });
        return Promise.reject(error);
    }
);

// 请求方法封装
function get<T>(url: string, params: any): Promise<CustomData<T>> {
    return instance
    .get<CustomData<T>>(url, { params })
    .then((response) => response.data)
    .catch((error) => {
        console.error(error);
        throw error;
    });
}

function post<T>(url: string, params: any): Promise<CustomData<T>> {
    return instance
    .post(url, params)
    .then((response) => {
        return response.data as CustomData<T>;
    })
    .catch((error) => {
        console.error(error);
        throw error;
    });
}

// 文件上传
function doFiles(url: string, params: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', params);
    formData.append('is_auth', '1');

    return instance
    .post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data)
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

export default {
    get,
    post,
    doFiles,
};
