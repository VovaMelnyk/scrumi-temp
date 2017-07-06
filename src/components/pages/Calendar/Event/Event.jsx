import React from 'react';
import PropTypes from 'prop-types';

import './Event.scss';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editEvent: false
        };

        this.classNames = ['standup', 'demo', 'retro'];

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.event);
    }

    render() {
        return (
            <div
                className={this.props.className + (this.props.event.eventType ? ` ${this.props.className}--${this.classNames[this.props.event.eventType - 1]}` : '')}
                onClick={this.handleClick}>
                {this.props.event.assignType!==2 &&
                    <span className={`${this.props.className}__time`}>{this.props.event.startDate.format('kk:mm')}</span>}
                <span className={`${this.props.className}__cell`}>{this.props.event.title}</span>
            </div>
        )
    }
}

Event.propTypes = {
    className: PropTypes.string.isRequired,
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        startDate: PropTypes.shape.isRequired,
        endDate: PropTypes.shape.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired
    }).isRequired,
    handleClick: PropTypes.func.isRequired
};

Event.defaultProps = {
    className: 'c-event'
};

export default Event;
