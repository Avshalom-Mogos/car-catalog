import React from 'react';
import Catalog from '../car-catalog/CarCatalog';
import MyAppBar from '../my-app-bar/MyAppBar';

const App = () => {
  return (
    <div data-testid='app'>
      <MyAppBar />
      <Catalog />
    </div>
  );
};
export default App;
