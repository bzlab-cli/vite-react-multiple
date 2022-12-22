/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/26 14:23
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/26 14:23
 */
import api from '@/api/server';
import {message} from 'antd';

export const types = {
    GET_FOLD_SUCCESS: 'upload/GET_FOLD_SUCCESS',
    UPLOAD_LIST_SUCCESS: 'upload/UPLOAD_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'upload/SET_STORE_SUCCESS'
};

const initState = {
    foldId: '',
    tree_list: [],
    move_tree_list: [],
    upload_list: [],
    total_count: 0,
    current_page: 1,
    page_size: 8,
};

/**
 * 上传
 * @param state
 * @param action
 * @returns {*}
 */
export function upload(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.GET_FOLD_SUCCESS:
            return {
                ...state,
                tree_list: action.payload,
            };
        case types.UPLOAD_LIST_SUCCESS:
            return {
                ...state,
                upload_list: action.payload.list,
                total_count: action.payload.total
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
 * 获取目录
 * @param onSuccess
 * @returns {Function}
 */
export function getFold({onSuccess}) {
    return async dispatch => {
        let res = await api.uploadInterface.getFold();
        if (!res) return;
        let {code, data} = res.data;

        if (code === 200) {

            function deep(node) {
                node.map(item => {
                    item.value = item.name;
                    item.defaultValue = item.name;
                    item.key = item._id;
                    item.isEditable = false;
                    item.children && deep(item.children);

                    return true
                });
            }

            deep(data);

            dispatch({
                type: types.GET_FOLD_SUCCESS,
                payload: data
            });

            onSuccess(data)
        }
    }
}

/**
 * 添加目录
 * @param parentId
 * @param name
 * @param onSuccess
 * @returns {Function}
 */
export function addFold({parentId, name, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            parentId,
            name
        };

        let res = await api.uploadInterface.addFold(reqBody);
        if (!res) return;
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
            message.info(msg)
        }
    }
}

/**
 * 修改目录
 * @param _id
 * @param name
 * @param onSuccess
 * @returns {Function}
 */
export function alterFold({_id, name, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            _id,
            name
        };

        let res = await api.uploadInterface.alterFold(reqBody);
        if (!res) return;
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
            message.info(msg)
        }
    }
}

/**
 * 删除目录
 * @param _id
 * @param onSuccess
 * @returns {Function}
 */
export function deleteFold({_id, onSuccess}) {
    return async dispatch => {
        let reqBody = {
            _id,
        };

        let res = await api.uploadInterface.deleteFold(reqBody);
        if (!res) return;
        let {code, msg} = res.data;

        if (code === 200) {
            onSuccess();
        }

        message.info(msg)
    }
}

/**
 * 获取上传列表
 * @param foldId
 * @param current_page
 * @param page_size
 * @returns {Function}
 */
export function getUploadList({foldId, current_page, page_size}) {
    return async dispatch => {
        let reqBody = {
            id: foldId,
            current_page,
            page_size,
        };

        let res = await api.uploadInterface.getUploadList(reqBody);
        if (!res) return;
        let {code, data = {}} = res.data;

        if (code === 200) {
            dispatch({
                type: types.UPLOAD_LIST_SUCCESS,
                payload: data
            })
        }
    }
}

/**
 * 修改上传文件目录
 * @param fold_id
 * @param _id
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function alterUpload({fold_id, _id, onSuccess}) {
    return async dispatch => {
        let res = await api.uploadInterface.alterUpload({fold_id, _id});
        if (!res) return;
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

        return message.info(msg)
    }
}

/**
 * 删除上传文件
 * @param _id
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function deleteUpload({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.uploadInterface.deleteUploadById({_id});
        if (!res) return;
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

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
