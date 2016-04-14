/**
 * Created by liu_k on 2016/4/14.
 * reducer
 */
/**
 * Created by liu_k on 2016/3/29.
 * 用户的个人信息,一般登录时加载
 */
import {
    SHOW_FILE_LIST,
    SHOW_FILE_LIST_PENDING,
    SHOW_FILE_LIST_SUCCESS,
    SHOW_FILE_LIST_ERROR
} from '../actions/FileExplorer'

import { combineReducers } from 'redux'


export default function fileList(state = {}, action = {}) {
    switch (action.type) {
        case SHOW_FILE_LIST_PENDING:
            return Object.assign({}, state, {pending: true});
        case SHOW_FILE_LIST_SUCCESS:
            return Object.assign({}, state, {data: action.payload, pending: false, error: 'no error'});
        case SHOW_FILE_LIST_ERROR:
            return {
                ...state,
                pending: false,
                data: null,
                error: action
            };

        default:
            return state;
    }
}