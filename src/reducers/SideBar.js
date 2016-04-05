/**
 * Created by liu_k on 2016/4/1.
 * sideBar的原始数据
 */
import { combineReducers } from 'redux'

import {CHANGE_SHOW_MODE,NORMAL,MINI} from '../actions/SideBar'


const initState = {
    showMode: NORMAL
};

function sideBar(state = initState, action) {
    switch (action.type) {
        case CHANGE_SHOW_MODE:
            return {showMode: action.showMode};
    }
    return state;
}

export default sideBar