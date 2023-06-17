import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { nutritionDropdown } from './StoreNavItems';
import './StoreDropdown.css';

function NutritionDropdown() {
    const [nutritionDropDown, setNutritionDropDown] = useState(false);
    return (
        <>
            <ul className={nutritionDropDown ? "store-submenu-items selected" : "store-submenu-items"}
                onClick={() => setNutritionDropDown(!nutritionDropDown)}>
                {
                    nutritionDropdown.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={item.path} className={`store-${item.cName}`} onClick={() => setNutritionDropDown(false)}>{item.title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default NutritionDropdown;