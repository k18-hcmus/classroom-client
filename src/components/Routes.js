import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import About from './pages/About'
import Home from './pages/Home.js'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import DetailClassroom from './pages/DetailClassroom'
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
          <ProtectedRoute path="/about" component={About} />
          <ProtectedRoute path="/classrooms/:id" component={DetailClassroom} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
