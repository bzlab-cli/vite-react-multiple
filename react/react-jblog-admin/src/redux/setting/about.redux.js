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
    GET_SETTING_SUCCESS: 'about/GET_SETTING_SUCCESS',
    ALTER_SETTING_SUCCESS: 'about/ALTER_SETTING_SUCCESS',
    SET_STORE_SUCCESS: 'about/SET_STORE_SUCCESS'
};

const initState = {
    picture: '',
    description: ''
};

export function about(state = initState, action) {
    switch (action.type) {
        case types.GET_SETTING_SUCCESS:
            return {
                ...state,
                picture: action.payload.picture,
                description: action.payload.description
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
        let about = info.about;

        dispatch({
            type: types.GET_SETTING_SUCCESS,
            payload: {
                picture: about ? about.picture : '',
                description: about ? about.description : ''
            }
        })
    }
}

/**
 * 修改设置信息
 * @param picture
 * @param description
 * @returns {function(*): MessageType}
 */
export function alterSetting({picture, description}) {
    return async dispatch => {
        let reqBody = {
            about: JSON.stringify({
                picture, description
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
