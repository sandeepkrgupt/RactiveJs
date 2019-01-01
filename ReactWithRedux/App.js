import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from 'react-redux'; // to connect to our store.
class App extends Component {
	/*state = {
		  age : 21
	  }
	  
	  onAgeUp = () => {
		  this.setState({
			  ...this.state,
			  age:++this.state.age
		  })
	  }
	  
	  onAgeDown = () => {
		  this.setState({
			  ...this.state,
			  age:--this.state.age
		  })
	  }*/
	  
	  // now let's do it with redux
	  // npm install redux --save
	  // npm install react-redux --save
	  
  render() {
    return (
      <div className="App">
        <div>Age : {this.props.age}</div>
		<button onClick={this.props.onAgeUp}>Age Up</button>
		<button onClick={this.props.onAgeDown}> Age Down</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => { // when ever state get changed we need to subscribe it. here we map it to our props
	return {
		age:state.age
	}
}

const mapDispatchToProps = (dispatch) => {  // we are setting two above commented methods as peoperty here
	return {
		onAgeUp : () => dispatch({type:'AGE_UP'}),
		onAgeDown: () => dispatch({type : 'AGE_DOWN'})
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);  // this will give one higher level component
