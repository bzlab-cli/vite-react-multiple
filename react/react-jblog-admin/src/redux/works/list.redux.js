/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/4 15:57
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/4 15:57
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    TAG_LIST_SUCCESS: 'works_list/TAG_LIST_SUCCESS',
    WORKS_LIST_SUCCESS: 'works_list/WORKS_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'works_list/SET_STORE_SUCCESS'
};

const initState = {
    tag_list: [],
    keyword: '',
    tag: '',
    state: '',
    state_list: [{
        name: '所有',
        value: ''
    }, {
        name: '发布',
        value: 1
    }, {
        name: '草稿',
        value: 0
    }],
    total_count: 0,
    current_page: 1,
    page_size: 10,
    loading: false,
    works_list: []
};

/**
 * action处理
 * @param state
 * @param action
 * @return {{tag_list: Array, keyword: string, tag: string, state: string, state_list: *[], total_count: number, current_page: number, page_size: number, loading: boolean, article_list: Array}}
 */
export function works_list(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.WORKS_LIST_SUCCESS:
            return {
                ...state,
                works_list: action.payload.list,
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
 * 获取标签列表
 * @returns {Function}
 */
export function getTagsList() {
    let tag_list = [];

    return async dispatch => {
        let res = await api.tagsInterface.getTagsList();
        if (!res) return;
        let {article_num_list = [], tags_list = []} = res.data.data;

        tags_list.forEach(item => {
            let temp = article_num_list.find(i => i._id === item._id);
            item.tags_article_num = temp == null ? 0 : temp.count;
        });

        tag_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);
        tag_list = tags_list;
        tag_list.unshift({
            tags_name: '所有',
            _id: ''
        });

        dispatch({
            type: types.TAG_LIST_SUCCESS,
            payload: {tag_list}
        })
    }
}

/**
 * 获取文章列表
 * @param keyword
 * @param tag
 * @param state
 * @param current_page
 * @param page_size
 * @returns {Function}
 */
export function getWorksList({keyword, tag, state, current_page, page_size}) {
    return async dispatch => {
        let reqBody = {
            keyword,
            tag,
            state,
            current_page,
            page_size,
        };

        let res = await api.worksInterface.getWorksList(reqBody);
        if (!res) return;
        let {code, data = {}} = res.data;
        if (code === 200) {
            dispatch({
                type: types.WORKS_LIST_SUCCESS,
                payload: data
            })
        }
    }
}

/**
 * 删除文章
 * @param _id
 * @param onSuccess
 * @returns {function(*): MessageType}
 */
export function deleteWorks({_id, onSuccess}) {
    return async dispatch => {
        let res = await api.worksInterface.deleteWorksById({_id});
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
