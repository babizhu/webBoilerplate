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
 * 显示path下的文件信息
 * @param path
 * @returns {{type: string, payload: {promise: *}}}
 */


export function showFileList(path) {
    return {
        type: SHOW_FILE_LIST,
        payload: {
            promise: api.get(path, {
                data: {
                    path
                }
            })
        }
    }
}