import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import C1 from './containers/C1'
import C2 from './containers/C2'
import C from './containers/C'
import Test from './containers/Test'
import Cluster from './containers/Cluster'
import DashBoard from './containers/DashBoard'
import FileExplorer from './containers/FileExplorer'



export default (
    <Route path="/" component={App} breadcrumbName="首页">
        <Route path="/test" component={Test} breadcrumbName="测试模块"/>
        <Route path="/cluster" breadcrumbName="集群列表" component={Cluster}/>
        <Route path="/fileExplorer" breadcrumbName="文件管理" component={FileExplorer}/>
        <Route path="/dashBoard" breadcrumbName="中控台" component={DashBoard}/>
        <Route path="/c" component={C} breadcrumbName="性能指标">
            <Route path="/c/c1" component={C1}  breadcrumbName="C1"/>
            <Route path="/c/c2" component={C2}  breadcrumbName="C2"/>
        </Route>
        <Route path="*" component={NotFound} breadcrumbName="404 Error"/>
    </Route>
)
