import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './TimePicker.scss';

class TimePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTime: this.props.selectedTime ? this.props.selectedTime.format('kk:mm') : ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.value.length > 5) {
            return
        }
        if (e.target.value.length === 0) {
            this.props.handleTimeChange(null, false);
        }
        this.setState({
            selectedTime: e.target.value
        });
        if (moment(e.target.value, 'kk:mm').isValid()) {
            this.props.handleTimeChange(moment(e.target.value, 'kk:mm'), true);
        }
    }

    render() {
        return (
            <div className={'g-time-picker'}>
                <input
                    className='g-time-picker__time'
                    type='text'
                    value={this.state.selectedTime}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

TimePicker.propTypes = {
    selectedTime: PropTypes.object.isRequired,
    handleTimeChange: PropTypes.func.isRequired
};

export default TimePicker;
