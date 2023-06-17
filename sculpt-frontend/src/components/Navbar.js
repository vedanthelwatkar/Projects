import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from '../images/logo.png';

function NavBar() {
    let navigate = useNavigate();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink to="/" className="nav-logo">
                        <img src={logo} alt="Logo" />;
                        {/* <i className="fas fa-code"></i> */}
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/fitness"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Fitness
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/mind"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Mind
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/care"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Care
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/store"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Store
                            </NavLink>
                        </li>
                    </ul>
                    <li className="nav-item nav-sign">
                        {/* <NavLink
                            exact to="/sign-up"
                            activeClassName="active"
                            className="nav-links"
                            onClick={handleClick}
                        >
                            Sign Up
                        </NavLink> */}
                        {/* <NavBtn> */}
                        {/* <NavBtnLink to='/login'>Sign In</NavBtnLink> */}
                        {!((localStorage.getItem('access_token')) && (localStorage.getItem('refresh_token'))) ?
                            <form className="d-flex" role="search">
                                <NavLink exact to="/login" activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick} trole="button">Login</NavLink>
                                <NavLink exact to="/register" activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick} role="button">Signup</NavLink>
                            </form>
                            : <NavLink exact to='/login' activeClassName="active"
                                className="nav-links" onClick={handleLogout}>Logout</NavLink>
                        }
                        {/* </NavBtn> */}
                    </li>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
