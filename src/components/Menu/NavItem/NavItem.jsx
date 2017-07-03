import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './NavItem.scss';

import Icon from './../../Icon/Icon';
import Counter from './../Counter/Counter';

class NavItem extends React.Component {
    render() {
        return (
            <li className={this.props.itemClassName}>
                <NavLink exact activeClassName='menu_item-active' className="menu__item-link" to={this.props.itemLink}>
                    <div className="menu__icon-bg">
                        <Icon className={this.props.iconClassName} imageLink={this.props.iconLink} alt='Project'/>
                        <Counter/>
                    </div>
                    <p className="menu__item-title">{this.props.itemTitle}</p>
                </NavLink>
            </li>
        )
    }
}

NavItem.propTypes = {
    itemTitle: PropTypes.string.isRequired,
    itemClassName: PropTypes.string.isRequired,
    itemLink: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconLink: PropTypes.string.isRequired
};

NavItem.defaultProps = {
    itemTitle: 'Menu Item',
    itemClassName: 'menu__item',
    itemLink: '#',
    iconClassName: 'menu__menu-icon',
    iconLink: ''
};

export default NavItem;
