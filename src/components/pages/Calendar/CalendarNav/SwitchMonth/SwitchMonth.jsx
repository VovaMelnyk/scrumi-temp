import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import "moment/locale/ru";

import ArrowLeft from '../../../../Menu/img/ArrowLeft.svg'
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
            <div className='current-month'>
                <span className='current-month__left-arrow'
                      onClick={this.props.onClick.bind(null, -1)} >{String.fromCharCode(8592)}</span>
                <div className='current-month__date'>
                    <span className="year">{this.state.now.format('YYYY')}</span>
                    <span className="month">{this.state.now.format('MMMM')}</span>
                </div>
                <span className='current-month__right-arrow'
                      onClick={this.props.onClick.bind(null, 1)}>{String.fromCharCode(8594)}</span>

            </div>
        )
    }
}

SwitchMonth.propTypes = {
    period: PropTypes.shape().isRequired,
    onClick: PropTypes.func.isRequired,

};
