import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './TypeEvent.scss';

const TypeEvent = (props) => {

    return(
        <ul className='c-type-list'>
            {_.map(props.types,(type, i) => {
                return <li className={`c-type-list__item c-type-list__item--${props.types[i].key}`}
                           key={props.types[i].key}
                           onClick={props.onClick.bind(null, i)}
                >
                    {props.types[i].title}
                </li>
            })}
        </ul>
    )
};

TypeEvent.propTypes = {
    onClick: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
    })),
};



export default TypeEvent;

