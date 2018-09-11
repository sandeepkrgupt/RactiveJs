/*
**
** Back Button Base Component in React
*
* The Button to Navigate back in the Browser History.
* Expected Properties,
* @param backButtonHref: The URL to Navigate on Click of Back Button.
* @param backButtonClass: The BackButton class to apply look and feel.
* @param backButtonClickEvent: The Click Event on the Back Button.
* @param buttonLabel : The Back Button label, default please use Back (locale = 'en').
**
*/
import React from 'react';

const BackButton = ({backButtonHref, backButtonClass, backButtonClickEvent, buttonLabel = 'Back'}) => {
    return (
        <div className="react-back-button">
            <a href={backButtonHref} className={backButtonClass} onClick={backButtonClickEvent}>
                <span className="glyphicon glyphicon-menu-left back-button-arrow" />
                <span className="back-button-text">{buttonLabel}</span>
            </a>
        </div>
    );
};

export default BackButton;
