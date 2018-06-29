import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Parent from './component/parentchild/parent';

class App extends Component {
  constructor() {
    super();
    this.state = {
        title:`React Intro`,
        Desc:`React is a front-end library developed by Facebook. 
        It is used for handling the view layer for web and mobile apps. 
        ReactJS allows us to create reusable UI components. 
        It is currently one of the most popular JavaScript libraries and has a strong foundation and large community behind it.`
    }
}
  render() {
    return (
      <div className="App">
        <Parent newsTitle={this.state.title} newsDesc={this.state.Desc}/>
      </div>
    );
  }
}

export default App;
