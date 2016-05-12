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
    OPEN_MODAL
} from '../actions/Cluster'


const initState = {

    pending: false,
    data: [],
    pager:{}
};
function clusterData(state = initState, action = {}) {
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
                pager:action.payload.page,
                pending: false,
                error: null
            };
        case CLUSTER_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const operationInitState = {
    currentOpenModal: -1,
    pending: false,
    error: null
};
function operationData(state = operationInitState, action) {
    switch (action.type) {
        case OPEN_MODAL:
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
    clusterData,
    operationData
});
export default cluster;