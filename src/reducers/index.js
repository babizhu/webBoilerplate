import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    routing
});

export default rootReducer
