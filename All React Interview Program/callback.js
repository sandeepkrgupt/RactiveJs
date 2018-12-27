import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Input = (props) => {
	return (
	<div>
		<input type="text" ref={props.InputRef} />
	</div>
	);
};
class CallBack extends Component {
    
	state = {
		value : ''
	}
	/*
	constructor(props) {
        super(props)

        this.textField = React.createRef();
        this.state = {
            value:''
        }
    }
	
	*/
    handleSubmit = e => {
        e.preventDefault();
        this.setState({value : this.textField.value});
    }

    render() {
        return (
            <div>
					<h1>Callback ref:- {this.state.value}</h1>
					<input type="text" ref={element => this.textField = element} />
					<button onClick={this.handleSubmit}>submit</button>
            </div>
        )
    }
}

export default CallBack;