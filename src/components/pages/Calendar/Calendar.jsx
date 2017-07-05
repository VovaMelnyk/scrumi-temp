import React from 'react';
import DatePicker from './../../DatePicker/DatePicker';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './Calendar.scss';

import CalendarNav from './CalendarNav/CalendarNav';
import Month from './Month/Month'
import Sprint from './Sprint/Sprint'
import ModalWindow from '../../ModalWindow/ModalWindow'


import Event from './Event/Event';
import EventWindow from './EventWindow/EventWindow';

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            fromDate: moment(),
            isOpenModal: false,
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
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleNewEvent = this.handleNewEvent.bind(this);
        this.createOrEditEventWindow = this.createOrEditEventWindow.bind(this);

    }

    handleClick() {
        this.setState({
            visible: !this.state.visible
        })
    }

    handleSelect(newDate) {
        this.setState({
            fromDate: moment(newDate)
        })
    }

    switchMonth(period) {
        this.setState ({
            fromDate: this.state.fromDate.add(period,'month')
        })
    }

    toggleModal(event) {
        console.log(event.target);
        event.stopPropagation();
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
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
            <div className='calendar'>
                <CalendarNav
                period = {this.state.fromDate}
                onClick = {this.switchMonth}
                onCloseModal={this.toggleModal}
                />

                <Route exact path='/calendar' render={()=><Month period={this.state.fromDate}/>}/>
                <Route  path='/calendar/sprint' component={Sprint} />
                <ModalWindow showModal={this.state.isOpenModal}
                             onCloseModal={this.toggleModal}
                             className=''
                >
                </ModalWindow>
                {this.state.editEventWindow &&
                    this.createOrEditEventWindow(this.state.newEvent)
                }
            </div>
        );
    }
}
