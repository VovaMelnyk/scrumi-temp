import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './TypeEvent.scss';

const TypeEvent = (props) => {
    let types = [
        {title:'Событие', key:'custom'},
        {title:'Стендап', key:'standup'},
        {title:'Демо', key:'demo'},
        {title:'Ретро', key:'retro'}
    ];
    return(
        <ul className='c-type-list'>
            {_.map(types,(type, i) => {
                return <li className={`c-type-list__item c-type-list__item--${type.key}`}
                           key={type.key}
                           onClick={props.onClick.bind(null, i)}
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

