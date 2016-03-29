import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import profile from './Profile'
function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    profile,
    routing
});

export default rootReducer
