import React, {Component} from 'react';

class Validation extends Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.password = React.createRef();
		
		this.state = {
			errorlist : []
		}
	};
	
	handleOnSubmit = e => {
		e.preventDefault();
		const username = this.username.current.value;
		const password = this.password.current.value;
		const errorlist = this.handleValidation(username, password);
		if(errorlist.length > 0) {
			this.setState({errorlist})
			return;
		}
	};
	
	handleValidation = (username, password) => {
		const errorlist = [];
		if(username.length === 0) {
			errorlist.push("username cannot be empty");
		}
		if(password.length < 5) {
			errorlist.push("password should be more than 5 char")
		}
		return errorlist;
	};
	
	render() {
		const {errorlist} = this.state;
		return(
		<div>
		{errorlist.map( error => <p key={error}>{error}</p>)}
			<form onSubmit={this.handleOnSubmit}>
				<div>
					<label> User name : </label>
					<input type="text" ref={this.username} />
				</div>
				<div>
					<label> password : </label>
					<input type="text" ref={this.password} />
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
		);
	}
}

export default Validation;