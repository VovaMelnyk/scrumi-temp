import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './DropDownItem.scss';

class DropDownItem extends React.Component {
    render() {
        return(
            <li className={this.props.itemClassName}>
                <Link
                    className={this.props.linkClassName}
                    to={this.props.link}>
                    {this.props.text}
                </Link>
                {this.props.children}
            </li>
        );
    }
}

DropDownItem.propTypes = {
    itemClassName: PropTypes.string,
    linkClassName: PropTypes.string,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

DropDownItem.defaultProps = {
    text: 'Menue Item',
    itemClassName: 'dropdown__item',
    linkClassName: 'dropdown__link',
    link: '/'
};

export default DropDownItem;
