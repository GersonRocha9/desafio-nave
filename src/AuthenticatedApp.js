import Drawer from 'components/Drawer'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from 'routes/Dashboard'
import Home from 'routes/Home'
import UserForm from 'routes/UserForm'
import UsersList from 'routes/UsersList'

const AuthenticatedApp = () => (
  <Drawer>
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route exact path='/usuarios' component={UsersList} />
      <Route exact path={['/usuarios/criar', '/usuarios/:id']} component={UserForm} />
      <Redirect to='/home' />
    </Switch>
  </Drawer>
)

export default AuthenticatedApp
