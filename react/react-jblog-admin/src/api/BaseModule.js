import axios from 'axios'
import qs from 'qs'
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'
import Cookies from 'js-cookie'
import {message} from 'antd';

class BaseModule {
    constructor() {
        this.instance = axios.create();
        this.dataMethodDefaults = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true,
            transformRequest: [function (data) {
                return qs.stringify(data)
            }]
        };

        axios.interceptors.request.use = this.instance.interceptors.request.use;

        // request拦截器
        this.instance.interceptors.request.use(config => {
                // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中

                let token = Cookies.get('token');

                if (token) {
                    config.headers.Authorization = token;
                }

                NProgress.start();

                return config;
            }, err => {
                return Promise.reject(err);
            }
        );

        // respone拦截器
        this.instance.interceptors.response.use(response => {
                NProgress.done();
                return response;
            }, err => {
                let {response} = err;
                if (response.status === 401) {
                    message.info(response.data.msg);

                    Cookies.remove('token');  // token过期,清除
                    Cookies.remove('admin_id');
                    Cookies.remove('admin_name');

                    window.location.href = '/login';

                    NProgress.done();

                    return Promise.reject(response);
                }
            }
        )
    }

    get(url, config = {}) {
        return this.instance.get(url, config)
    }

    post(url, data = undefined, config = {}) {
        return this.instance.post(url, data, {...this.dataMethodDefaults, ...config})
    }

    patch(url, data = undefined, config = {}) {
        return this.instance.patch(url, data, {...this.dataMethodDefaults, ...config})
    }

    put(url, data = undefined, config = {}) {
        return this.instance.put(url, data, {...this.dataMethodDefaults, ...config})
    }

    delete(url, config = {}) {
        return this.instance.delete(url, config)
    }
}

export default BaseModule
