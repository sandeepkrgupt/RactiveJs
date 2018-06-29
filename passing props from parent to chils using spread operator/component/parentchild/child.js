import React, {Component} from 'react';

const Child = (props) => {
    return(
    <div>
        <h1>This is Child Comp</h1>
        <p>{props.newsTitle}</p>
        <p>{props.newsDesc}</p>
    </div>
    );
}

export default Child;