import React from 'react';
// import { Link } from 'react-router-dom';

import './Menu.scss';

import Nav from './Nav/Nav';
import User from './User/User';
import Icon from './../Icon/Icon';
import logoImage from './img/Logo.png';

export default class Menu extends React.Component {
    constructor() {
        super();
    }

    render () {
        return (
            <header className='header'>
                <Icon className='header__logo' imageLink={logoImage} alt='#'/>
                <Nav itemClassName='menu__item' />
                <User />
            </header>
        );
    }
}
