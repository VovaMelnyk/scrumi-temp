import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
    return (
        <img
            className={props.className}
            src={props.imageLink}
            alt={props.alt}
        />
    );
}

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

Icon.defaultProps = {
    className: 'icon',
    imageLink: '#',
    alt: 'icon'
};

export default Icon;
