/**
 * Created by liu_k on 2016/4/1.
 * 当屏幕宽度发生改变时，调用此action通知整个系统
 */
export const CHANGE_SHOW_MODE = 'CHANGE_SHOW_MODE';
export const CHANGE_OPEN_STATUS = 'CHANGE_OPEN_STATUS';
export const NORMAL = 'NORMAL';
export const MINI = 'MINI';


export function changeShowMode( showMode ){

    return{
        type:CHANGE_SHOW_MODE,
        showMode
    }
}
export function changeOpenStatus( index ){
    return{
        type:CHANGE_OPEN_STATUS,
        index
    }
}
