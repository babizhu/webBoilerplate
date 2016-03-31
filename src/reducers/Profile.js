/**
 * Created by liu_k on 2016/3/29.
 */
import { combineReducers } from 'redux'

import {EDIT_NAME} from '../actions/Profile'

const initState = {
    name: '刘呦呦',
    iconUrl:'/img/face11.jpg',
    address:'重庆市 南岸区'

}
function profile(state = initState, action) {
    switch (action.type) {
        case EDIT_NAME:
            return Object.assign({}, state, {name: action.name});
    }
    return state;
}
const profileReducer = combineReducers({
    profile

});

export default profile