import React from 'react';
import moment from 'moment';
import "moment/locale/ru";

import './Calendar.scss';
import Event from './Event/Event';
import EventWindow from './EventWindow/EventWindow';

export default class Calendar extends React.Component {
    constructor() {
        super();
        moment.locale('ru');
        this.state = {
            editEventWindow: false,
            newEvent: true,
            event: {
                startDate: moment().subtract(1, 'days'),
                endDate: moment(),
                eventType: 0,
                assignType: 1,
                title: 'New Event',
                description: 'Описание нашего мероприятия, может быть в несколько строк',
                location: 'Офис GoIT'
            },
            event2: {
                startDate: moment().subtract(3, 'days'),
                endDate: moment().subtract(2, 'days'),
                eventType: 0,
                assignType: 0,
                title: 'New Event 2',
                description: 'Еще одно описание',
                location: 'McDonalds'
            },
            selectedEvent: null
        };

        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleNewEvent = this.handleNewEvent.bind(this);
        this.createOrEditEventWindow = this.createOrEditEventWindow.bind(this);

    }

    handleEventClick(event) {
        this.setState({
            selectedEvent: event,
            newEvent: false,
            editEventWindow: true
        })
    }

    handleHide() {
        this.setState({
            editEventWindow: false,
            selectedEvent: null
        })
    }

    handleNewEvent(eventType) {
        this.setState({
            newEvent: true,
            editEventWindow: true,
        })
    }

    createOrEditEventWindow(newEvent) {
        return newEvent ?
            <EventWindow
                className='c-event-window'
                newEventDate={moment().add(1, 'days')}
                newEventType={0}
                handleHide={this.handleHide}/> :
            <EventWindow
                className='c-event-window'
                event={this.state.selectedEvent}
                handleHide={this.handleHide}/>
    }

    render() {
        return (
            <div>
                <h1>Calendar is the best!!!</h1>
                {/*<DateTimeSpan date={moment()}/>*/}
                <div className='c-event-block'>
                    <Event className='c-event' event={this.state.event}
                           handleClick={this.handleEventClick}/>
                    <Event className='c-event' event={this.state.event2}
                           handleClick={this.handleEventClick}/>
                </div>
                <div className='cell'>

                </div>
                <a onClick={this.handleNewEvent}>new Event</a>
                {this.state.editEventWindow &&
                this.createOrEditEventWindow(this.state.newEvent)
                }
            </div>
        );
    }
}
