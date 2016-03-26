import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import C1 from './containers/C1'


export default (
  <Route path="/" component={App}>
      <Route path="/c" component={C1} />
  </Route>
)
