/**
 * Created by liu_k on 2016/4/14.
 * hadoop文件浏览器的action
 */

import api from '../api/index';

export const CLUSTER_QUERY = 'CLUSTER_QUERY';
export const CLUSTER_QUERY_PENDING = 'CLUSTER_QUERY_PENDING';
export const CLUSTER_QUERY_SUCCESS = 'CLUSTER_QUERY_SUCCESS';
export const CLUSTER_QUERY_ERROR = 'CLUSTER_QUERY_ERROR';

export const CLUSTER_OPERATION = 'CLUSTER_OPERATION';
export const CLUSTER_OPERATION_PENDING = 'CLUSTER_OPERATION_PENDING';
export const CLUSTER_OPERATION_SUCCESS = 'CLUSTER_OPERATION_SUCCESS';
export const CLUSTER_OPERATION_ERROR = 'CLUSTER_OPERATION_ERROR';

export const OPEN_CLUSTER_MODAL = 'OPEN_CLUSTER_MODAL';

/**
 * 获取集群的列表信息
 * @param cnd               查询条件
 * @param pageNumber        当前页数
 * @param pageSize          每页的记录数量
 *
 * @returns {{type: *, meta: {path: *, noSysErrMsg: boolean, readAsText: *}, payload: {promise: *}}}
 */
export function getClustersData(cnd = null, pageNumber = 0, pageSize = 20) {
    return {
        type: CLUSTER_QUERY,
        meta: {
            cnd,
            pageNumber,
            pageSize
        },
        payload: {
            promise: api.get('cluster/query', {
                params: {
                    cnd,
                    pageNumber,
                    pageSize
                }
            })
        }
    }
}

/**
 * 集群数据操作（增删改）统一到这里处理
 * @param op            操作类型1:增 2:、删除 3:改
 * @param cluster       当前要操作的集群
 * @returns {{type: string, meta: {path: *, noSysErrMsg: boolean, readAsText: boolean}, payload: {promise: *}}}
 */
export function clusterOperation(op, cluster) {
    return {
        type: CLUSTER_OPERATION,
        meta: {
            op,
            cluster
            //path,
        },
        payload: {
            promise: api.get('cluster/operation', {
                params: {
                    op,
                    ...cluster
                }
            })
        }
    }
}
/**
 * 打开某个对话框
 * @param modal         对话框类型   1:增 2:、删除 3:改
 */
export function openClusterModal(modal) {
    return {
        type: OPEN_CLUSTER_MODAL,
        modal
    }
}