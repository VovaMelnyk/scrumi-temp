import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import "moment/locale/ru";

import './SwitchMonth.scss';

export default class SwitchMonth extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            now: this.props.period
        };
    }
    render(){
        return(
            <div className="month-change">
                <p onClick={this.props.onClick.bind(null, -1)}>Minus</p>
                <p className='month'>{this.state.now.format('MMMM')}</p>
                <p onClick={this.props.onClick.bind(null, 1)}>Plus</p>
            </div>
        )
    }
}

SwitchMonth.propTypes = {
    period: PropTypes.shape().isRequired,
    onClick: PropTypes.func.isRequired,

};
