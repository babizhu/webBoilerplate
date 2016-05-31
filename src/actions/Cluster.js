/**
 * Created by liu_k on 2016/4/14.
 * hadoop文件浏览器的action
 */

import api from '../api/index';

//查询集群列表的信息
export const CLUSTER_LIST_QUERY = 'CLUSTER_LIST_QUERY';
export const CLUSTER_LIST_QUERY_PENDING = 'CLUSTER_LIST_QUERY_PENDING';
export const CLUSTER_LIST_QUERY_SUCCESS = 'CLUSTER_LIST_QUERY_SUCCESS';
export const CLUSTER_LIST_QUERY_ERROR = 'CLUSTER_LIST_QUERY_ERROR';

//查询某个集群内所有节点的信息，包括ganglia收集的
export const CLUSTER_NODES_QUERY = 'CLUSTER_NODES_QUERY';
export const CLUSTER_NODES_QUERY_PENDING = 'CLUSTER_NODES_QUERY_PENDING';
export const CLUSTER_NODES_QUERY_SUCCESS = 'CLUSTER_NODES_QUERY_SUCCESS';
export const CLUSTER_NODES_QUERY_ERROR = 'CLUSTER_NODES_QUERY_ERROR';


export const CLUSTER_LIST_OPERATION = 'CLUSTER_LIST_OPERATION';
export const CLUSTER_LIST_OPERATION_PENDING = 'CLUSTER_LIST_OPERATION_PENDING';
export const CLUSTER_LIST_OPERATION_SUCCESS = 'CLUSTER_LIST_OPERATION_SUCCESS';
export const CLUSTER_LIST_OPERATION_ERROR = 'CLUSTER_LIST_OPERATION_ERROR';

export const OPEN_CLUSTER_MODAL = 'OPEN_CLUSTER_MODAL';

/**
 * 获取集群内所有节点的信息
 * @param clusterId 集群id
 */
export function getClusterNodes(clusterId) {
    return {
        type: CLUSTER_NODES_QUERY,
        meta: {
            clusterId
        },
        payload: {
            promise: api.get('cluster/clusterSummaryInfo', {
                params: {
                    clusterId
                }
            })
        }
    }
}

/**
 * 获取集群的列表信息
 * @param cnd               查询条件
 * @param pageNumber        当前页数
 * @param pageSize          每页的记录数量
 *
 */
export function getClustersList(cnd = null, pageNumber = 0, pageSize = 20) {
    return {
        type: CLUSTER_LIST_QUERY,
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
 * 增删改 统一到这里处理
 * 增和改统一到一个操作中处理
 * @param op            操作类型1:增 改 2:、删除
 * @param cluster       当前要操作的集群
 */
export function clusterListOperation(op, cluster) {
    return {
        type: CLUSTER_LIST_OPERATION,
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
 *  * 增和改统一到一个对话框中处理

 * @param modal         对话框类型   1:增 改 2:删除
 */
export function openClusterModal(modal) {
    return {
        type: OPEN_CLUSTER_MODAL,
        modal
    }
}