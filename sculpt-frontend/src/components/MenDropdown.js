import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menDropdown } from './StoreNavItems';
import './StoreDropdown.css';

function MenDropdown() {
    const [menDropDown, setMenDropDown] = useState(false);
    return (
        <>
            <ul className={menDropDown ? "store-submenu-items selected" : "store-submenu-items"}
                onClick={() => setMenDropDown(!menDropDown)}>
                {
                    menDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={item.path} className={`store-${item.cName}`} onClick={() => setMenDropDown(false)}>{item.title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default MenDropdown