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
        this.createEvent = this.createEvent.bind(this)
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

    }

    createEvent() {
        this.setState({
            eventType: 0,
            eventWindowVisible: true,
        });

    }

    handleEventWindowHide() {
        this.setState({
            eventWindowVisible: false,
        })
    }


    render() {
        return(
            <div className='event'>
                <Button className="button-green" text="Создать событие" onClick={this.createEvent}/>
                <Button className='button-green button-green--caret' text={String.fromCharCode(9660)} onClick={this.handleClick}/>
                {this.state.visible &&
                <TypeEvent
                    types = {[
                    {title:'Событие', key:'custom'},
                    {title:'Стендап', key:'standup'},
                    {title:'Демо', key:'demo'},
                    {title:'Ретро', key:'retro'}
                    ]}
                    handleClick={this.handleClick}
                    onClick={this.handleSelectEventType}/>
                }
                {this.state.eventWindowVisible &&
                    <EventWindow
                        handleHide={this.handleEventWindowHide}
                        newEventType={this.state.eventType}
                        handleSaveEvent={this.props.handleSaveEvent}
                    />
                }
            </div>
        );
    }
}


CreateEvent.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    handleSaveEvent: PropTypes.func.isRequired,
};
