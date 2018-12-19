import React, { Component } from 'react';
import { Navbar, Container } from './components';
import './App.css';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Container/>
      </React.Fragment>
    );
  }
}

export default App;
