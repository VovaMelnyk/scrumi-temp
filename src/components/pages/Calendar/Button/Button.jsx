import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button =(props) => {
    return (
        <button className={props.className} onClick={props.onClick} id={props.id}>
            {props.text}
        </button>
    )
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Button;
