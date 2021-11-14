import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import About from './pages/About'
import Home from './pages/Home.js'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import DetailClassroom from './detailClassroom'
import ListUsers from './listUsers/ListUsers'

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/classrooms/:id" component={DetailClassroom} />
          <ProtectedRoute exact path="/classrooms/:id/list-users" component={ListUsers} />

          <Route path="/about" component={About} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
