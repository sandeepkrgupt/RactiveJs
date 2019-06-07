import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { updateUser } from './actions/users-action';

class  App extends Component{
    constructor(props) {
        super(props);
        this.onUpdateUserHandler = this.onUpdateUserHandler.bind(this);
    }
    onUpdateUserHandler() {
        console.log('dfgdfg', this.props);
        this.props.onUpdateUserHandler('sanp');
    }
    render() {
        console.log('====>',this.props);
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
              <div onClick={this.onUpdateUserHandler}>Update User</div>
                  {this.props.user}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.products,
        user:state.user
    };
}
const mapActionToProps = {
    onUpdateUserHandler: updateUser
}
export default  connect(mapStateToProps, mapActionToProps)(App);
