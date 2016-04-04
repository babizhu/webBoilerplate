import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import profile from './Profile'
import screen from './Screen'
import sideBar from './SideBar'

function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    profile,
    screen,
    sideBar,
    routing
});

export default rootReducer
