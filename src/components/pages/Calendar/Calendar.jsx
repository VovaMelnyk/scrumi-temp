{/*
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

import api from './../../api/api';


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
            newEventType: 0,
            newEventStartDate: moment(),
            eventIdCounter: 2,
            events : [],
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
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);

        this.getData = this.getData.bind(this);
        createEventMap(this.state.events);
        this.getData();
    }

    getData() {
        api.processData('http://localhost:3000/events')
            .then(function(response) {
                console.log('response', response);
                this.setState({
                    events: response.data,
                })
            })
            .catch(function(error) {
                console.log('error', error);
            })
    }
    componentWillReceiveProps(nextProps) {

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

    handleNewEvent(eventType, eventDate) {
        this.setState({
            newEvent: true,
            newEventType: eventType,
            editEventWindow: true,
            newEventStartDate: eventDate ? eventDate : moment(),
        })
    }

    handleSaveEvent(event) {
        let newEvent = event;
        let newEvents = this.state.events;
        if (!event.id) {
            newEvent.id = this.state.eventIdCounter + 1;
            newEvents.push(newEvent);
            this.setState({
                eventIdCounter: this.state.eventIdCounter + 1
            })
        } else {
            const eventIndex = _.findIndex(this.state.events, function(e) {
                return e.id === event.id
            });
            newEvents[eventIndex] = event;
        }
        this.setState({
            events: newEvents,
        })
    }

    handleDeleteEvent(eventId) {
        const eventIndex = _.findIndex(this.state.events, function(e) {
            return e.id === eventId
        });
        let newEvents = this.state.events;
        _.pullAt(newEvents, eventIndex);
        this.setState({
            events: newEvents
        })
    }

    createOrEditEventWindow(newEvent) {
        return newEvent ?
            <EventWindow
                className='c-event-window'
                newEventDate={this.state.newEventStartDate.minute() < 30 ? this.state.newEventStartDate.startOf('hour').add(30, 'm') : this.state.newEventStartDate.add(30, 'm').startOf('hour')}
                newEventType={this.state.newEventType}
                handleHide={this.handleHide}
                handleSaveEvent={this.handleSaveEvent}
                handleDeleteEvent={this.handleDeleteEvent}/> :
            <EventWindow
                className='c-event-window'
                event={this.state.selectedEvent}
                handleHide={this.handleHide}
                handleSaveEvent={this.handleSaveEvent}
                handleDeleteEvent={this.handleDeleteEvent}/>
    }

    render() {
        return (
            <div className='calendar'>
                <CalendarNav
                period = {this.state.fromDate}
                onClick = {this.switchMonth}
                onCloseModal={this.toggleModal}
                handleSaveEvent={this.handleSaveEvent}
                handleCreateEvent={this.handleNewEvent}
                />

                <Route exact path='/calendar' render={()=>
                    <Month
                        period={this.state.fromDate}
                        events={createEventMap(this.state.events)}
                        handleEventClick={this.handleEventClick}
                        handleSaveEvent={this.handleSaveEvent}
                        handleNewEvent={this.handleNewEvent}
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
*/}

import { createStore, combineReducers, applyMiddleware } from 'redux';


const mathReducer = (state = {
                    result: 1,
                    lastValues: [],
                }, action) => {
        switch (action.type) {
            case 'ADD':
                state = {
                    ...state,
                    result: state.result + action.payload,
                    lastValues: [...state.lastValues, action.payload],
                };
                break;
            case 'SUBTRACT':
                state = {
                    ...state,
                    result: state.result - action.payload,
                    lastValues: [...state.lastValues, action.payload],
                };
                break;
        }
    return state;
};

const userReducer = (state = {
        name: 'Max',
        age: 27,
    }, action) => {
    switch (action.type) {
        case 'SET_NAME':
            state = {
                ...state,
                name: action.payload,
            };
            break;
        case 'SET_AGE':
            state = {
                ...state,
                age: action.payload,
            };
            break;
    }
    return state;
};

const store = createStore(combineReducers({mathReducer, userReducer}));

store.subscribe(() => {
    console.log('Store updated', store.getState());
});

store.dispatch({
    type: 'ADD',
    payload: 100
});

store.dispatch({
    type: 'ADD',
    payload: 22
});

store.dispatch({
    type: 'SUBTRACT',
    payload: 80
});

store.dispatch({
    type: 'SET_AGE',
    payload: 30
});
