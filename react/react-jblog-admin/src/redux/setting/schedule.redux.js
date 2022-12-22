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
    SCHEDULE_LIST_SUCCESS: 'schedule/SCHEDULE_LIST_SUCCESS',
    ADD_SCHEDULE_SUCCESS: 'schedule/ADD_SCHEDULE_SUCCESS',
    ALTER_SCHEDULE_SUCCESS: 'schedule/ALTER_SCHEDULE_SUCCESS',
    SET_STORE_SUCCESS: 'schedule/SET_STORE_SUCCESS'
};

const initState = {
    tabs_list: [
        {
            name: '定时任务',
            key: 0
        },
    ],
    schedule_list: [],
    keyword: '',
    total_count: 0,
    current_page: 1,
    page_size: 10,
    weekSelectValue: 'day',
    dateSelectValue: '',
    timeValue: '',
    inputCronValue: '',
    inputCronState: false,
    task_switch: true,
    dateList: []
};

export function schedule(state = initState, action) {
    switch (action.type) {
        case types.SCHEDULE_LIST_SUCCESS:
            return {
                ...state,
                schedule_list: action.payload.schedule_list,
                total_count: action.payload.total_count
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
 * 获取定时任务
 * @returns {Function}
 */
export function getScheduleList({keyword, current_page, page_size}) {
    return async dispatch => {
        let reqBody = {
            keyword,
            current_page,
            page_size,
        };
        let res = await api.scheduleInterface.getScheduleList(reqBody);
        if (!res) return;
        let {list, total} = res.data.data;

        dispatch({
            type: types.SCHEDULE_LIST_SUCCESS,
            payload: {
                schedule_list: list,
                total_count: total
            }
        })
    }
}

/**
 * 添加任务
 * @param task_name
 * @param task_type
 * @param task_cookie
 * @param task_desc
 * @param task_cron
 * @param task_switch
 * @param onSuccess
 * @return {function(*): MessageType}
 */
export function addSchedule({task_name, task_type, task_cookie, task_desc, task_cron, task_switch, onSuccess}) {
    return async dispatch => {
        let res = await api.scheduleInterface.addSchedule({
            task_name, task_type, task_cookie, task_desc, task_cron, task_switch
        });
        if (!res) return;

        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

        return message.info(msg)
    }
}

/**
 * 修改任务
 * @param _id
 * @param task_name
 * @param task_type
 * @param task_cookie
 * @param task_desc
 * @param task_cron
 * @param task_switch
 * @param onSuccess
 * @return {function(*): MessageType}
 */
export function alterSchedule({_id, task_name, task_type, task_cookie, task_desc, task_cron, task_switch, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            _id,
            task_name,
            task_type,
            task_cookie,
            task_desc,
            task_cron,
            task_switch
        };

        let res = await api.scheduleInterface.alterSchedule(reqBody);
        if (!res) return;
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }
        return message.info(msg)
    }
}

/**
 * 删除任务
 * @param _id
 * @param onSuccess
 * @return {function(*): MessageType}
 */
export function deleteSchedule({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.scheduleInterface.deleteScheduleById({_id});
        if (!res) return;
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

        return message.info(msg)
    }
}

/**
 * 运行全部任务
 * @param onSuccess
 * @return {function(*): MessageType}
 */
export function startAllSchedule() {
    return async dispatch => {
        let res = await api.scheduleInterface.startAllSchedule();
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
