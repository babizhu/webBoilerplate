/**
 * Created by liu_k on 2016/3/29.
 * 用户的个人信息,一般登录时加载
 */
import { combineReducers } from 'redux'

import {EDIT_NAME} from '../actions/Profile'

const initState = {
    name: '刘呦呦',
    iconUrl:'/img/lyy.jpg',
    address:'重庆市 南岸区',
    components:'c,c/c1,flex,test'//用户拥有的权限组件的路径

};
function profile(state = initState, action) {
    switch (action.type) {
        case EDIT_NAME:
            return Object.assign({}, state, {name: action.name});
    }
    return state;
}
//const profileReducer = combineReducers({
//    profile
//
//});

export default profile