import React from 'react';
import PropTypes from 'prop-types';

import './CreateEvent.scss';

import Button from '../../Button/Button';
import TypeEvent from '../../TypeEvent/TypeEvent';
import EventWindow from './../../EventWindow/EventWindow';

export default class CreateEvent extends React.Component {
    constructor() {
        super ();
        this.state = {
            visible: false,
            eventWindowVisible: false,
            eventType: 0,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSelectEventType = this.handleSelectEventType.bind(this);
        this.handleEventWindowHide = this.handleEventWindowHide.bind(this);
    }

    handleClick() {
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleSelectEventType(eventType) {
        this.setState({
            visible: !this.state.visible,
            eventType: eventType ? eventType : 0,
            eventWindowVisible: true,
        });
        console.log('event Type', eventType);

    }

    handleEventWindowHide() {
        this.setState({
            eventWindowVisible: false,
        })
    }


    render() {
        return(
            <div className='event'>
                <Button className="c-button_create-event" text="Create Event" onClick={this.props.onCloseModal}/>
                <Button className='c-button__show-list' text='' onClick={this.handleClick}/>
                {this.state.visible &&
                <TypeEvent onClick={this.handleSelectEventType}/>
                }
                {this.state.eventWindowVisible &&
                    <EventWindow
                        handleHide={this.handleEventWindowHide}
                        newEventType={this.state.eventType}
                    />
                }
            </div>
        );
    }
}


CreateEvent.propTypes = {
    onCloseModal: PropTypes.func.isRequired
};
