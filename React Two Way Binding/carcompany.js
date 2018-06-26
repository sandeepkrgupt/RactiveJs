import React, {Component} from 'react';
import CarsList from './carsList';

class Carcomp extends Component {  // This is stateful component
    state = {
        name: "Two way binding",
       
    }

    bindText = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    
    render() {
        return(
            <div>
                <h1> Car Companies</h1>
                <CarsList bindTextField={this.bindText} defaultText={this.state.name}>Starting Price = 200000</CarsList> {/* changeCarList is a property which can be accessed through props */}
            </div>
        );
    }
}

export default Carcomp;