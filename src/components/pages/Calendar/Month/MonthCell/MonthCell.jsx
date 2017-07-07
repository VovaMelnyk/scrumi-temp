import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './MonthCell.scss';



class MonthCell extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside (evt) {
        if (this.props.canHide) {
            console.log('click outside event list');
            this.props.handleClick(this.props.cellDate, false);
        }
    }

    handleClick() {
        this.setState({

        })
    }

    render() {
        let className = 'c-date__cell' + (this.props.className ? ` ${this.props.className}` : '');
        className += this.props.cellDate.isSame(moment(), 'day') ? ` today` : '';
        className += this.props.cellDate.isSame(moment(this.props.month), 'month') ? `` : ' other-month';
        return(
            <div
                className={className}
                onClick={this.props.handleClick.bind(null, this.props.cellDate, true)}
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
    children: PropTypes.node,
    className: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
    canHide: PropTypes.bool,
};

MonthCell.defaultProps = {
    canHide: false,
};

export default onClickOutside(MonthCell);
