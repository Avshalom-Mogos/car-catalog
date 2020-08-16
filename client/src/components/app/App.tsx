import React from 'react';
import MyAppBar from '../my-app-bar/MyAppBar';
import CarCatalog from '../car-catalog/CarCatalog';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from '../home/Home';

const App = () => {
  return (
    <div data-testid='app'>
      <BrowserRouter>
        <MyAppBar />
        <Container maxWidth='md'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/catalog' component={CarCatalog} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
};
export default App;
