/**
 * Created by liu_k on 2016/4/1.
 * sideBar的原始数据
 */
import { combineReducers } from 'redux'

import {CHANGE_SHOW_MODE,ICON_ONLY,ICON_AND_TEXT} from '../actions/SideBar'


const initState = {
    showMode: ICON_AND_TEXT
};

function sideBar(state = initState, action) {
    switch (action.type) {
        case CHANGE_SHOW_MODE:
            return {showMode: action.showMode};
    }
    return state;
}

export default sideBar