import React, { useContext } from 'react';
import CarCatalog from '../components/car-catalog/CarCatalog';
import Home from '../components/home/Home';
import SignUp from '../components/authentication/sign-up/SignUp';
import SignIn from '../components/authentication/sign-in/SignIn';
import PageNotFound from '../components/page-not-found/PageNotFound';
import { IsUserLoggedInContext } from '../contexts/IsUserLoggedIn';
import MyAppBar from '../components/my-app-bar/MyAppBar';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';

const Routes = () => {
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);

  const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
    if (!Component) return null;
    return (
      <Route
        {...rest}
        render={props =>
          isUserLoggedIn ? <Component {...props} /> : <Redirect to='/signin' />
        }
      />
    );
  };

  return (
    <BrowserRouter>
      <MyAppBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <PrivateRoute exact path='/catalog' component={CarCatalog} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
