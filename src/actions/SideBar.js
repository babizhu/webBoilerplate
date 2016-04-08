/**
 * Created by liu_k on 2016/4/1.
 * 当屏幕宽度发生改变时，调用此action通知整个系统
 */
export const CHANGE_SHOW_MODE = 'CHANGE_SHOW_MODE';
export const CHANGE_OPEN_STATUS = 'CHANGE_OPEN_STATUS';
export const NORMAL = 'NORMAL';
export const MINI = 'MINI';


/**
 * 改变sideBar的显示模式，只有两个选项
 * NORMAL
 * MINI
 * @returns {{type: string, showMode: *}}
 */
export function changeShowMode( ){

    return{
        type:CHANGE_SHOW_MODE

    }
}
export function changeOpenStatus( index ){
    return{
        type:CHANGE_OPEN_STATUS,
        index
    }
}
