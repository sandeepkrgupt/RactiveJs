import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { updateUser } from './actions/users-action';
import {apiRequest} from './actions/users-action';
import {bindActionCreators} from 'redux';

class  App extends Component{
    constructor(props) {
        super(props);
        this.onUpdateUserHandler = this.onUpdateUserHandler.bind(this);
    }
    
    componentDidMount() {
        this.props.onApiRequest();
    }
    onUpdateUserHandler(event) {
        this.props.onUpdateUserHandler(event.target.value);
    }
    render() {
        return (
            <div className="App">
                <h1>Dynamic State Update on Change In Redux</h1>
                <hr/>
                <input  onChange={this.onUpdateUserHandler}/>
                <h1>{this.props.user}</h1>
                <p>{this.props.products[0].name}</p>
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        products: state.products,
        user:state.user,
        userPlusProps:`${state.user}  ${props.aRandomProps}`
    }
};
const mapActionToProps = {
    onUpdateUserHandler: updateUser,
    onApiRequest: apiRequest
};

export default  connect(mapStateToProps, mapActionToProps)(App);
