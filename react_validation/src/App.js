import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.textField = React.createRef();
    this.state = {
      value : 'Enter Cool Names'
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({value : this.textField.current.value})
  }
  render() {
    return (
      <div className="App">
      <h1>React Ref</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>{this.state.value}</h3>
          <input type="text" ref={this.textField}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
