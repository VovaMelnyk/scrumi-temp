import React from 'react';
import moment from 'moment';
import uuid from 'uuid';

import PropTypes from 'prop-types';

import './DatePickerCell.scss';

function DatePickerCell(props) {
    let className = `${props.className}__cell`;
    className += (props.cellDate.isSame(moment(), 'day') ? ` ${props.className}_today` : '');
    className += !props.cellDate.isSame(moment(props.shownMonth, 'MM.YYYY'), 'month') ? ` ${props.className}_other-month` : '';
    className += props.cellDate.isSame(moment(props.selectedDate), 'day') ? ` ${props.className}_selected-date` : '';
    className += !props.cellDate.day() ? ` ${props.className}_sunday` : '';

    return (
        <li
            className={className}
            key={uuid()}
            onClick={props.handleClick.bind(null, props.cellDate)}>
            {props.cellDate.format('DD')}
        </li>
    )
}

DatePickerCell.propTypes = {
    className: PropTypes.string.isRequired,
    cellDate: PropTypes.object.isRequired,
    shownMonth: PropTypes.string.isRequired,
    selectedDate: PropTypes.object.isRequired,
    parentElement: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

DatePickerCell.defaultProps = {
    className: 'date-picker',
    cellDate: moment(),
    shownMonth: moment().format('MM.YYYY'),
    selectedDate: moment(),
    parentElement: 'date-field'
};

export default DatePickerCell;
