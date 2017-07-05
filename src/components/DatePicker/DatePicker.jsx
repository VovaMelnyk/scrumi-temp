import React from 'react';
import PropTypes from 'prop-types';

import DatePickerCell from './DatePickerCell/DatePickerCell';
import TimePicker from './TimePicker/TimePicker';
import moment from 'moment';
import _ from 'lodash';
import uuid from 'uuid';
import onClickOutside from 'react-onclickoutside';

import './DatePicker.scss';

/**
 * Creates calendar cells with the days of week
 * @param props
 * @returns {ReactElement} Line with the days of week (Su, Mo, Tu, We, Th, Fr, St)
 */
function DaysOfWeek(props) {
    let days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return (
        <ul className='date-picker__grid date-picker_week-days'>
            {_.map(days, (weekDay) => {
                return <li
                    key={uuid()}
                    className={`${props.className}__week-day`}>{weekDay}
                </li>
            })}
        </ul>
    )
}

DaysOfWeek.propTypes = {
    className: PropTypes.string.isRequired
};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        /**
         *
         * @type {{visible: boolean, showTime: Boolean, selectedDate, shownMonth: string}}
         */
        this.state = {
            visible: true,
            showTime: this.props.showTime,
            selectedDate: props.selectedDate,
            shownMonth: props.selectedDate.format('MM.YYYY')
        };
        moment.locale('ru');
        this.changeMonth = this.changeMonth.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside (evt) {
        this.props.handleClickOutside();
    }

    createDateArray(month = moment().format('MM.YYYY')) {
        let dateArr = [],
            date = moment(month, 'MM.YYYY'),
            startDate = date.startOf('month').subtract(date.startOf('month').day()-1, 'days'),
            cellDate = moment(startDate);

        _.times(42, function() {
            dateArr.push(moment(cellDate));
            cellDate.add(1, 'd');
        });
        return dateArr;
    }

    changeMonth(diff) {
        this.setState(() => {
            let newMonth = moment(this.state.shownMonth, 'MM.YYYY');
            newMonth.add(diff, 'month');
            return {
                shownMonth: newMonth.format('MM.YYYY')
            }
        })
    }

    selectDate(newValue) {
        let newDate = moment(newValue);
        this.setState({
            selectedDate: moment(this.state.selectedDate)
                .year(newDate.year())
                .month(newDate.month())
                .date(newDate.date())
        });
        if (typeof this.props.handleSelect == 'function') {
            this.props.handleSelect(moment(newDate));
        }
    }
    render () {
        let items = _.map(this.createDateArray(this.state.shownMonth), (cellDate) => {
            return <DatePickerCell
                key={uuid()}
                className={this.props.className}
                cellDate={moment(cellDate)
                    .hour(this.state.selectedDate.hour())
                    .minute(this.state.selectedDate.minute())
                }
                shownMonth={this.state.shownMonth}
                selectedDate={this.state.selectedDate}
                handleClick={this.selectDate}
            />
        });
        return (
            <div className={this.props.className}>
                <div className={`${this.props.className}__nav`}>
                    <span
                        className={`${this.props.className}__prev`}
                        onClick={this.changeMonth.bind(null, -1)}>
                        Prev
                    </span>
                    <span className={`${this.props.className}__date`}>{moment(this.state.shownMonth, 'MM.YYYY').format('MMMM YYYY')}</span>
                    <span
                        className={`${this.props.className}__next`}
                        onClick={this.changeMonth.bind(null, 1)}>
                        Next
                    </span>
                </div>
                <DaysOfWeek className={this.props.className}/>
                <ul className={`${this.props.className}__grid`}>
                    {items}
                </ul>
                {!this.props.disableTime && <TimePicker
                    handleTimeChange={this.props.handleTimeChange}
                    selectedTime={this.state.showTime ? this.props.selectedDate : null}
                />}
            </div>
        )
    }
}

DatePicker.propTypes = {
    className: PropTypes.string.isRequired,
    selectedDate: PropTypes.shape().isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleClickOutside: PropTypes.func.isRequired,
    handleTimeChange: PropTypes.func.isRequired,
    disableTime: PropTypes.bool.isRequired,
    showTime: PropTypes.bool.isRequired,
};

DatePicker.defaultProps = {
    className: 'date-picker',
    selectedDate: moment(),
    disableTime: false,
    showTime: true,
};

export default onClickOutside(DatePicker);
