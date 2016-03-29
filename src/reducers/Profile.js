/**
 * Created by liu_k on 2016/3/29.
 */
import { combineReducers } from 'redux'

const initState = {
    name: '刘老爷'
}
function profile(state = initState, action) {
    return state;
}
const profileReducer = combineReducers({
    profile

});

export default profile