import React from 'react'
//noinspection JSUnresolvedVariable
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import C1 from './containers/C1'
import C2 from './containers/C2'
import C from './containers/C'
import Test from './containers/Test'
import Cluster from './containers/cluster/Cluster'
import ClusterDetail from './containers/cluster/ClusterDetail'
import DashBoard from './containers/DashBoard'
// import ClusterList from './components/Cluster/ClusterList'
import HadoopFile from './containers/HadoopFile'

/**
 * 检测用户是否登录
 * @param next
 * @param replace
 * @param callback
 */
function validateLogin(next, replace, callback) {
    const isLoggedIn = true;
    // const isLoggedIn = !!getCookie('uid')
    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

export default (
    <Route path="/" onEnter={validateLogin}>
        <Route component={App}>
            <IndexRoute component={DashBoard} breadcrumbName="中控台"/>
            <Route path="/test" component={Test} breadcrumbName="测试模块"/>
            <Route path="/cluster" component={Cluster} breadcrumbName="集群列表">
                <Route path=":name" component={ClusterDetail} breadcrumbName=":name"/>
            </Route>
            <Route path="/dashBoard" breadcrumbName="中控台" component={DashBoard}/>
            <Route path="/c" component={C} breadcrumbName="性能指标">
                <Route path="/c/c1" component={C1} breadcrumbName="C1"/>
                <Route path="/c/c2" component={C2} breadcrumbName="C2"/>
            </Route>
            <Route path="/hadoopFile" breadcrumbName="hadoop" component={HadoopFile}/>

        </Route>
        <Route path="*" component={NotFound} breadcrumbName="404 Error"/>
    </Route>
)
