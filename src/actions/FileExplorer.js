/**
 * Created by liu_k on 2016/4/14.
 * hadoop文件浏览器的action
 */

import api from '../api/index';

export const SHOW_FILE_LIST = 'SHOW_FILE_LIST';
export const SHOW_FILE_LIST_PENDING = 'SHOW_FILE_LIST_PENDING';
export const SHOW_FILE_LIST_SUCCESS = 'SHOW_FILE_LIST_SUCCESS';
export const SHOW_FILE_LIST_ERROR = 'SHOW_FILE_LIST_ERROR';
/**
 * 获取path下的文件或者文件夹信息，如果path是一个文件则获取文件的具体内容
 * @param path) {
    return {
        type
 * @returns {{type: string, payload: {promise: *}}}
 */


export function getFilesData(path,readAsText=true,block=0) {
    //console.log('path=' + path);
    return {
        type: SHOW_FILE_LIST,
        meta:{
            path,
            noSysErrMsg:false//设置此标志不弹出系统错误对话框,网络错误不包含在内,如果有需要也可根据情况调整promiseMiddleware.js
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