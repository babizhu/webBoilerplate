/**
 * Created by liu_k on 2016/4/1.
 * 获取当前屏幕的宽度和高度
 */
import { combineReducers } from 'redux'

import {CHANGE_SCREEN_SIZE} from '../actions/Screen'

const initState = {
    isBigScreen: true,
    width:0,
    height:0
};

function screen(state = initState, action) {
    switch (action.type) {
        case CHANGE_SCREEN_SIZE:
            return {
                width:action.width,
                height:action.height,
                isBigScreen:action.width > 768
            };
    }
    return state;
}

export default screen;