import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import "moment/locale/ru";
import uuid from 'uuid';
import PropTypes from 'prop-types';


import './Month.scss';
import MonthCell from './MonthCell/MonthCell';

const WeekDays = () => {
    let days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return (
        <ul className='week-days'>
            {_.map(days,(day) => {
                return <li className='week-days__item'
                           key={day}
                >
                    {day}
                </li>
            })}
        </ul>
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

        let grid = _.map(this.dateAdd(this.state.now),(cell) => {
            return <MonthCell
                month={this.state.now}
                key={uuid()}
                cellDate={cell}
            />
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

};
