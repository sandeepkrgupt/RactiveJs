import React from 'react';

const SpinningButton = ({title, onClick, enable, spinning, children}) => {
    const buttonBaseClassName = 'btn btn-primary';
    const buttonClassName =
        `${buttonBaseClassName}${enable ? '' : ' btn-primary-disabled'}${spinning ? ' spinner' : ''}`;
    const label = title ? <span>{title}</span> : children;

    return (
        <button
            className={buttonClassName}
            onClick={onClick}>
            <div className="loader rectangle">
                <div className="ball one" />
                <div className="ball two" />
                <div className="ball three" />
            </div>
            {label}
        </button>
    );
};

export default SpinningButton;
