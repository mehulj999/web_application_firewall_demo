import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    // Toggle between login and register views
    const registerLink = () => setAction(' active');
    const loginLink = () => setAction('');

    // Handle input changes for the register form
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    // Handle input changes for the login form
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    // Handle register submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: registerForm.email,
                    password: registerForm.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully');
                // Clear the form fields
                setRegisterForm({ email: '', password: '' });
            } else {
                setMessage(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    // Handle login submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User logged in successfully');
                // Clear the form fields
                setLoginForm({ email: '', password: '' });
            } else {
                setMessage(result.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            {/* Login Form */}
            <div className='form-box login'>
                <form onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input
                            type="text"
                            placeholder='Email'
                            name="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>

            {/* Register Form */}
            <div className='form-box register'>
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default LoginRegister;
