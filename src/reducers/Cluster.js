/**
 * Created by liu_k on 2016/4/14.
 * reducer
 */


import { combineReducers } from 'redux'

import {getErrMsg} from '../const/ErrorText';

import {
    CLUSTER_QUERY ,
    CLUSTER_QUERY_PENDING ,
    CLUSTER_QUERY_SUCCESS,
    CLUSTER_QUERY_ERROR,
    CLUSTER_OPERATION,
    CLUSTER_OPERATION_PENDING,
    CLUSTER_OPERATION_SUCCESS,
    CLUSTER_OPERATION_ERROR,
    OPEN_CLUSTER_MODAL
} from '../actions/Cluster'


const initState = {
    pending: false,
    data: [],
    pager: {}
};
function clusterList(state = initState, action = {}) {
    switch (action.type) {
        case CLUSTER_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_QUERY_SUCCESS:
            return {
                ...state,
                data: action.payload.list,
                pager: action.payload.page,
                pending: false,
                error: null
            };
        case CLUSTER_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CLUSTER_OPERATION_SUCCESS:
            //console.log('CLUSTER_OPERATION_SUCCESS 之后' + JSON.stringify(action.payload));
            //console.log(updateClusterState(state.data, action.payload));
            return {
                ...state,
                data:updateClusterState(state.data, action.payload.data,action.meta.op === 2)
            };
        default:
            return state;
    }

}
const initNodesState = {
    pending: false,
    data: [],
    pager: {}
};
function clusterNodesList( state = initNodesState, action={}){
    return state;
}
const initServiceState = {
    pending: false,
    data: []
};
function clusterServiceList( state = initServiceState, action={}){
    return state;
}

const initConfigState = {
    pending: false,
    alertMemThresHold:59,
    alertCpuThresHold:59,
    alertDiskThresHold:59,
    alertMailTo:'185938@qq.com',
    alertMsgTo:'18696590403',
    interVal:100,//轮询间隔，单位秒
    contactPhone:'18696590403'//紧急联系人
};
function clusterConfig( state = initConfigState, action={}){
    return state;
}

const initChartsState = {
    pending: false,
    cpu:{},
    mem:{},
    disk:{},
    network:{}
};
function clusterCharts( state = initChartsState, action={}){
    return state;
}

/**
 * 根据增删改操作的返回结果更新客户端内存的业务数据
 * @param initData      原始内容
 * @param changeData    变化的数据
 * @param isDelete      是否删除操作导致的变化
 * @returns {Array}
 */
function updateClusterState(initData, changeData,isDelete) {
    //console.log('是否删除？ ' + isDelete);
    if (!changeData) {
        return;
    }
    let result = [];
    let isExist = false;
    for (const cluster of initData) {
        if (cluster.id === changeData.id) {//更新或者删除
            if (!isDelete) {//更新

                result.push({...cluster,...changeData});
            }
            isExist = true;//找到了此cluster
        } else {
            result.push(cluster);
        }
    }
    if (!isExist) {//新增
        result.unshift(changeData);
    }
    //const index = initData.findIndex((cluster)=>cluster.id == newData.id);
    //if (index == -1) {//新增
    //
    //}
    return result;

}
const operationInitState = {
    currentOpenModal: -1,
    pending: false,
    error: null
};
function operationData(state = operationInitState, action) {
    switch (action.type) {
        case OPEN_CLUSTER_MODAL:
            return {
                ...state,
                currentOpenModal: state.currentOpenModal == action.modal ? -1 : action.modal
            };
        case CLUSTER_OPERATION_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_OPERATION_SUCCESS:
            return {
                ...state,
                currentOpenModal: -1,
                pending: false,
                error: null
            };
        case CLUSTER_OPERATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const cluster = combineReducers({
    operationData,
    clusterList,
    clusterNodesList,
    clusterCharts,
    clusterServiceList,
    clusterConfig
});
export default cluster;