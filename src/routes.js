import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import C1 from './containers/C1'
import C from './containers/C'
import C2 from './containers/C2'


export default (
    <Route path="/" component={App}>


        <Route path="/c" component={C}>
            <Route path="/c/c1" component={C1}/>
            <Route path="/c/c2" component={C2}/>
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
)
