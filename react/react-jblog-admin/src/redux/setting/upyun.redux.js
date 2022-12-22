/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:30
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:30
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    GET_SETTING_SUCCESS: 'upyun/GET_SETTING_SUCCESS',
    ALTER_SETTING_SUCCESS: 'upyun/ALTER_SETTING_SUCCESS',
    SET_STORE_SUCCESS: 'upyun/SET_STORE_SUCCESS'
};

const initState = {
    bucket: '',
    operatorname: '',
    operatorpwd: '',
    endpoint: ''
};

export function upyun(state = initState, action) {
    switch (action.type) {
        case types.GET_SETTING_SUCCESS:
            return {
                ...state,
                bucket: action.payload.bucket,
                operatorname: action.payload.operatorname,
                operatorpwd: action.payload.operatorpwd,
                endpoint: action.payload.endpoint,
            };
        case types.SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

/**
 * 获取设置信息
 * @returns {Function}
 */
export function getSetting() {
    return async dispatch => {
        let res = await api.settingInterface.getSetting();
        if (!res) return;
        let {data = {}} = res.data;
        let info = data.info;
        let upyun_cos = info.upyun_cos;

        dispatch({
            type: types.GET_SETTING_SUCCESS,
            payload: {
                bucket: upyun_cos ? upyun_cos.bucket : '',
                operatorname: upyun_cos ? upyun_cos.operatorname : '',
                operatorpwd: upyun_cos ? upyun_cos.operatorpwd : '',
                endpoint: upyun_cos ? upyun_cos.endpoint : '',
            }
        })
    }
}

/**
 * 修改设置信息
 * @param bucket
 * @param operatorname
 * @param operatorpwd
 * @param endpoint
 * @returns {function(*): MessageType}
 */
export function alterSetting({bucket, operatorname, operatorpwd, endpoint}) {
    return async dispatch => {
        let reqBody = {
            upyun_cos: JSON.stringify({
                bucket,
                operatorname,
                operatorpwd,
                endpoint
            })
        };

        let res = await api.settingInterface.alterSetting(reqBody);
        if (!res) return;
        let {msg} = res.data;
        return message.info(msg)
    }
}

/**
 * 设置属性值
 * @param payload
 * @returns {Function}
 */
export function setStore(payload) {
    return dispatch => {
        dispatch({
            type: types.SET_STORE_SUCCESS,
            payload
        })
    }
}
