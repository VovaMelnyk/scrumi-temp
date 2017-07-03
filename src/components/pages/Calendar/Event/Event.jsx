import React from 'react';
import PropTypes from 'prop-types';

import './Event.scss';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editEvent: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.event);
    }

    render() {
        return (
            <div
                className={this.props.className}
                onClick={this.handleClick}>
                {this.props.event.assignType!==2 &&
                    <span>{this.props.event.startDate.format('kk:mm')}</span>}
                <span>{this.props.event.title}</span>
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
    }),
    handleClick: PropTypes.func.isRequired
};

Event.defaultProps = {
    className: 'c-event'
};

export default Event;
