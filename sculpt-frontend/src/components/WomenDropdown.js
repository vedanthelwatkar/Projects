import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { womenDropdown } from './StoreNavItems';
import './StoreDropdown.css';

function WomenDropdown() {
    const [womenDropDown, setWomenDropDown] = useState(false);
    return (
        <>
            <ul className={womenDropDown ? "store-submenu-items selected" : "store-submenu-items"}
                onClick={() => setWomenDropDown(!womenDropDown)}>
                {
                    womenDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={item.path} className={`store-${item.cName}`} onClick={() => setWomenDropDown(false)}>{item.title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default WomenDropdown