/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:53
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:53
 */

import api from '@/api/server';
import {message} from 'antd';

export const types = {
    TAG_LIST_SUCCESS: 'works_edit/TAG_LIST_SUCCESS',
    SET_STORE_SUCCESS: 'works_edit/SET_STORE_SUCCESS',
    GET_WORKS_SUCCESS: 'works_edit/GET_WORKS_SUCCESS',
    ALTER_WORKS_SUCCESS: 'works_edit/ALTER_WORKS_SUCCESS',
};

const initState = {
    title: '',
    tag_list: [],
    state: 1,
    state_list: [{
        name: '发布',
        value: 1
    }, {
        name: '草稿',
        value: 0
    }],
    cover: '',
    desc: '',
    create_time: '',
    update_time: '',
    content: '',
    navigation: [],
    selectedTags: [],
};

export function works_edit(state = initState, action) {
    switch (action.type) {
        case types.TAG_LIST_SUCCESS:
            return {
                ...state,
                tag_list: action.payload.tag_list
            };
        case types.SET_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case types.GET_WORKS_SUCCESS:
            let payload = action.payload;
            let selectedTags = [];

            if (payload.works_tags.length) {
                payload.works_tags.map(item => selectedTags.push(item._id))
            }

            return {
                ...state,
                title: payload.works_title,
                state: payload.works_state,
                cover: payload.works_cover,
                desc: payload.works_desc,
                create_time: payload.create_time,
                update_time: payload.update_time,
                content: payload.works_content,
                selectedTags: selectedTags
            };
        case types.ALTER_WORKS_SUCCESS:
            return {};
        default:
            return state
    }
}

/**
 * 获取标签列表
 * @returns {Function}
 */
export function getTagsList() {
    return async dispatch => {
        let res = await api.tagsInterface.getTagsList();
        if (!res) return;
        let {article_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
            item.checked = false;
            let temp = article_num_list.find(i => {
                return i._id === item._id;
            });
            item.tags_article_num = temp == null ? 0 : temp.count;
        });

        let tag_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);

        dispatch({
            type: types.TAG_LIST_SUCCESS,
            payload: {tag_list}
        })
    }
}

/**
 * 获取作品详情
 * @param _id
 * @returns {Function}
 */
export function getWorks({_id}) {
    return async dispatch => {
        let res = await api.worksInterface.getWorksById({_id});
        if (!res) return;
        let {code, data} = res.data;

        if (code === 200 && data.length) {
            let [payload] = data;

            dispatch({
                type: types.GET_WORKS_SUCCESS,
                payload
            })
        }
    }
}

/**
 * 修改作品
 * @param _id
 * @param content
 * @param render_content
 * @param cover
 * @param desc
 * @param state
 * @param tags
 * @param title
 * @param navigation
 * @returns {function(*): MessageType}
 */
export function alterWorks({_id, content, render_content, cover, desc, state, tags, title, navigation}) {
    return async dispatch => {
        let reqBody = {
            _id,
            works_content: content,
            works_render_content: render_content,
            works_cover: cover,
            works_desc: desc,
            works_state: state,
            works_tags: tags,
            works_title: title,
            works_navigation: navigation
        };

        console.log(reqBody);

        let res = await api.worksInterface.alterWorks(reqBody);
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
