import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import "moment/locale/ru";

import './EventWindow.scss';
import DateTimeSpan from './../../../DateTimeSpan/DateTimeSpan';
import Button from './../Button/Button';
import QuestionWindow from '../../../QuestionWindow/QuestionWindow';
import ModalWindow from'./../../../ModalWindow/ModalWindow';
import TypeEvent from './../TypeEvent/TypeEvent';

class EventWindow extends React.Component {
    constructor(props) {
        super(props);

        moment.locale('ru');
        this.eventDurations = [60, 15, 60, 60];
        this.state = {
            isModified: false,
            event: this.props.event ? this.props.event : {},
            eventType: this.props.event ? this.props.event.eventType : this.props.newEventType,
            assignType: this.props.event ? this.props.event.assignType : 0,
            startDate: this.props.event ? this.props.event.startDate : this.props.newEventDate,
            endDate: this.props.event ? this.props.event.endDate : moment(this.props.newEventDate).add(this.eventDurations[this.props.newEventType], 'm'),
            duration: this.eventDurations[this.props.event ? this.props.event.assignType : 0],
            eventTypeVisible: false,
            questionVisible: false,
            buttonId: null
        };

        this.findAssignType = {
            '000' : 2,
            '010' : 1,
            '100' : 2,
            '111' : 0,
            '201' : 1,
            '211' : 0,
        };

        this.eventTypes = ['Событие', 'Стендап', 'Демо', 'Ретро', 'Дедлайн'];

        this.handleSave = this.handleSave.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeAllDay = this.handleChangeAllDay.bind(this);
        this.handleClickEventType = this.handleClickEventType.bind(this);
        this.handleChangeEventType = this.handleChangeEventType.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
        this.handleCloseList = this.handleCloseList.bind(this);
        this.showQuestion = this.showQuestion.bind(this);

    }

    handleSave() {
        const newEvent = this.state.event ? this.state.event : {};
        newEvent.id = this.state.event.id;
        newEvent.title = this.eventTitle.value;
        newEvent.startDate = this.state.startDate;
        newEvent.endDate = this.state.endDate;
        newEvent.description = this.eventDescription.value;
        newEvent.location = this.eventLocation.value;
        newEvent.assignType = this.state.assignType;
        newEvent.eventType = this.state.eventType;
        console.log('new event = ', newEvent);
        this.props.handleSaveEvent(newEvent);
        this.props.handleHide();
    }

    handleChangeDate(dateNum, newDate, showTime) {
        const newAssignType = this.state.assignType.toString() + dateNum.toString() + (showTime ? '1' : '0'),
            newEvent = this.state,
            dates = ['startDate', 'endDate'];

        newEvent[dates[dateNum]] = newDate;
        if (typeof this.findAssignType[newAssignType] != "undefined") {
            newEvent.assignType = this.findAssignType[newAssignType];
        }
        if (!dateNum) {
            newEvent[dates[1]] = moment(newDate).add(this.state.duration, 'm');
        }
        this.setState(newEvent);
    }

    handleChangeAllDay(e) {
        const newState = this.state;
        newState.assignType = e.target.checked ? 2 : 0;
        this.setState(newState);
    }

    handleClickEventType() {
        this.setState({
            eventTypeVisible: true,
        })
    }

    handleChangeEventType(eventType) {
        let newState = {
            eventType: eventType,
            eventTypeVisible: false,
        };
        if (eventType) {
            newState.endDate = moment(this.state.startDate).add(this.eventDurations[eventType], 'm');
        }
        this.setState(newState);
    }

    handleDeleteEvent() {
        console.log('delete event with id', this.state.event.id);
        this.props.handleDeleteEvent(this.state.event.id);
        this.props.handleHide();
    }

    handleCloseList() {
        this.setState({
            eventTypeVisible: false,
        });
    }

    showQuestion(e) {
        this.setState({
            questionVisible: !this.state.questionVisible,
            buttonId: e.target.id
        });
    }



