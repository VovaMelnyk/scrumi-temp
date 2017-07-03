import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

export default class Checkbox extends React.Component {
    render() {
        return (
            <input type="radio" className={this.props.className}/>
        );
    }
}

Checkbox.propTypes = {
    className: PropTypes.string
};

Checkbox.defaultProps = {
    className: 'b-checkbox'
};
