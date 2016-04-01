/**
 * Created by liu_k on 2016/4/1.
 * 当屏幕宽度发生改变时，调用此action通知整个系统
 */
export const CHANGE_SCREEN_TYPE = 'CHANGE_SCREEN_TYPE';

export function changeScreenType( isBigScreen ){

    return{
        type:CHANGE_SCREEN_TYPE,
        isBigScreen
    }
}
