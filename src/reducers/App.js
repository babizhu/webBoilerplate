/**
 * Created by liu_k on 2016/4/14.
 * reducer
 */


import { combineReducers } from 'redux'

import {getErrMsg} from '../const/ErrorText';

import {
    SHOW_ERROR_MSG,RESET_ERROR_MSG
} from '../actions/App'


function errMsg(state = '', action = {}) {
    switch (action.type) {
        case SHOW_ERROR_MSG:
            return getErrMsg(action.errId,action.args);
        case RESET_ERROR_MSG:
            return '';
        default:
            return state;
    }
}

const app = combineReducers({
    errMsg
});
export default app