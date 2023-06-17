import React, { useState } from 'react';
import './Register.css';
import '../index.css'
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        number: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, number, email, password } = credentials; // Destructuring
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, number, email, password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            showAlert("Updated Successfully", "success")
        }
        else {
            showAlert("Invalid Credentials", "danger")
        }
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <div className='r-background'>
                <div className="register">
                    {console.log("User", credentials)}
                    <div className="register-form">
                        <form onSubmit={handleSubmit} className="rform">
                            <div className="rlogo">
                                <img className='reg-img' src={logo} alt="logo" />
                                <p>For Fitter and Healthier You</p>
                            </div>
                            <h4>Sign Up</h4>
                            <div className="register-details">
                                <div className="register-input-info register-input-name">
                                    <div className="register-input_box r-l">
                                        <p>First Name</p>
                                        <input id="reg-firstName" name="firstName" type="text" value={credentials.firstName} onChange={handleChange} placeholder="Enter your First Name" />
                                    </div>
                                    <div className="register-input_box r-r">
                                        <p>Last Name</p>
                                        <input id="reg-lastName" name="lastName" type="text" value={credentials.lastName} onChange={handleChange} placeholder="Enter your Last Name" />
                                    </div>
                                </div>
                                <div className="register-input-info register-input-details">
                                    <div className="register-input_box r-l">
                                        <p>Phone Number</p>
                                        <input id="reg-number" name="number" type="number" value={credentials.number} onChange={handleChange} placeholder="Enter your number" />
                                    </div>
                                    <div className="register-input_box r-r">
                                        <p>Email</p>
                                        <input id="reg-email" name="email" type="email" value={credentials.email} onChange={handleChange} placeholder="Enter your email" />
                                    </div>
                                </div>
                                <div className="register-input-info register-input-pass">
                                    <div className="register-input_box r-l">
                                        <p>Password</p>
                                        <input id="reg-pass" name="password" type="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" />
                                        {/* <input className='form-control' type="password" id="password" name='password' value={credentials.password} onChange={handleChange} minLength={5} placeholder="Confirm your password" /> */}
                                    </div>
                                    <div className="register-input_box r-r">
                                        <p>Confirm Password</p>
                                        <input id="reg-confirm" name="confirmPassword" type="password" value={credentials.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="r-button r-button-2">Submit</button>
                            <hr />
                            <div className='register-other'>
                                <h3>Or Sign Up using</h3>
                                <div className="register-other-methods">
                                    <i className='bx bxl-google'></i>
                                    <i className='bx bxl-facebook-circle'></i>
                                    <i className='bx bxl-twitter'></i>
                                </div>
                            </div>
                            <div className="r-extra">
                                <p>Terms & Conditions</p>
                                <span>|</span>
                                <p>Privacy Policy</p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register