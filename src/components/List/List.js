import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';
import './List.css';

function List({ data, onClick, selectedValue }) {
    return (
        <ul className='list'>
            {data.length && data.map((label, index) =>
                <Item
                    key={index}
                    label={label}
                    selected={label === selectedValue}
                    onClickHandler={() => onClick(label)}
                />
            )}
        </ul>
    );
}

List.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onClick: PropTypes.func.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default List;