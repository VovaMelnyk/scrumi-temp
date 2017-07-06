import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import "moment/locale/ru";
import uuid from 'uuid';
import PropTypes from 'prop-types';


import './Month.scss';
import MonthCell from './MonthCell/MonthCell';
import Event from './../Event/Event';

const WeekDays = () => {
    let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return (
        <div className='week'>
            {_.map(days,(day) => {
                return <span className='week__item'
                           key={day}
                >
                    {day}
                </span>
            })}
        </div>
    )
};

export default class Month extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: this.props.period,
            showEventList: this.createEventListMatrix(this.props.period),
        };
        this.switchMonth = this.switchMonth.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.createEventListMatrix = this.createEventListMatrix.bind(this);
    }

    createEventListMatrix(date) {
        let eventListMatrix = new Map;
        let startDate = moment(date),
            endDate = moment(date);
        startDate = startDate.startOf('month').subtract(startDate.startOf('month').day()-1, 'days');
        endDate = endDate.endOf('month').add(7 - endDate.endOf('month').days(), 'days');
        const diff = Math.round(moment.duration(endDate-startDate).asDays());
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        let cellDate = startDate;
        _.times(diff, function() {
            eventListMatrix.set(moment(cellDate).format('DD.MM.YYYY'), false);
            cellDate.add(1, 'd');
        });

        console.log('eventListMatrix', eventListMatrix);
        return eventListMatrix

    }

    switchMonth(period) {
        let newDate = this.state.now.add(period,'month');

        this.setState ({
            now: newDate,
            showEventList: createEventListMatrix(newDate),
        });


    }

    dateAdd (month) {
        let collection = [],
            startDate = moment(month).startOf('month').day() !== 0
                ? moment(month).startOf('month').subtract(moment(month).startOf('month').day()-1, 'days')
                : moment(month).startOf('month').subtract(moment(month).startOf('month').day()+6,'days'),
            endDate = moment(month).endOf('month').day() !== 0
                ? moment(month).endOf('month').add(7 - moment(month).endOf('month').day(),'days')
                : moment(month).endOf('month'),
            cellDate = startDate,
            diff = Math.round(moment.duration(endDate-startDate).asDays());

        _.times(diff, function() {
            collection.push(moment(cellDate));
            cellDate.add(1, 'd');
        });
        return collection
    };

    handleCellClick(cellDate) {
        console.log('click');
        // let eventListMatrix = this.createEventListMatrix(cellDate);
        // eventListMatrix.set(cellDate.format('DD.MM.YYYY'), true);
        // this.setState({
        //     showEventList: eventListMatrix,
        // })
    }


    render() {
        let grid = _.map(this.dateAdd(this.state.now),(cell) => {
            return <MonthCell
                month={this.state.now}
                key={uuid()}
                cellDate={cell}
                handleClick={this.handleCellClick}>
                {this.props.events.has(cell.format('DD.MM.YYYY')) &&
                    _.map(this.props.events.get(cell.format('DD.MM.YYYY')), event => {
                        return <Event
                            key={uuid()}
                            className="c-event"
                            event={event}
                            handleClick={this.props.handleEventClick.bind(null, event)}
                        />
                    })}
                {this.state.showEventList.get(cell.format('DD.MM.YYYY')) &&
                    <MonthCell
                        month={this.state.now}
                        key={uuid()}
                        cellDate={cell}
                        className='c-date--event-list'
                        handleClick={this.handleCellClick}>
                        {this.props.events.has(cell.format('DD.MM.YYYY')) &&
                        _.map(this.props.events.get(cell.format('DD.MM.YYYY')), event => {
                            return <Event
                                key={uuid()}
                                className="c-event"
                                event={event}
                                handleClick={this.props.handleEventClick.bind(null, event)}
                            />
                        })}

                    </MonthCell>}
            </MonthCell>
        });

        return(
            <div>
                <WeekDays />
                <div className='c-calendar'>
                    {grid}
                </div>
            </div>

        );
    }
}

Month.propTypes = {
    period: PropTypes.shape().isRequired,
    events: PropTypes.shape().isRequired,
    handleEventClick: PropTypes.func.isRequired,
};

