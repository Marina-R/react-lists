import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../ui/Item/Item';
import './List.css';

function List({ data, onClick }) {
    const [ selected, setSelected ] = useState(0, []);
    const handleClick = index => setSelected(index);

    const handler = (e, index) => {
        if (selected !== index)
            handleClick(index);
        return onClick(e);
    };

    return (
        <ul className='list'>
            {data.length && data.map((item, index) =>
                <Item
                    key={index}
                    label={item}
                    selected={index === selected}
                    onClickHandler={(e) => handler(e, index)}
                />
            )}
        </ul>
    );
}

List.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default List;