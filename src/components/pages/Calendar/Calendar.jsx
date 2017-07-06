import React from 'react';
import DatePicker from './../../DatePicker/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './Calendar.scss';

import CalendarNav from './CalendarNav/CalendarNav';
import Month from './Month/Month'
import Sprint from './Sprint/Sprint'
import ModalWindow from '../../ModalWindow/ModalWindow'


import EventWindow from './EventWindow/EventWindow';


function createEventMap(eventArray) {
    const eventMap = new Map;
    _.forEach(eventArray, function(item) {
        let dayEventArray = eventMap.has(item.startDate.format('DD.MM.YYYY')) ? eventMap.get(item.startDate.format('DD.MM.YYYY')) : [];
        dayEventArray.push(item);
        eventMap.set(item.startDate.format('DD.MM.YYYY'), dayEventArray);
    });

    return eventMap
}

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            fromDate: moment(),
            isOpenModal: false,
            editEventWindow: false,
            newEvent: true,
            events : [
                {
                    id: 1,
                    startDate: moment('08.07.2017 14:00', 'DD.MM.YYYY HH:mm'),
                    endDate: moment('08.07.2017 18:00', 'DD.MM.YYYY HH:mm'),
                    eventType: 3,
                    assignType: 0,
                    title: 'Offline встреча',
                    description: 'Разбираем прошедший спринт',
                    location: 'Офис GoIT'
                },
                {
                    id: 2,
                    startDate: moment('08.07.2017 19:00', 'DD.MM.YYYY HH:mm'),
                    endDate: moment('08.07.2017', 'DD.MM.YYYY'),
                    eventType: 0,
                    assignType: 1,
                    title: 'Гулянка в пабе',
                    description: 'Тимбилдинг :)',
                    location: 'This is ПИВБАР'
                }
            ],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleNewEvent = this.handleNewEvent.bind(this);
        this.createOrEditEventWindow = this.createOrEditEventWindow.bind(this);
        this.handleNewEvent = this.handleNewEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);

        createEventMap(this.state.events);
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

    toggleModal() {
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

    handleSaveEvent(event) {
        let newEvent = event;
        let newEvents = this.state.events;
        if (!event.id) {
            newEvent.id = this.state.events.length+1;
            newEvents.push(newEvent);
        } else {
            const eventIndex = _.findIndex(this.state.events, function(e) {
                return e.id === event.id
            })
            newEvents[eventIndex] = event;
        }

        this.setState(newEvents);
    }

    createOrEditEventWindow(newEvent) {
        return newEvent ?
            <EventWindow
                className='c-event-window'
                newEventDate={moment().add(1, 'days')}
                newEventType={0}
                handleHide={this.handleHide}
                handleSaveEvent={this.handleSaveEvent}/> :
            <EventWindow
                className='c-event-window'
                event={this.state.selectedEvent}
                handleHide={this.handleHide}
                handleSaveEvent={this.handleSaveEvent}/>
    }

    render() {
        return (
            <div className='calendar'>
                <CalendarNav
                period = {this.state.fromDate}
                onClick = {this.switchMonth}
                onCloseModal={this.toggleModal}
                handleSaveEvent={this.handleSaveEvent}
                />

                <Route exact path='/calendar' render={()=>
                    <Month
                        period={this.state.fromDate}
                        events={createEventMap(this.state.events)}
                        handleEventClick={this.handleEventClick}
                        handleSaveEvent={this.handleSaveEvent}
                    />
                }/>
                <Route  path='/calendar/sprint' component={Sprint} />
                {this.state.isOpenModal &&
                    <ModalWindow
                        onCloseModal={this.toggleModal}
                        className=''>
                    </ModalWindow>}
                {this.state.editEventWindow &&
                    this.createOrEditEventWindow(this.state.newEvent)
                }
            </div>
        );
    }
}
