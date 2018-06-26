import React from 'react';
import Carcomp from './carcompany';

const CarsList = (props) => {  
    return( 
    <div>
        <h1> Car List <span> - it is a function (state less) component </span></h1>
        <ul>
            <p>{props.children}</p> {/* A JSX comment */}

            <li>Honda Centro </li>
            <li> Hundai eon</li>
        </ul>
        
        <input type="text" onChange={props.bindTextField} value={props.defaultText} />
        {/* <button onClick={props.changeCarPriceProp}>Get New Price without GST</button> */}
        <br/>
        <h1><p>{props.defaultText}</p></h1>
    </div>
    );
}

export default CarsList;