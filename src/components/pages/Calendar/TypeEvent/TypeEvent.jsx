import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './TypeEvent.scss';

const TypeEvent = (props) => {
    let types = [
        {title:'Custom event', key:'custom'},
        {title:'Stand Up', key:'standup'},
        {title:'Demo', key:'demo'},
        {title:'Retro', key:'retro'}
    ];
    return(
        <ul className='c-type-list'>
            {_.map(types,(type) => {
                return <li className={`c-type-list__item c-type-list__item--${type.key}`}
                           key={type.key}
                           onClick={props.onClick}
                >
                    {type.title}
                </li>
            })}
        </ul>
    )
};

TypeEvent.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default TypeEvent;