    render() {
        let dateBlock = <div className={`${this.props.className}__date-block`}>
                    <span className={`${this.props.className}__span-title`}>Дата начала:</span>
                    <DateTimeSpan
                        date={this.state.startDate}
                        className={`${this.props.className}__date-span`}
                        handleChange={this.handleChangeDate.bind(this, 0)}
                        showTime={this.state.assignType!==2}
                        disableTime={this.state.assignType===2}/>
                    <span className={`${this.props.className}__span-title`}>Дата завершения:</span>
                    <DateTimeSpan
                        date={this.state.endDate}
                        className={`${this.props.className}__date-span`}
                        handleChange={this.handleChangeDate.bind(this, 1)}
                        showTime={this.state.assignType === 0}
                        disableTime={this.state.assignType===2}/>
                    <input type='checkbox'
                           name={`${this.props.className}__checkbox`}
                           id={`${this.props.className}__checkbox`}
                           className={`${this.props.className}__checkbox`}
                           onChange={this.handleChangeAllDay}
                            checked={this.state.assignType === 2}/>
                    <label htmlFor={`${this.props.className}__checkbox`}>Весь день</label>
                </div>,
            infoBlock = <div className={`${this.props.className}__date-block`}>
                    <span className={`${this.props.className}__descr-title`}>Описание</span>
                    <textarea
                        className={`${this.props.className}__description`}
                        defaultValue={this.props.event ? this.props.event.description : ''}
                        ref={(input) => { this.eventDescription = input; }}>
                    </textarea>
                    <input
                        type='text'
                        className={`${this.props.className}__location`}
                        placeholder='Место проведения'
                        defaultValue={this.props.event ? this.props.event.location : ''}
                        ref={(input) => { this.eventLocation = input; }}
                    />
                </div>,
            buttonBlock = <div className={`${this.props.className}__control-block`}>
                    {this.state.event.id &&
                        <Button
                            className={`${this.props.className}__button`}
                            text='Удалить'
                            onClick={this.showQuestion}
                            id='удалить'
                        />}
                    <button
                        className={`${this.props.className}__button`}
                        onClick={this.props.handleHide}>
                        Отмена
                    </button>
                    <button
                        className={`${this.props.className}__button`}
                        onClick={this.handleSave}
                        id='сохранить'
                    >
                        Сохранить
                    </button>
                </div>,
            content = <ModalWindow
                            onCloseModal={this.props.handleHide}
                            showModal={true}
                            className='c-event-window'>
                    <input
                        type="text"
                        className={`${this.props.className}__event-title`}
                        placeholder='Название события'
                        defaultValue={this.props.event ? this.props.event.title : ''}
                        ref={(input) => { this.eventTitle = input; }}
                    />
                    <div className={`${this.props.className}__types`}>
                        <button
                            className={`${this.props.className}__event-type`}
                            onClick={this.handleClickEventType}>
                            {this.state.eventTypeVisible ? 'Тип события' : this.eventTypes[this.state.eventType]}
                        </button>
                        {this.state.eventTypeVisible &&
                        <TypeEvent
                            types = {[
                                {title:'Событие', key:'custom'},
                                {title:'Стендап', key:'standup'},
                                {title:'Демо', key:'demo'},
                                {title:'Ретро', key:'retro'},
                                {title:'Дедлайн', key:'deadline'}
                            ]}
                            handleClick={this.handleCloseList}
                            onClick={this.handleChangeEventType}/>}
                    </div>

                    {dateBlock}
                    {infoBlock}
                    {buttonBlock}
                {this.state.questionVisible &&
                <QuestionWindow
                    no={this.showQuestion}
                    yes= {this.state.buttonId  === 'сохранить'? this.handleSave : this.handleDeleteEvent}
                    onCloseModal={this.showQuestion}
                    text={`Вы желаете ${this.state.buttonId} событие?`}
                />
                }
                </ModalWindow>;
        return (
            content
        )
    }
}

EventWindow.propTypes = {
    className: PropTypes.string.isRequired,
    newEventType: PropTypes.oneOf([0, 1, 2, 3, 4]),
    newEventDate: PropTypes.shape(),
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        eventType: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
        assignType: PropTypes.oneOf([0, 1, 2]).isRequired,
        startDate: PropTypes.shape.isRequired,
        endDate: PropTypes.shape.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired
    }),
    handleHide: PropTypes.func.isRequired,
    handleSaveEvent: PropTypes.func.isRequired,
    handleDeleteEvent: PropTypes.func.isRequired,
};

EventWindow.defaultProps = {
    className: 'c-event-window',
    newEventType: 0,
    newEventDate: moment(),
};

export default EventWindow;
