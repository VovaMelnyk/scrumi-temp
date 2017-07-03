import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


import './MonthCell.scss';



export default class MonthCell extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({

        })
    }

    render() {
        let className = 'c-date__cell';
        className += this.props.cellDate.isSame(moment(), 'day') ? ` today` : '';
        className += this.props.cellDate.isSame(moment(this.props.month), 'month') ? `` : ' other-month';
        return(
            <div
                className={className}
            >
                <span className="date">
                    {this.props.cellDate.format('DD')}
                </span>
                {this.props.children}
            </div>
        )
    }
}

MonthCell.propTypes = {
    cellDate: PropTypes.shape().isRequired,
    children: PropTypes.node
};
