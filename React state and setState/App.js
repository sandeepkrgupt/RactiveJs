import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Carcomp from './carcompany';

class App extends Component {
  render() {
    return (
      <section>
      <div>   
        This is Main Component      
      </div>
      <div>
        <Carcomp />
      </div>
      </section>
    );
  }
}

export default App;
