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

//查询某个集群内所有节点的所有信息，包括charts，clusterNodes list，service，最大最全的
export const CLUSTER_DETAIL_QUERY = 'CLUSTER_DETAIL_QUERY';
export const CLUSTER_DETAIL_QUERY_PENDING = 'CLUSTER_DETAIL_QUERY_PENDING';
export const CLUSTER_DETAIL_QUERY_SUCCESS = 'CLUSTER_DETAIL_QUERY_SUCCESS';
export const CLUSTER_DETAIL_QUERY_ERROR = 'CLUSTER_DETAIL_QUERY_ERROR';

//查询集群节点列表信息，也就是table显示用的
export const CLUSTER_NODE_LIST_QUERY = 'CLUSTER_NODE_LIST_QUERY';
export const CLUSTER_NODE_LIST_QUERY_PENDING = 'CLUSTER_NODE_LIST_QUERY_PENDING';
export const CLUSTER_NODE_LIST_QUERY_SUCCESS = 'CLUSTER_NODE_LIST_QUERY_SUCCESS';
export const CLUSTER_NODE_LIST_QUERY_ERROR = 'CLUSTER_NODE_LIST_QUERY_ERROR';

export const CLUSTER_LIST_OPERATION = 'CLUSTER_LIST_OPERATION';
export const CLUSTER_LIST_OPERATION_PENDING = 'CLUSTER_LIST_OPERATION_PENDING';
export const CLUSTER_LIST_OPERATION_SUCCESS = 'CLUSTER_LIST_OPERATION_SUCCESS';
export const CLUSTER_LIST_OPERATION_ERROR = 'CLUSTER_LIST_OPERATION_ERROR';

//操作某个集群的nodes 列表
export const CLUSTER_NODE_LIST_OPERATION = 'CLUSTER_NODE_LIST_OPERATION';
export const CLUSTER_NODE_LIST_OPERATION_PENDING = 'CLUSTER_NODE_LIST_OPERATION_PENDING';
export const CLUSTER_NODE_LIST_OPERATION_SUCCESS = 'CLUSTER_NODE_LIST_OPERATION_SUCCESS';
export const CLUSTER_NODE_LIST_OPERATION_ERROR = 'CLUSTER_NODE_LIST_OPERATION_ERROR';

//本地搜索集群中的节点
export const CLUSTER_NODE_LIST_SEARCH = 'CLUSTER_NODE_LIST_SEARCH';


export const OPEN_CLUSTER_MODAL = 'OPEN_CLUSTER_MODAL';

/**
 * 获取某个集群的详细的信息
 * @param clusterId 集群id
 */
export function getClusterDetail(clusterId) {
    return {
        type: CLUSTER_DETAIL_QUERY,
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
export function searchClusterNodeList(keyword) {
    return {
        type: CLUSTER_NODE_LIST_SEARCH,
        keyword
    }
}

//获取某个集群的节点列表
export function getClusterNodeList(clusterId) {
    return {
        type: CLUSTER_NODE_LIST_QUERY,
        meta: {
            clusterId
        },
        payload: {
            promise: api.get('cluster/clusterNodeList', {
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
 * 增删改 统一到这里处理
 * 增和改统一到一个操作中处理
 * @param op            操作类型1:增 改 2:、删除
 * @param clusterNode   当前要操作的节点
 */
export function clusterNodeOperation(op, clusterNode) {
    return {
        type: CLUSTER_NODE_LIST_OPERATION,
        meta: {
            op,
            clusterNode
            //path,
        },
        payload: {
            promise: api.get('clusterNode/operation', {
                params: {
                    op,
                    ...clusterNode
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