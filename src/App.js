import React from 'react';
import {Button,Navbar, NavbarBrand } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
    <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Start</NavbarBrand>
          </div>
    </Navbar>
    <Button color="danger">Danger!</Button>
    </div>
  );
}

export default App;
