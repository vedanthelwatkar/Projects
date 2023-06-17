import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { equipDropdown } from './StoreNavItems';
import './StoreDropdown.css';

function EquipDropdown() {
    const [equipDropDown, setEquipDropDown] = useState(false);
    return (
        <>
            <ul className={equipDropDown ? "store-submenu-items selected" : "store-submenu-items"}
                onClick={() => setEquipDropDown(!equipDropDown)}>
                {
                    equipDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={item.path} className={`store-${item.cName}`} onClick={() => setEquipDropDown(false)}>{item.title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default EquipDropdown