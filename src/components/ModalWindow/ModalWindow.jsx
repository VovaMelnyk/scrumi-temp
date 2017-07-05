import  React from 'react';
import  PropTypes from 'prop-types';
import './ModalWindow.scss';

export default class ModalWindow extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };

        this.stopPropagation = this.stopPropagation.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick, false);
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    handleClick(e) {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
            return
        }
        this.props.onCloseModal();
    }

    render(){
        return(
            <div className='overlay'>
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
