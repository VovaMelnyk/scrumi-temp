import React from 'react';

import './User.scss';
import Icon from '../../Icon/Icon';
import DropDown from '../DropDown/DropDown';
import DropDownItem from '../DropDownItem/DropDownItem';
import Ava from '../img/ava.png';
import Checkbox from '../Сheckbox/Checkbox';

export default class User extends React.Component {
    render() {
        return (
            <div className='user-menu'>
                <Icon className='user-menu__icon' imageLink={Ava} alt='User Avatar'/>
                <DropDown text='My Profile'>
                    <DropDownItem text='My Profile' link='/profile'/>
                    <DropDownItem text='Silent Mode'>
                        <Checkbox/>
                    </DropDownItem>
                    <DropDownItem text='Scrum Mode'>
                        <Checkbox/>
                    </DropDownItem>
                    <DropDownItem text='Settings' link='/settings'/>
                    <DropDownItem text='Log Off'/>
                </DropDown>
            </div>
        );
    }
}

