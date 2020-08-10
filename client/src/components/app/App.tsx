import React from 'react';
import Catalog from '../catalog/Catalog';
import SearchAppBar from '../search-app-bar/SearchAppBar';
import './App.css';

const App = () => {
    return (
        <>
            <SearchAppBar />
            <Catalog />
        </>
    );
};
export default App;
