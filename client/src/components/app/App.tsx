import React from 'react';
import MyAppBar from '../my-app-bar/MyAppBar';
import CarCatalog from '../car-catalog/CarCatalog';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from '../home/Home';
import SignUp from '../sign-up/SignUp';
import SignIn from '../sign-in/SignIn';

const App = () => {
  return (
    <div data-testid='app' id='app'>
      <BrowserRouter>
        <MyAppBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Container maxWidth='md'>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/catalog' component={CarCatalog} />
          </Container>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
