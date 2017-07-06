import React from 'react';


import ModalWindow from '../ModalWindow/ModalWindow';
import './QuestionWindow.scss';
import Button from '../pages/Calendar/Button/Button';

export default class ConfirmWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }


    render() {
        return(
            <ModalWindow className='questionWindow'>
                <p>{this.props.text}</p>
                <Button text='Yes'
                    className='button-green'
                />
                <Button text='No'
                    className='button-red'/>
            </ModalWindow>
        );
    }
}
