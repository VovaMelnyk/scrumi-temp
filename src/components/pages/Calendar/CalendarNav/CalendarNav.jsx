import React from 'react';
import PropTypes from 'prop-types';


import './CalendarNav.scss';

import CreateEvent from './CreateEvent/CreateEvent';
import Period from './Period/Period';
import SwitchMonth from './SwitchMonth/SwitchMonth'



export default class CalendarNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='c-nav'>
                <Period />
                <SwitchMonth
                    period ={this.props.period}
                    onClick = {this.props.onClick}
                />
                <CreateEvent
                    onCloseModal={this.props.onCloseModal}
                />
            </div>
        );
    }
}

CalendarNav.propTypes = {
    period: PropTypes.shape().isRequired,
    onClick: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired

};
