import React from 'react';
import App from './components/app';
import Funcionarios from './components/users';
import Departamentos from './components/departament';
import Transition from './components/transition';
import Manager from './components/manager';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

class PrivateRoute extends React.Component {
    state = {
      loaded: false,
      isAuthenticated: true,
    }
    
    render() {
      const { children , component: Component, ...rest } = this.props
      const { loaded , isAuthenticated} = this.state
      if (!loaded) return null
      return (
        <Route
          {...rest}
          render={props => {
            return isAuthenticated ? (
              <Component {...props}></Component>
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            )
          }}
        />
      )
    }
  }
  PrivateRoute = withRouter(PrivateRoute)
 
  const Routes = () => (
    <Router>
      <Switch>
        <App>
          <Route path="/funcionarios" component={Funcionarios}/>
          <Route path="/departamentos" component={Departamentos}/>
          <Route path="/transitions" component={Transition}/>
          <Route path="/manager" component={Manager}/>
        </App>
      </Switch>
    </Router>
  )
  export default Routes
