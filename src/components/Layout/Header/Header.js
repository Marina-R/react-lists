import React from 'react';
import columns from '../../../utils/content/columns';
import './Header.css';

function Header() {
    const headerCols = columns.header;
    return (
        <header className='header'>
            { headerCols.length && headerCols.map(item => <span key={item.id} className='header-item'>{item.name}</span>) }
        </header>
    );
}

export default Header;