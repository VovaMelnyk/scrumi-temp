import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button =(props) => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.text}
        </button>
    )
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
