import  React from 'react';
import {NavLink} from 'react-router-dom';


import './Period.scss'
import Button from '../../Button/Button';


export default class Period extends React.Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            period: 'Месяц'
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeToMonth = this.changeToMonth.bind(this);
        this.changeToSprint = this.changeToSprint.bind(this);
    }

    handleClick() {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeToMonth () {
        this.setState({
            visible: !this.state.visible,
            period: 'Месяц'
        })
    }

    changeToSprint() {
        this.setState({
            visible: !this.state.visible,
            period: 'Спринт'
        });
    }

     render(){
         return (
             <div className='period'>
                 <span className='period__text'>Отобразить:</span>
                 <span className='period__choose' onClick={this.handleClick}>{this.state.period}</span>
                 <span className="period__symbol" onClick={this.handleClick}></span>

                 {this.state.visible&&
                 <ul className='period__menu'>
                     <li className='period__menu-item' onClick={this.changeToMonth}>
                         <NavLink to='/calendar'>Месяц</NavLink>
                     </li>
                     <li className='period__menu-item' onClick={this.changeToSprint}>
                         <NavLink exact to='/calendar/sprint'>Спринт</NavLink>
                     </li>
                 </ul>
                 }
             </div>

         )
    }
}

