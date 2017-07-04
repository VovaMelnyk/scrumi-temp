import  React from 'react';
import  PropTypes from 'prop-types';
import './ModalWindow.scss';

export default class ModalWindow extends React.Component{
    constructor() {
        super();
    }

    render(){
        if(!this.props.showModal) {
            return null;
        }

        return(
            <div className='overlay'>
                <div className='modal'>
                    <span className='modal__close' onClick={this.props.onCloseModal}>{String.fromCharCode(10006)}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ModalWindow.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    children: PropTypes.node
};
