/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/5/19 上午12:03
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/5/19 上午12:03
 */

import {message} from 'antd'

import JSEncrypt from 'jsencrypt';
import api from '@/api/server';
import Cookies from 'js-cookie'

/**
 * action
 */
export const types = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    LOGOUT: 'LOGOUT',
    INIT_USER_INFO: 'INIT_USER_INFO',
    FETCH_CAPTCHA: 'FETCH_CAPTCHA'
};

/**
 * state
 */
const initState = {
    redirectTo: '', // 重定向
    checkToken: '', // token值
    captchaImg: '', // 验证码
    admin_name: '', // 用户名
    token: ''
};

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function user(state = initState, action) {
    switch (action.type) {
        case types.FETCH_CAPTCHA:
            return {
                // checkToken: action.payload.token,
                captchaImg: action.payload,
            };
        case types.LOGIN_SUCCESS:
            let {admin_name, token} = action.payload;

            return {
                ...state,
                redirectTo: '/app/article/list',
                admin_name: admin_name,
                token: token
            };
        case types.REGISTER_SUCCESS:
            return {
                redirectTo: '/login',
            };
        case types.LOGOUT:
            return {
                admin_name: '',
                token: '',
                redirectTo: '/login'
            };
        case types.INIT_USER_INFO:
            let payload = action.payload;

            return {
                admin_name: payload.admin_name,
                token: payload.token
            };
        default:
            return state
    }
}

/**
 * 获取验证码
 * dispatch
 */

export function fetchCaptcha() {
    return async dispatch => {
        dispatch({
            type: types.FETCH_CAPTCHA,
            payload: process.env.api.common_url + '/api/admin/getCode?=' + Math.random()
        });

        /*let res = await api.loginInterface.getCode();

        dispatch({
            type: types.FETCH_CAPTCHA,
            payload: res.data
        });*/

        /* let res = await api.loginInterface.getCode();
         if (!res) return;
         let {status, data} = res;
         if (status === 200) {
             dispatch({
                 type: types.FETCH_CAPTCHA,
                 payload: data
             });
         }*/
    }
}

/**
 * 获取验证码
 * @returns {Promise}
 */

/*function getCheckcode() {
    return new Promise(async (resolve, reject) => {
        let res = await api.loginInterface.getCode();
        if (!res) return;
        let {code, data} = res.data;
        if (code === 200) {
            resolve(data)
        }
    });
}*/

/**
 * 登录
 * @param username
 * @param password
 * @param captcha
 * @param checkToken
 * @returns {Function}
 */
export function login({username, password, captcha, checkToken}) {
    return async dispatch => {
        let res = await api.loginInterface.getPublicKey();
        if (!res) return;
        let {code, data} = res.data;
        if (code === 200) {
            let publicKey = data;
            let encrypt = new JSEncrypt.JSEncrypt();
            encrypt.setPublicKey(publicKey);

            let params = {
                admin_name: username,
                admin_pwd: encrypt.encrypt(password),
                code: captcha,
                token: checkToken
            };

            let res_login = await api.loginInterface.login(params);
            if (!res_login) return;

            let {code, msg} = res_login.data;
            if (code === 200) {
                message.success('登录成功！');

                // let {admin_name, token} = res_login.data.data;

                // Cookies.set('admin_name', admin_name);
                // Cookies.set('token', token);

                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: res_login.data.data
                });

                return false;
            }

            message.error(msg);

            /*let getCode = await getCheckcode();

            dispatch({
                type: types.FETCH_CAPTCHA,
                payload: Object.assign({}, getCode)
            });*/
            /* dispatch({
                 type: types.FETCH_CAPTCHA,
                 payload: process.env.api.common_url + '/api/admin/getCode?=' + Math.random()
             });*/

            fetchCaptcha()(dispatch)

        }
    }
}

/**
 * 注册
 * @param username
 * @param password
 * @returns {Function}
 */
export function register({username, password}) {
    return async dispatch => {
        let res = await api.loginInterface.getPublicKey();
        if (!res) return;
        let {code, data} = res.data;
        if (code === 200) {
            let publicKey = data;
            let encrypt = new JSEncrypt.JSEncrypt();
            encrypt.setPublicKey(publicKey);

            let params = {
                admin_name: username,
                admin_pwd: encrypt.encrypt(password),
            };

            let res_register = await api.loginInterface.register(params);
            if (!res_register) return;

            let {code, msg} = res.data;
            if (code === 200) {
                message.success('注册成功！');

                dispatch({
                    type: types.REGISTER_SUCCESS,
                });

                return false;
            }

            message.error(msg);
        }
    }
}

/**
 * 登出
 * @returns {{type: string}}
 */
export function loginOut() {
    Cookies.remove('admin_name');
    Cookies.remove('token');

    return {
        type: types.LOGOUT
    }
}

/**
 * 获取用户信息
 * @returns {{type: string, payload: {admin_name: (*|string), token: (*|string)}}}
 */
export function initUserInfo() {
    let admin_name = Cookies.get('admin_name') || '';
    let token = Cookies.get('token') || '';

    return {
        type: types.INIT_USER_INFO,
        payload: {admin_name, token}
    }
}
