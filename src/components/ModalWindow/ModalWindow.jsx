import  React from 'react';
import  PropTypes from 'prop-types';
import './ModalWindow.scss';

class ModalWindow extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };

        this.stopPropagation = this.stopPropagation.bind(this);
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render(){
        return(
            <div className='overlay'
            onClick={this.props.onCloseModal}>
                <div className={`modal ${this.props.className}`}
                onClick={this.stopPropagation}>
                    <span className='modal__close' onClick={this.props.onCloseModal}>{String.fromCharCode(10006)}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ModalWindow.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string.isRequired
};

export default ModalWindow;
