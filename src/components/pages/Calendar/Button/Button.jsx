import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button =(props) => {
    return (
        <div className={`button ${props.className}`} onClick={props.onClick}>
            {props.text}
        </div>
    )
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
    className: 'g-button',
    text: 'Create Event',
};

export default Button;
