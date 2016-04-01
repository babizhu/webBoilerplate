import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import profile from './Profile'
import screen from './Screen'

function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    profile,
    screen,
    routing
});

export default rootReducer
