import React from 'react';
import DatePicker from './../../DatePicker/DatePicker';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './Calendar.scss';

import CalendarNav from './CalendarNav/CalendarNav';
import Month from './Month/Month'
import Sprint from './Sprint/Sprint'
import ModalWindow from '../../ModalWindow/ModalWindow'



export default class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            fromDate: moment(),
            isOpenModal: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleClick() {
        this.setState({
            visible: !this.state.visible
        })
    }

    handleSelect(newDate) {
        this.setState({
            fromDate: moment(newDate)
        })
    }

    switchMonth(period) {
        this.setState ({
            fromDate: this.state.fromDate.add(period,'month')
        })
    }

    toggleModal() {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    render() {
        return (
            <div className='calendar'>
                <CalendarNav
                period = {this.state.fromDate}
                onClick = {this.switchMonth}
                onCloseModal={this.toggleModal}
                />
                {/*<span*/}
                    {/*id='date-field'*/}
                    {/*onClick={this.handleClick}>{this.state.fromDate.format('DD MMMM YYYY')}*/}
                {/*</span>*/}
                {/*{this.state.visible &&*/}
                    {/*<DatePicker selectedDate={moment(this.state.fromDate)}*/}
                    {/*hideDatePicker={this.handleClick}*/}
                    {/*handleSelect={this.handleSelect}/>*/}
                {/*}*/}
                <Route exact path='/calendar' render={()=><Month period={this.state.fromDate}/>}/>
                <Route  path='/calendar/sprint' component={Sprint} />
                <ModalWindow showModal={this.state.isOpenModal}
                             onCloseModal={this.toggleModal}>
                </ModalWindow>
            </div>
        );
    }
}
