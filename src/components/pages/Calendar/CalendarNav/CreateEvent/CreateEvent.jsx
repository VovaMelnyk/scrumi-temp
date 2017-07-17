import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './CreateEvent.scss';

import Button from '../../Button/Button';
import TypeEvent from '../../TypeEvent/TypeEvent';

export default class CreateEvent extends React.Component {
    constructor() {
        super ();
        this.state = {
            visible: false,
            eventWindowVisible: false,
            eventType: 0,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSelectEventType = this.handleSelectEventType.bind(this);
        this.handleEventWindowHide = this.handleEventWindowHide.bind(this);
    }

    handleClick() {
        this.setState({
            visible: !this.state.visible,
        });
    }


    handleSelectEventType(eventType) {
        this.props.handleCreateEvent(eventType);
        this.handleClick();
    }

    handleEventWindowHide() {
        this.setState({
            eventWindowVisible: false,
        })
    }

    render() {

        return(
            <div className='event'>
                <Button
                    className="button-green"
                    text="Создать событие"
                    onClick={this.props.handleCreateEvent.bind(null, 0, moment())}
                    id={'Создать событие'}/>
                <Button className='button-green button-green--caret' text={String.fromCharCode(9660)} onClick={this.handleClick} id={'Показать список'}/>
                {this.state.visible &&
                <TypeEvent
                    types = {[
                    {title:'Событие', key:'custom'},
                    {title:'Стендап', key:'standup'},
                    {title:'Демо', key:'demo'},
                    {title:'Ретро', key:'retro'}
                    ]}
                    handleClick={this.handleClick}
                    onClick={this.handleSelectEventType}
                    outsideClickIgnoreClass={'button-green--caret'}
                />
                }
            </div>
        );
    }
}


CreateEvent.propTypes = {
    handleSaveEvent: PropTypes.func.isRequired,
    handleCreateEvent: PropTypes.func.isRequired,
};
