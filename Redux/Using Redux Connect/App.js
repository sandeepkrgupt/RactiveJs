import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { updateUser } from './actions/users-action';
import {bindActionCreators} from 'redux';

class  App extends Component{
    constructor(props) {
        super(props);
        this.onUpdateUserHandler = this.onUpdateUserHandler.bind(this);
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
              {/*this.props.products.map(arg => {
                <div>
                    <p>{arg.name}</p>
                    <p>{arg.price}</p>
                <div>
              })
              */}
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
const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onUpdateUserHandler: updateUser,
    }, dispatch);
    
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    console.log(propsFromState, propsFromDispatch, ownProps);
    return {};
};

export default  connect(mapStateToProps, mapActionToProps, mergeProps)(App);
