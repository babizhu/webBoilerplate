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

    CLUSTER_ALL_QUERY,
    CLUSTER_ALL_QUERY_PENDING,
    CLUSTER_ALL_QUERY_SUCCESS,
    CLUSTER_ALL_QUERY_ERROR,

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
/**
 * 获取某个集群所有的节点列表
 */
function getClusterList(state = {}, action) {
    switch (action.type) {
        case CLUSTER_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_LIST_QUERY_SUCCESS:
            let clusters = {};
            for (const cluster of action.payload.list) {
                clusters[cluster.id] = cluster;
            }
            return {
                ...state,
                ...clusters,
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
    return state;
}
function getClusterNodeList(state = {}, action) {
    switch (action.type) {
        case CLUSTER_NODE_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case CLUSTER_NODE_LIST_QUERY_SUCCESS:

            return {
                ...state,
                clusterNodeList:action.payload.nodeList,
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
export default function clustersInfo(state = {}, action) {

    return state;
}

