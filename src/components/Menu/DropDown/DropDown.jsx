import React from 'react';
import PropTypes from 'prop-types';

import './DropDown.scss';
import DropDownBtn from '../DropDownBtn/DropDownBtn';

export default class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listVisible: false
        };

        this.listShow = this.listShow.bind(this);
        this.listHide = this.listHide.bind(this);
    }

    listShow() {
        this.setState(function() {
            return {
                listVisible: true
            };
        });
        document.addEventListener('click', this.listHide);
    }

    listHide() {
        this.setState(function() {
            return {
                listVisible: false
            };
        });
        document.removeEventListener('click', this.listHide);
    }

    render() {
        return(
            <div className='dropdown'>
                <DropDownBtn
                    text={this.props.text}
                    onClick={this.listShow}/>

                <ul className={this.state.listVisible
                    ? `dropdown__list dropdown__list--active`
                    : 'dropdown__list'}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

DropDown.propTypes = {
    text: PropTypes.string.isRequired
};

