import React from 'react';
import Message from './Message/Message';

export default class Chat extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <Message data={'I\'m a chat message 1'}/>
                <Message data={'I\'m a chat message 2'}/>
            </div>
        );
    }
}
