/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/24 16:19
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/24 16:19
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    TAG_LIST_SUCCESS: 'tag_list/TAG_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'tag_list/SET_STORE_SUCCESS',
    ADD_TAGS_SUCCESS: 'tag_list/ADD_TAGS_SUCCESS',
    ALTER_TAGS_SUCCESS: 'tag_list/ALTER_TAGS_SUCCESS'
};

const initState = {
    tag_list: [],
    total_count: 0,
    current_page: 1,
    page_size: 4,
};

export function tags_list(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list,
                total_count: action.payload.tags_total
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
 * 获取标签列表
 * @returns {Function}
 */
export function getTagsList({current_page, page_size}) {
    let tag_list = [];

    return async dispatch => {
        let reqBody = {
            current_page,
            page_size,
        };
        let res = await api.tagsInterface.getTagsList(reqBody);
        if (!res) return;
        let {article_num_list = [], tags_list = [], tags_total} = res.data.data;

        tags_list.forEach(item => {
            let temp = article_num_list.find(i => i._id === item._id);
            item.tags_article_num = temp == null ? 0 : temp.count;
        });

        tag_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);

        dispatch({
            type: types.TAG_LIST_SUCCESS,
            payload: {tag_list, tags_total}
        })
    }
}

/**
 * 删除标签
 * @param _id
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function deleteTags({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.tagsInterface.deleteTagsById({_id});
        if (!res) return;
        let {code, msg} = res.data;
        if (code === 200) {
            onSuccess()
        }

        return message.info(msg)
    }
}

/**
 * 添加标签
 * @param tags_name
 * @param tags_desc
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function addTags({tags_name, tags_desc, onSuccess}) {
    return async dispatch => {
        let res = await api.tagsInterface.addTags({
            tags_name,
            tags_desc
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
 * 修改标签
 * @param _id
 * @param tags_name
 * @param tags_desc
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function alterTags({_id, tags_name, tags_desc, onSuccess}) {
    return async dispatch => {
        let res = await api.tagsInterface.alterTags({
            _id,
            tags_name,
            tags_desc
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
