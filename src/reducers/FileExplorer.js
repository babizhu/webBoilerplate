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
//const initState={
//    data:'{"FileStatuses":{"FileStatus":[
//{"accessTime":0,"blockSize":0,"childrenNum":6,"fileId":16392,"group":"supergroup","length":0,"modificationTime":1458543698158,"owner":"hadoop","pathSuffix":"input","permission":"755","replication":0,"storagePolicy":0,"type":"DIRECTORY"},
//{"accessTime":0,"blockSize":0,"childrenNum":8,"fileId":16412,"group":"supergroup","length":0,"modificationTime":1457593033695,"owner":"hadoop","pathSuffix":"output","permission":"755","replication":0,"storagePolicy":0,"type":"DIRECTORY"},
//{"accessTime":0,"blockSize":0,"childrenNum":2,"fileId":16386,"group":"supergroup","length":0,"modificationTime":1453911076738,"owner":"hadoop","pathSuffix":"tmp","permission":"770","replication":0,"storagePolicy":0,"type":"DIRECTORY"},
//{"accessTime":0,"blockSize":0,"childrenNum":1,"fileId":16889,"group":"supergroup","length":0,"modificationTime":1456197544321,"owner":"hadoop","pathSuffix":"user","permission":"755","replication":0,"storagePolicy":0,"type":"DIRECTORY"}
//]}}'
//};

export default function fileList(state = {}, action = {}) {
    switch (action.type) {
        case SHOW_FILE_LIST_PENDING:
            return Object.assign({}, state, {pending: true});
        case SHOW_FILE_LIST_SUCCESS:
            return Object.assign({}, state, {data: action.payload, pending: false});
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