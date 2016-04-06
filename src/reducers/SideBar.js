/**
 * Created by liu_k on 2016/4/1.
 * sideBar的原始数据
 */
import { combineReducers } from 'redux'

import {CHANGE_OPEN_STATUS,CHANGE_SHOW_MODE,NORMAL,MINI} from '../actions/SideBar'

function showMode( state=NORMAL, action ){
    switch (action.type) {
        case CHANGE_SHOW_MODE:
            return action.showMode;
    }
    return state;
}

function openMenu( state=[], action ){
    switch (action.type) {
        case CHANGE_OPEN_STATUS:
            if( state.indexOf(action.index) != -1 ){
                let resultState = [];
                for( const i of state){
                    if( i !== action.index ){
                        resultState.push(i);

                    }
                }
                return resultState;
            }else{
                return [
                    ...state,
                    action.index
                ]
            }
    }
    return state;
}
//function sideBar(state = initState, action) {
//    switch (action.type) {
//        case CHANGE_SHOW_MODE:
//            return {showMode: action.showMode};
//        case CHANGE_OPEN_STATUS:
//            if()
//    }
//    return state;
//}
const sideBar = combineReducers({
    showMode,
    openMenu
});
export default sideBar