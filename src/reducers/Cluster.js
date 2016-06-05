/**
 * Created by liu_k on 2016/4/14.
 * reducer
 */


import { combineReducers } from 'redux'

import {getErrMsg} from '../const/ErrorText';

import {
    CLUSTER_LIST_QUERY ,
    CLUSTER_LIST_QUERY_PENDING ,
    CLUSTER_LIST_QUERY_SUCCESS,
    CLUSTER_LIST_QUERY_ERROR,

    CLUSTER_DETAIL_QUERY,
    CLUSTER_DETAIL_QUERY_PENDING,
    CLUSTER_DETAIL_QUERY_ERROR,
    CLUSTER_DETAIL_QUERY_SUCCESS,

    CLUSTER_LIST_OPERATION,
    CLUSTER_LIST_OPERATION_PENDING,
    CLUSTER_LIST_OPERATION_SUCCESS,
    CLUSTER_LIST_OPERATION_ERROR,
    OPEN_CLUSTER_MODAL,

    CLUSTER_NODE_LIST_QUERY,
    CLUSTER_NODE_LIST_QUERY_PENDING,
    CLUSTER_NODE_LIST_QUERY_SUCCESS,
    CLUSTER_NODE_LIST_QUERY_ERROR
} from '../actions/Cluster'


const initState = {
    pending: false,
    data: [],
    pager: {}
};

function clusterList(state = initState, action = {}) {
    switch (action.type) {
        case CLUSTER_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_LIST_QUERY_SUCCESS:
            return {
                ...state,
                data: action.payload.list,
                pager: action.payload.page,
                pending: false,
                error: null
            };
        case CLUSTER_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CLUSTER_LIST_OPERATION_SUCCESS:
            //console.log('CLUSTER_LIST_OPERATION_SUCCESS 之后' + JSON.stringify(action.payload));
            //console.log(updateClusterState(state.data, action.payload));
            return {
                ...state,
                data: updateClusterState(state.data, action.payload.data, action.meta.op === 2)
            };
        default:
            return state;
    }

}
const initNodesState = {
    pending: false
};
function clusterNodesInfo(state = initNodesState, action = {}) {
    switch (action.type) {
        case CLUSTER_DETAIL_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_DETAIL_QUERY_SUCCESS:
            return {
                ...state,
                [action.meta.clusterId]: action.payload,
                pending: false,
                error: null
            };
        case CLUSTER_NODE_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CLUSTER_NODE_LIST_QUERY_PENDING:
        case CLUSTER_NODE_LIST_QUERY_SUCCESS:
        case CLUSTER_NODE_LIST_QUERY_ERROR:

            return {
                ...state,
                [action.meta.clusterId]: getClusterNodeList(state[action.meta.clusterId], action)
            };
        default:
            return state;
    }

}

/**
 * 获取集群节点列表
 * @param state
 * @param action
 * @returns {*}
 */
function getClusterNodeList(state, action) {
    switch (action.type) {
        case CLUSTER_NODE_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_NODE_LIST_QUERY_SUCCESS:
            return {
                ...state,
                clusterNodesList: action.payload
            };
        case CLUSTER_NODE_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
    }
}
const initServiceState = {
    pending: false,
    data: []
};
function clusterServiceList(state = initServiceState, action = {}) {
    return state;
}

const initConfigState = {
    pending: false,
    alertMemThresHold: 59,
    alertCpuThresHold: 59,
    alertDiskThresHold: 59,
    alertMailTo: '185938@qq.com',
    alertMsgTo: '18696590403',
    interVal: 100,//轮询间隔，单位秒
    contactPhone: '18696590403'//紧急联系人
};
function clusterConfig(state = initConfigState, action = {}) {
    return state;
}


/**
 * 根据增删改操作的返回结果更新客户端内存的业务数据
 * @param initData      原始内容
 * @param changeData    变化的数据
 * @param isDelete      是否删除操作导致的变化
 * @returns {Array}
 */
function updateClusterState(initData, changeData, isDelete) {
    //console.log('是否删除？ ' + isDelete);
    if (!changeData) {
        return;
    }
    let result = [];
    let isExist = false;
    for (const cluster of initData) {
        if (cluster.id === changeData.id) {//更新或者删除
            if (!isDelete) {//更新

                result.push({...cluster, ...changeData});
            }
            isExist = true;//找到了此cluster
        } else {
            result.push(cluster);
        }
    }
    if (!isExist) {//新增
        result.unshift(changeData);
    }

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
        case CLUSTER_LIST_OPERATION_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_LIST_OPERATION_SUCCESS:
            return {
                ...state,
                currentOpenModal: -1,
                pending: false,
                error: null
            };
        case CLUSTER_LIST_OPERATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const cluster = {
    name: {},
    service: {},
    nodeList: [],
    charts: {
        cpu: {},
        mem: {},
        network: {},
        disk: {}
    }

};
function clusterInfo(state = {}, action) {

}
const clustersInfo = combineReducers({
    operationData,
    clusterList,
    clusterNodesInfo
    //clusterData
});
export default clustersInfo;