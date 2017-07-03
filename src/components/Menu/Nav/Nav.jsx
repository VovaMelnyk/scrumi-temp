import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavItem from './../NavItem/NavItem.jsx';

import './Nav.scss';

import iconProject from './../img/Project.svg';
import iconChat from './../img/Chat.png';
import iconBacklog from './../img/Backlog.png';
import iconBoard from './../img/Board.png';
import iconCalendar from './../img/Calendar.png';

function Nav(props) {
    return (
        <div className='menu-container'>
            <ul className="menu">
                <NavItem itemTitle='Project' itemClassName={props.itemClassName} iconClassName='' itemLink='/' iconLink={iconProject}/>
                <NavItem itemTitle='Chat' itemClassName={props.itemClassName} itemLink='/chat' iconClassName='' iconLink={iconChat}/>
                <NavItem itemTitle='Backlog' itemClassName={props.itemClassName} itemLink='/backlog' iconClassName='' iconLink={iconBacklog}/>
                <NavItem itemTitle='Board' itemClassName={props.itemClassName} itemLink='/board' iconClassName='' iconLink={iconBoard}/>
                <NavItem itemTitle='Calendar' itemClassName={props.itemClassName} itemLink='/calendar' iconClassName='' iconLink={iconCalendar}/>
            </ul>
        </div>
    )
}

Nav.propTypes = {
    itemClassName: PropTypes.string.isRequired
};

Nav.defaultProps = {
    itemClassName: 'menu__item'
};

export default Nav;
