/**
 * Created by liu_k on 2016/4/1.
 * 当屏幕宽度发生改变时，调用此action通知整个系统
 */
export const CHANGE_SHOW_MODE = 'CHANGE_SHOW_MODE';
export const NORMAL = 'NORMAL';
export const MINI = 'MINI';


export function changeShowMode( showMode ){

    return{
        type:CHANGE_SHOW_MODE,
        showMode
    }
}
