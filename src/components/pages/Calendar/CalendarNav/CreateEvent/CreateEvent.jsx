import React from 'react';

import './CreateEvent.scss';

import Button from '../../Button/Button';
import TypeEvent from '../../TypeEvent/TypeEvent';

export default class CreateEvent extends React.Component {
    constructor() {
        super ();
        this.state = {
            visible: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            visible: !this.state.visible
        })
    }


    render() {
        return(
            <div className='event'>
                <Button className="c-button_create-event" text="Create Event"/>
                <Button className='c-button__show-list' text='' onClick={this.handleClick}/>
                {this.state.visible &&
                <TypeEvent onClick={this.handleClick}/>
                }
            </div>
        );
    }
}
