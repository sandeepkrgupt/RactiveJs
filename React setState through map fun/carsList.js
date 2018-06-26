import React from 'react';
import Carcomp from './carcompany';

const CarsList = (props) => { // This is stateless component
    /* this.setState({
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
    }) we cannot use setState since it is a simple func or a stateless component*/ 
    return( 
    <div>
        <h1> Car List <span> - it is a function (state less) component </span></h1>
        <ul>
            <p>{props.children}</p> {/* A JSX comment */}

            <li>Honda Centro </li>
            <li> Hundai eon</li>
        </ul>
        <button onClick={props.changeCarPriceProp}>Get New Price with GST</button>
        
    </div>
    );
}

export default CarsList;