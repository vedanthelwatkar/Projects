import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { navItems } from './StoreNavItems';
import MenDropdown from './MenDropdown';
import WomenDropdown from './WomenDropdown';
import EquipDropdown from './EquipDropdown';
import NutritionDropdown from './NutritionDropdown';
import './StoreNavbar.css';

const StoreNavbar = (props) => {
    const navigate = useNavigate();

    const store_login = () => {
        navigate("/login");
    }

    const [menDD, setMenDD] = useState(false);
    const [womenDD, setWomenDD] = useState(false);
    const [equipDD, setEquipDD] = useState(false);
    const [nutritionDD, setNutritionDD] = useState(false);
    return (
        <>
            <div className='store-navbar'>
                <div className='store-nav-logo'>
                    <Link to="/" className='mind-logo'> <img src={logo} alt="logo" /></Link>
                </div>
                <div className='store-nav-menu'>
                    <ul className='store-menu-items'>
                        {
                            navItems.map((item) => {
                                if (item.title === "Men's Apparel") {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`store-${item.cName}`}
                                            onMouseEnter={() => setMenDD(true)}
                                            onMouseLeave={() => setMenDD(false)}>
                                            <Link to={item.path}>{item.title}</Link>
                                            {menDD && <MenDropdown />}
                                        </li>
                                    );
                                }
                                if (item.title === "Women's Apparel") {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`store-${item.cName}`}
                                            onMouseEnter={() => setWomenDD(true)}
                                            onMouseLeave={() => setWomenDD(false)}>
                                            <Link to={item.path}>{item.title}</Link>
                                            {womenDD && <WomenDropdown />}
                                        </li>
                                    );
                                }
                                if (item.title === "Equipments") {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`store-${item.cName}`}
                                            onMouseEnter={() => setEquipDD(true)}
                                            onMouseLeave={() => setEquipDD(false)}>
                                            <Link to={item.path}>{item.title}</Link>
                                            {equipDD && <EquipDropdown />}
                                        </li>
                                    );
                                }
                                if (item.title === "Nutrition") {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`store-${item.cName}`}
                                            onMouseEnter={() => setNutritionDD(true)}
                                            onMouseLeave={() => setNutritionDD(false)}>
                                            <Link to={item.path}>{item.title}</Link>
                                            {nutritionDD && <NutritionDropdown />}
                                        </li>
                                    );
                                }
                                return (
                                    <li key={item.id} className={`store-${item.cName}`}>
                                        <Link to={item.path}>{item.title}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className='store-nav-right'>
                    <div className='store-nav-login'>
                        <Link to={store_login}><i className='bx bx-user-circle'></i></Link>
                    </div>
                    <div className='store-nav-cart'>
                        <Link to="#"> <i className='bx bx-cart'></i> </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreNavbar