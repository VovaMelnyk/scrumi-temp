import React from 'react';

import './Counter.scss';

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newItems: 7
        }
    }

    render() {
        return (
            <span
                className={this.state.newItems > 0 ? 'counter counter_active' : 'counter'}>
                {this.state.newItems}
            </span>
        )
    }
}

export default Counter;
