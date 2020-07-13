import React from 'react';
import {Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/Menu';
import {DISHES} from './shared/dishes';
import './App.css';

function App() {
  return (
    <div>
    <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Navigation Bar</NavbarBrand>
          </div>
    </Navbar>
    <Menu dishes={DISHES} />
    </div>

  );
}

export default App;
