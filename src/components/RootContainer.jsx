import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Project from './Project/Project';
import Calendar from './pages/Calendar/Calendar';
import Chat from './pages/Chat/Chat';
import Board from './pages/Board/Board';
import Backlog from './pages/Backlog/Backlog';

export default class RootContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router history="">
                <div>
                    <Menu />
                    <Route exact path='/' component={Project} />
                    <Route path='/calendar' component={Calendar} />
                    <Route path='/chat' component={Chat} />
                    <Route path='/board' component={Board} />
                    <Route path='/backlog' component={Backlog} />
                </div>
            </Router>
        );
    }
}
