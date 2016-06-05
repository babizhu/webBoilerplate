import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import profile from './Profile'
import screen from './Screen'
import sideBar from './SideBar'
import hadoopFile from './HadoopFile'
import app from './App'
//import clustersInfo from './Cluster'
import clusters from './ClustersInfo'

function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    profile,
    screen,
    sideBar,
    hadoopFile,
    app,
    //clustersInfo,
    clusters,
    routing
});

export default rootReducer
