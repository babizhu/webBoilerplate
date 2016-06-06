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
    CLUSTER_DETAIL_QUERY_SUCCESS,
    CLUSTER_DETAIL_QUERY_ERROR,

    CLUSTER_LIST_OPERATION,
    CLUSTER_LIST_OPERATION_PENDING,
    CLUSTER_LIST_OPERATION_SUCCESS,
    CLUSTER_LIST_OPERATION_ERROR,
    OPEN_CLUSTER_MODAL,

    CLUSTER_NODE_LIST_QUERY,
    CLUSTER_NODE_LIST_QUERY_PENDING,
    CLUSTER_NODE_LIST_QUERY_SUCCESS,
    CLUSTER_NODE_LIST_QUERY_ERROR,



} from '../actions/Cluster'


const initClusterListState = {
    pending: false,
    data: [],
    pager: {}
};
/**
 * 获取所有集群列表
 */
function clusterList(state = initClusterListState, action) {
    switch (action.type) {

        case CLUSTER_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_LIST_QUERY_SUCCESS:
            //let clusters = {};
            //for (const cluster of action.payload.list) {
            //    clusterList[cluster.id] = cluster;
            //}
            return {
                ...state,
                data:action.payload.list,
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
function clusterNodeList(state = {}, action) {
    switch (action.type) {
        case CLUSTER_NODE_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_NODE_LIST_QUERY_SUCCESS:
            return {
                ...state,
                clusterNodeList: action.payload,
                pending: false,
                error: null
            };
        case CLUSTER_NODE_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        default:
            return state;
    }
    return state;
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

//获取某个集群的详细信息
function clusterDetailList(state = {}, action) {
    let clusterId;

    switch (action.type) {
        case CLUSTER_DETAIL_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_DETAIL_QUERY_SUCCESS:
            clusterId = action.meta.clusterId;

            return {

                ...state,
                [clusterId]: action.payload,
                pending: false,
                error: null
            };
        case CLUSTER_DETAIL_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };


        case CLUSTER_NODE_LIST_QUERY_PENDING:
        case CLUSTER_NODE_LIST_QUERY_SUCCESS:
            case CLUSTER_NODE_LIST_QUERY_ERROR:
            clusterId = action.meta.clusterId;

            return {
                ...state,
                [clusterId]: clusterNodeList(state[clusterId], action)
            }


    }
    return state;
}
//获取某个集群的节点列表
//function clusterNodeList(state, action) {
//    switch (action.type) {
//        case CLUSTER_NODE_LIST_QUERY_PENDING:
//            return {
//                ...state,
//                pending: true
//            };
//        case CLUSTER_NODE_LIST_QUERY_SUCCESS:
//            return {
//                ...state,
//                pending: false,
//                ...action.payload
//            };
//        case CLUSTER_NODE_LIST_QUERY_ERROR:
//            return {
//                ...state,
//                pending: false,
//                error: action.payload
//            };
//    }
//    return state;
//}

const clustersInfo = combineReducers({
    operationData,
    clusterList,
    clusterDetailList
    //clusterNodesInfo
    //clusterData
});
export default clustersInfo;