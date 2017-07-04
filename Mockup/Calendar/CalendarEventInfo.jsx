import React from 'react';
import './CalendarEventInfo.scss';

export default class CalendarEventInfo extends React.Component {
    render(){
        return(
            <div className="c-event-block">
                <div className="c-event">
                    <div className="c-event__cell">
                        <span className="c-event__time">10:30</span>
                        <span className="c-event__name">lorem ipsum</span>
                    </div>
                </div>
                <div className="c-event">
                    <div className="c-event__cell">
                        <span className="c-event__time">11:00</span>
                        <span className="c-event__name">Alarm</span>
                    </div>
                </div>
                <div className="c-event ">
                    <div className="c-event__cell c-event--standup">
                        <span className="c-event__time">11:45</span>
                        <span className="c-event__name">StandUP</span>
                    </div>
                </div>
                <div className="c-event">
                    <div className="c-event__cell c-event--demo">
                        <span className="c-event__time">12:00</span>
                        <span className="c-event__name">Demo</span>
                    </div>
                </div>
                <div className="c-event">
                    <div className="c-event__cell c-event--retro">
                        <span className="c-event__time">12:40</span>
                        <span className="c-event__name">Retro</span>
                    </div>
                </div>
                <div className="c-event">
                    <div className="c-event__cell">
                        <span className="c-event__time">14:45</span>
                        <span className="c-event__name">Go home</span>
                    </div>
                </div>
                <div className="c-event c-add-event">
                    <span className="c-add-event__style">+</span>
                </div>
            </div>
        );
    }
}
