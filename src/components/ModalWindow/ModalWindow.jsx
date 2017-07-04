import  React from 'react';
import  PropTypes from 'prop-types';
import './ModalWindow.scss';

export default class ModalWindow extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
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
    children: PropTypes.node
};
