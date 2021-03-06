import React from 'react';
import PropTypes from 'prop-types';

import './DateTimeSpan.scss';

import moment from 'moment';
import "moment/locale/ru";

import DatePicker from './../DatePicker/DatePicker';

class DateTimeSpan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTime: this.props.showTime,
            disableTime: this.props.disableTime,
            date: this.props.date,
            visible: false,
        };

        this.dateFormat = ['DD MMMM YYYY HH:mm', 'DD MMMM YYYY'];
        moment.locale('ru');


        this.handleClick = this.handleClick.bind(this);
        // this.handleHide = this.handleHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.stopPropagation = this.stopPropagation.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showTime: nextProps.showTime,
            disableTime: nextProps.disableTime,
            date: nextProps.date,
            visible: false,
        });
    }

    componentWillUnmount() {
        this.props.handleChange(this.state.date, this.state.showTime);
    }

    handleClick() {
        this.setState({
                visible: !this.state.visible,
            });
    }

    // handleHide() {
    //     this.setState({
    //         visible: false,
    //     });
    //
    //     this.props.handleChange(this.state.date, this.state.showTime);
    //     console.log('outside')
    // }

    handleSelect(newDate) {
        this.setState(
            {
                date: moment(newDate),
            }
        );
    }

    handleTimeChange(newTime, showTime) {
        if (showTime) {
            this.setState({
                date: this.state.date.hour(newTime.hour()).minute(newTime.minute()),
                showTime: true,
            });
        } else {
            this.setState({
                showTime: false,
            });
        }
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        let format = this.state.showTime ? this.dateFormat[0] : this.dateFormat[1];
        return (
            <span
                className={this.props.className}
                tabIndex='0'
                onClick={this.handleClick}>
                {this.state.date.format(format)}
                {this.state.visible &&
                <DatePicker selectedDate={moment(this.state.date)}
                            handleClickOutside={this.handleClick}
                            handleSelect={this.handleSelect}
                            handleTimeChange={this.handleTimeChange}
                            disableTime={this.state.disableTime}
                            showTime={this.state.showTime}
                            outsideClickIgnoreClass={'c-event-window__date-span'}
                            stopPropagation={this.stopPropagation}
                />
                }
            </span>
        )
    }
}

DateTimeSpan.propTypes = {
    className: PropTypes.string.isRequired,
    date: PropTypes.shape().isRequired,
    handleChange: PropTypes.func,
    showTime: PropTypes.bool.isRequired,
    disableTime: PropTypes.bool.isRequired,
};

DateTimeSpan.defaultProps = {
    className: 'datetime-span',
    date: moment(),
    showTime: true,
    disableTime: false,
};

export default DateTimeSpan;
