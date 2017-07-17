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
                    switchMonth = {this.props.switchMonth}
                />
                <CreateEvent
                    onCloseModal={this.props.onCloseModal}
                    handleSaveEvent={this.props.handleSaveEvent}
                    handleCreateEvent={this.props.handleCreateEvent}
                />
            </div>
        );
    }
}

CalendarNav.propTypes = {
    period: PropTypes.shape().isRequired,
    onClick: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    handleSaveEvent: PropTypes.func.isRequired,
    handleCreateEvent: PropTypes.func.isRequired,
};
