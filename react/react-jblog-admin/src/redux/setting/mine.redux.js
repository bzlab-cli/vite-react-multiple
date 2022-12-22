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
    GET_SETTING_SUCCESS: 'mine/GET_SETTING_SUCCESS',
    ALTER_SETTING_SUCCESS: 'mine/ALTER_SETTING_SUCCESS',
    SET_STORE_SUCCESS: 'mine/SET_STORE_SUCCESS'
};

const initState = {
    avatar: '', /*头像*/
    cover: '', /*封面*/
    description: '', /*描述*/
    github: '',
    juejin: '',
};

export function mine(state = initState, action) {
    switch (action.type) {
        case types.GET_SETTING_SUCCESS:
            return {
                ...state,
                avatar: action.payload.avatar, /*头像*/
                cover: action.payload.cover, /*封面*/
                description: action.payload.description, /*描述*/
                github: action.payload.github,
                juejin: action.payload.juejin,
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
        let person_info = info.person_info;

        dispatch({
            type: types.GET_SETTING_SUCCESS,
            payload: {
                avatar: person_info ? person_info.avatar : '',
                cover: person_info ? person_info.cover : '',
                description: person_info ? person_info.description : '',
                github: person_info ? person_info.github : '',
                juejin: person_info ? person_info.juejin : ''
            }
        })
    }
}

/**
 * 修改设置信息
 * @param avatar
 * @param cover
 * @param description
 * @param github
 * @param juejin
 * @returns {function(*): MessageType}
 */
export function alterSetting({avatar, cover, description, github, juejin}) {
    return async dispatch => {
        let reqBody = {
            person_info: JSON.stringify({
                avatar,
                cover,
                description,
                github,
                juejin,
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
