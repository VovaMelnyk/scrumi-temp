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
        };
        this.switchMonth = this.switchMonth.bind(this);
    }

    switchMonth(period) {
        this.setState ({
            now: this.state.now.add(period,'month')
        })
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


    render() {
        // const events = this.props.events.has(cell.format('DD.MM.YYYY')) ?
        //     _.forEach(this.props.events.get(cell.format('DD.MM.YYYY')), function(event) {
        //         return <Event
        //             className="c-event"
        //             event={event}
        //             handleClick={function() {console.log('click on Event')}}
        //         />
        //     }) : null;
        let grid = _.map(this.dateAdd(this.state.now),(cell) => {
            return <MonthCell
                month={this.state.now}
                key={uuid()}
                cellDate={cell}>
                {this.props.events.has(cell.format('DD.MM.YYYY')) &&
                    _.map(this.props.events.get(cell.format('DD.MM.YYYY')), event => {
                        return <Event
                            uuid={uuid()}
                            className="c-event"
                            event={event}
                            handleClick={this.props.handleEventClick.bind(null, event)}/>
                    })}
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

