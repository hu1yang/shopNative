import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'
import EncryptedStorageUtil from './storage'
import Toast from 'react-native-toast-message';


export interface IAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
    loading?: boolean;
}

// 自定义的响应数据类型
export interface IAxiosResponse<D = any> extends AxiosResponse<D> {
    data: {
        code: number;
        msg: string;
        data?: D;
    };
}


const instance:AxiosInstance = axios.create({
    baseURL: 'http://localhost:3003',
    timeout:15000,
    // withCredentials:true,
    headers:{
        Accept:'application/json',
        post:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        'X-Requested-With':'XMLHttpRequest'
    }
})

/**
 * 如果非自定义api中的内容，403不跳转登录
 */
const whiteList = ['']
const whiteFilter = (base: any, url: string) => {
    let api = url.replace(base, '')
    return whiteList.includes(api)
}


instance.interceptors.request.use(
    async (config:IAxiosRequestConfig) => {
        if (config.loading) {
            //     loading start
        }
        const userInfo = await EncryptedStorageUtil.getItem<string>('userInfo');
        config.headers['Access-Token'] = userInfo?.token || ''
        let date = new Date().valueOf(); // 时间戳
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
        return config
    },
    (error:AxiosError) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // loading end
        if (response.status === 200) {
            if(response.data.code === 403){
                if(!whiteFilter(response.config.baseURL,response.request.responseURL)){

                }
                EncryptedStorageUtil.removeItem('userInfo')
            }
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    (error: AxiosError) => {

        // loading end
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        Toast.show({
            type: 'error',  // 可以选择不同的类型，如 success, error, info
            position: 'top',  // 默认从顶部显示
            text1: 'network error',
            text2: 'Interface 500 error reported!',
            visibilityTime: 3000,  // Toast显示时长
            topOffset: 150, // 控制顶部距离，修改此值调整 Toast 显示的高度
            textStyle: {
                fontSize: 16,
                color: 'white', // 自定义文字颜色
            },
        });
        return Promise.reject(error);
    },
);

function get(url: string, params: any) {
    return instance.get(url, {
        params,
    });
}
function post(url: string, params: any) {
    return instance.post(url, params);
}
function doFiles(url:string, params:any){
    let formData = new FormData()
    formData.append('file',params)
    formData.append('is_auth','1')
    return new Promise((resolve, reject) => {
        axios.post(process.env.VITE_APP_API+url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}
export default {
    get,
    post,
    doFiles
}
