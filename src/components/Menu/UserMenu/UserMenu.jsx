import React from 'react';
import { Link } from 'react-router-dom';

import './UserMenu.scss';

import UserMenuItem from '../UserMenuItem/UserMenuItem';

class UserMenu extends React.Component {
    render() {
        return(
            <div>
                <UserMenuItem/>
            </div>
        );
    }
}

export default UserMenu;
