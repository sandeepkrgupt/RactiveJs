import React, {Component} from 'react';
import Child from './child';


const Parent = (props) => { 
    return(
        <div>
            <Child {...props} /> {/* ... is called spread operator. It is used to pass all the properties of one component to other or parent to child.*/}
        </div>
    );
}


export default Parent;