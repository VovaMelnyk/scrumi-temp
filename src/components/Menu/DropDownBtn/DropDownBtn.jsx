import React from 'react';
import PropTypes from 'prop-types';

import './DropDownBtn.scss';

export default class DropDownBtn extends React.Component {
    render() {
        return(
            <a className={this.props.btnClassName} href='#' onClick={this.props.onClick}>
                {this.props.text}
            </a>
        );
    }
}

DropDownBtn.propsType = {
    btnClassName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

DropDownBtn.defaultProps = {
    btnClassName: 'dropdown__btn',
    text: 'My Menu',
};


