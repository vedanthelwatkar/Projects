import React from 'react';
import "./Footer.css";
import logo from "../images/logo.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <img src={logo} alt="logo" />
                <p>At Sculpt we mae group workouts fun, daiy food healthy & tasty, mental health easy with yoga & meditation. Medical & lifestyle care husslefree.</p>
                <div className="footer-social">
                    <a href="/#"><i className="fa fa-facebook"></i></a>
                    <a href="/#"><i className="fa fa-twitter"></i></a>
                    <a href="/#"><i className="fa fa-instagram"></i></a>
                    <a href="/#"><i className="fa fa-youtube"></i></a>
                </div>
            </div>
            <ul className="footer-right">
                <li>
                    <ul className="footer-box">
                        <li><a href="/#">Sculpt.fit for business</a></li>
                        <li><a href="/#">Sculpt.fit franchise</a></li>
                        <li><a href="/#">Corporate partnership</a></li>
                        <li><a href="/#">Sculpt pass network</a></li>
                    </ul>
                </li>

                <li className="footer-features">
                    <ul className="footer-box">
                        <li><a href="/#">partner.fit</a></li>
                        <li><a href="/blogs">blogs</a></li>
                        <li><a href="/#">security</a></li>
                        <li><a href="/#">careers</a></li>
                    </ul>
                </li>

                <li >
                    <ul className="footer-box">
                        <li><a href="/contact">Contact us</a></li>
                        <li><a href="/#">Privacy policy</a></li>
                        <li><a href="/bmi">Sculpt bmi calculator</a></li>
                        <li><a href="/#">Terms and conditions</a></li>
                    </ul>
                </li>
            </ul>
            <div className="footer-bottom" />
            <p>All rights are reserved</p>
        </footer>
    )
}


