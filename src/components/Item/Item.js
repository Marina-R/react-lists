import React from 'react';
import PropTypes from 'prop-types';
import './Item.css';

function Item({ label, onClickHandler, selected }) {
    return (
        <li className={'list-item' + (selected ? ' selected' : '')} onClick={ onClickHandler }>
            { label }
        </li>
    );
}

Item.propTypes = {
    label: PropTypes.string,
    selected: PropTypes.bool,
    onClickHandler: PropTypes.func.isRequired,
};

export default Item;