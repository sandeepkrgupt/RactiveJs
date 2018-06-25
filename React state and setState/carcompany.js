import React, {Component} from 'react';
import CarsList from './carsList';

class Carcomp extends Component {  // This is stateful component
    state = {
        cars: [
            {
                model : "R1",
                price: "300000"
            },
            {
                model : "xuv",
                price: "400000"
            },
            {
                model : "miz",
                price: "500000"
            }
        ] 
    }

    changePrice = () => {
        console.log("change Price");
        this.setState({
            cars: [
                {
                    model : "R1",
                    price: "399999"
                },
                {
                    model : "xuv",
                    price: "499999"
                },
                {
                    model : "miz",
                    price: "599999"
                }
            ]
        })
    }
    
    render() {
        
        const path = 'images/building.png';
        return(
            <div>
                <h1> Car Companies</h1>
                <img src={path} />
                <ul>
                    <li>Honda {this.state.cars[0].model} | Rs. {this.state.cars[0].price}</li>
                    <li>Hundai {this.state.cars[1].model} | Rs. {this.state.cars[1].price}</li>
                </ul>
                
                <CarsList changeCarPrice = {this.changePrice} >Starting Price = 200000</CarsList> {/* changeCarList is a property which can be accessed through props */}
            </div>
        );
    }
}

export default Carcomp;