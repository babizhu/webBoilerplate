/**
 * Created by liu_k on 2016/4/1.
 */
import { combineReducers } from 'redux'

import {CHANGE_SCREEN_TYPE} from '../actions/Screen'

const initState = {
    isBigScreen: true
};

function screen(state = {}, action) {
    switch (action.type) {
        case CHANGE_SCREEN_TYPE:
            return {isBigScreen:action.isBigScreen};
    }
    return state;
}

export default screen;