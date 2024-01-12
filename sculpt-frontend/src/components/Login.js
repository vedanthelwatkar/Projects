import React, { useState } from 'react'
import './Login.css';
import '../index.css'
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const { showAlert } = props; //destructuring
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://sculpt.onrender.com/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
            // Save the auth-token and redirect
            localStorage.setItem('access_token', json.newAuthToken);
            localStorage.setItem('refresh_token', json.newRefreshToken);
            showAlert("Logged In Successfully", "success")
            navigate("/");
        }
        else {
            showAlert("Invalid Credentials", "danger");
        }
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const to_register = () => {
        navigate("/register");
    }

    return (
        <>
            <div className='l-background'>
                <div className="log">
                    <div className="log-fm">
                        <form onSubmit={handleSubmit} className="lform">
                            <div className="login-logo">
                                <img className='login-img' src={logo} alt="logo" />
                                <p>For Fitter and Healthier You</p>
                            </div>
                            <h4>Sign In</h4>
                            <div className="login-input-box">
                                <input className='main-color login-email' type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Enter your email" />
                                <div className="login-icon"><i className='bx bxs-user'></i><p>|</p></div>
                            </div>
                            <div className="login-input-box">
                                <input type="password" className='login-pass' name="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" />
                                <div className="login-icon"><i className='bx bxs-lock-alt'></i><p>|</p></div>
                            </div>
                            <div className="login-pass-right">
                                <p>Forgot password?</p>
                            </div>
                            <button type="submit" className="login-button login-button-2">Submit</button>
                            <div className="login-new-user">
                                <span>New to Sculpt?</span>
                                <p onClick={to_register}>SignUp</p>
                            </div>
                            <div className="login-extra">
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

export default Login