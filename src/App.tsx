import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import routes from './routes'
import Home from './app/pages/Home'

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} component={route.component} />
          ))}
        </Switch>
      </div>
    </Router>
  )
}

export default App
