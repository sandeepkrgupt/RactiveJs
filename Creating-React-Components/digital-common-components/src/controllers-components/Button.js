import React from 'react';

const Button = ({buttonType, buttonClass, clickEvent, id, disabled, buttonLabel}) => {
    return (
        <button
            type={buttonType}
            className={`${buttonClass} btn`}
            onClick={clickEvent}
            id={id}
            disabled={disabled}
            dangerouslySetInnerHTML={{__html: buttonLabel}}
        />
    );
};

export default Button;
