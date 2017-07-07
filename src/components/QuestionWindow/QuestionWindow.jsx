import React from 'react';

import PropTypes from 'prop-types';
import ModalWindow from '../ModalWindow/ModalWindow';
import Button from '../pages/Calendar/Button/Button';
import './QuestionWindow.scss';


export default class QuestionWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }


    render() {
        return(
            <ModalWindow
                className='question'
                onCloseModal={this.props.onCloseModal}
            >
                <p className='question__text'>{this.props.text}</p>
                <div className="question__buttons">
                    <Button text='Нет'
                            className='button-red'
                            onClick={this.props.no}
                            id='Нет'
                    />
                    <Button text='Да'
                            className='button-green'
                            onClick={this.props.yes}
                            id='Да'
                    />
                </div>

            </ModalWindow>
    );
    }
}

QuestionWindow.propTypes = {
    text: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    yes: PropTypes.func.isRequired,
    no: PropTypes.func.isRequired,
};
