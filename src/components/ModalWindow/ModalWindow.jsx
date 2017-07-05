import  React from 'react';
import  PropTypes from 'prop-types';
import './ModalWindow.scss';

export default class ModalWindow extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if(!this.props.showModal) {
            return null;
        }

        return(
            <div className='overlay' onClick={this.props.onCloseModal}>
                <div className={`modal ${this.props.className}`}>
                    <span className='modal__close' onClick={this.props.onCloseModal}>{String.fromCharCode(10006)}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ModalWindow.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    children: PropTypes.node,
    className: PropTypes.string.isRequired
};
