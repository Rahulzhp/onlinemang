import React, { useState } from 'react';
import './Login.css'; // import CSS file for styling
import logo from '../Icons/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [invalid, setInvalid] = useState(false)
    const [disable, setdisable] = useState(false)
    const payload = {
        email,
        password
    }

    const onHendell = (e) => {
        console.log("logsavdghsa")
        if (email === '') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (password === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            setdisable(true)
            axios.post("https://doubtful-fox-dirndl.cyclic.app/users/login", payload)
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("techprime", res.data.token);
                        setInvalid(false)
                        navigate("/")
                        setdisable(false)

                    } else {
                        setInvalid(true)
                        setdisable(false)
                        setTimeout(() => {
                            setInvalid(false)
                        }, 1000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setdisable(false)
                })

        }
        e.preventDefault()


    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handletoLogin = () => {
        navigate("/signup")
    }
    return (
        <div className="login-container">
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                    <h4>Online Project Management</h4>
                </div>
                <div id="customer">
                    <div className="form-container">
                        <form onSubmit={onHendell}>
                            <h3>Login to get started</h3>
                            <span style={{ color: emailError ? "red" : '' }}>Email</span>
                            <div className="Username-input-container">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={emailError ? 'error' : ''}

                                />
                            </div>
                            {emailError && <span className="error-text">Email is required</span>}
                            <span style={{ color: passwordError ? "red" : '' }}>Password</span>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={passwordError ? 'error' : ''}

                                />
                                <span
                                    className={`password-toggle ${showPassword ? 'visible' : ''}`}
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </span>
                            </div>
                            {passwordError && <span className="error-text">Password is required</span>}
                            <div className="forgot-password">
                                <a id="red-link">
                                    Forgot password
                                </a>
                            </div>
                            <div>
                                {
                                    invalid ? <p style={{ textAlign: "start", color: "red" }}>Invalid Credential</p> : ""
                                }
                            </div>
                            <button type="submit" disabled={disable} style={{ backgroundColor: disable ? "gray" : "rgb(4, 115, 215)" }}>Login</button>

                        </form>
                    </div>
                    <div id='register'>
                        <div >
                            <h1>NEW CUSTOMERS</h1>
                            <hr></hr>
                        </div>
                        <div>
                            <p>Create an account to manage project and analyze through ApexCharts.js</p>
                        </div>
                        <button onClick={handletoLogin}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
