/**
 * Created by liu_k on 2016/4/14.
 * hadoop文件浏览器的action
 */

import api from '../api/index';

export const SHOW_FILE_LIST = 'SHOW_FILE_LIST';
export const SHOW_FILE_LIST_PENDING = 'SHOW_FILE_LIST_PENDING';
export const SHOW_FILE_LIST_SUCCESS = 'SHOW_FILE_LIST_SUCCESS';
export const SHOW_FILE_LIST_ERROR = 'SHOW_FILE_LIST_ERROR';

export const OPERATION = 'OPERATION';
export const OPERATION_PENDING = 'OPERATION_PENDING';
export const OPERATION_SUCCESS = 'OPERATION_SUCCESS';
export const OPERATION_ERROR = 'OPERATION_ERROR';

/**
 * 获取path下的文件或者文件夹信息，如果path是一个文件则获取文件的具体内容
 * @param path) {
    return {
        type
 * @returns {{type: string, payload: {promise: *}}}
 */


export function getFilesData(path,readAsText=true,block=0) {
    return {
        type: SHOW_FILE_LIST,
        meta:{
            path,
            noSysErrMsg:false,//设置此标志不弹出系统错误对话框,网络错误不包含在内,如果有需要也可根据情况调整promiseMiddleware.js
            readAsText//显示文件内容专用
        },
        payload: {
            promise: api.get('hadoop/getFilesData', {
                params: {
                    path,
                    readAsText,
                    block
                }
            })
        }
    }
}

/**
 * 文件操作（改名，删除，上传新文件等）统一到这里处理，免得出现太多乱七八糟的东西？
 * @param op            操作类型1、改名 2、删除 3、新建目录
 * @param path          当前要操作的路径
 *
 * @param args          1、改名                新的文件名
 *                      2、删除                无参数（需要支持删除目录吗？）
 *                      3、新建目录            新建目录的名字
 *
 * @returns {{type: string, meta: {path: *, noSysErrMsg: boolean, readAsText: boolean}, payload: {promise: *}}}
 */
export function operation(op,path,args) {
    return {
        type: OPERATION,
        meta:{
            //path,
        },
        payload: {
            promise: api.get('hadoop/operation', {
                params: {
                    op,
                    path,
                    args
                }
            })
        }
    }
}