import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './MonthCell.scss';

const Open = (props) => {
    return (
        <div className={props.className}></div>
    )
};


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
            this.props.handleHide(this.props.cellDate);
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
        let inputProps = {};
        if (typeof this.props.handleClick == 'function') {
            inputProps.onClick = this.props.handleClick.bind(null, this.props.cellDate, true);
        }
        return(
            <div
                className={className}
                {...inputProps}
            >
                <span className="date">
                    {this.props.cellDate.format('DD')}
                </span>
                {this.props.children}
               {this.props.children[0].length > 2  ? <Open className={this.props.test}/> : false}
            </div>
        )
    }
}

MonthCell.propTypes = {
    cellDate: PropTypes.shape().isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    handleClick: PropTypes.func,
    canHide: PropTypes.bool,
    handleHide: PropTypes.func,
};

MonthCell.defaultProps = {
    canHide: false,
};

export default onClickOutside(MonthCell);


