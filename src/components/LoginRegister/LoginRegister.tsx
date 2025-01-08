import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface FormState {
    email: string;
    password: string;
}

const LoginRegister: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate
    const [action, setAction] = useState<string>('');
    const [registerForm, setRegisterForm] = useState<FormState>({ email: '', password: '' });
    const [loginForm, setLoginForm] = useState<FormState>({ email: '', password: '' });
    const [message, setMessage] = useState<string>('');

    // Toggle between login and register views
    const registerLink = () => setAction(' active');
    const loginLink = () => setAction('');

    // Handle input changes for the register form
    const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle input changes for the login form
    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string): boolean => {
        const allowedDomains = ['@gmail.com', '@hotmail.com', '@ue-germany.de', '@yahoo.com', '@live.com'];
        return allowedDomains.some((domain) => email.endsWith(domain));
    };

    // Handle register submission
    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(registerForm.email)) {
            setMessage('Invalid email domain. Please use a valid email.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: registerForm.email,
                    password: registerForm.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully');
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
    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const hashPassword = async (password: string) => {
        //     const encoder = new TextEncoder();
        //     const data = encoder.encode(password);
        //     const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        //     const hashArray = Array.from(new Uint8Array(hashBuffer));
        //     const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
        //     return hashHex;
        // };
        
        // const hashedPassword = await hashPassword(loginForm.password);

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User logged in successfully');
                setLoginForm({ email: '', password: '' });
                const is_admin = result.is_admin; // Assuming the response contains an is_admin field
                window.location.href = "/monitoring";
                navigate('/monitoring');
                login();

                if (is_admin === false) {
                    navigate('/monitoring');
                }
            }
                
            //     login();

            //     if (loginForm.email === 'admin@gmail.com' && loginForm.password === 'ttticc') {
            //         navigate('/monitoring');
            //     } else {
            //         navigate('/main');
            //     }
            // } else {
            //     setMessage(result.error || 'Login failed');
            // }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            {/* Login Form */}
            <div className="form-box login">
                <form onSubmit={handleLoginSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <a href="#" onClick={registerLink}>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>

            {/* Register Form */}
            <div className="form-box register">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            required
                        />
                        <MdEmail className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>
                            Already have an account?{' '}
                            <a href="#" onClick={loginLink}>
                                Login
                            </a>
                        </p>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default LoginRegister;
