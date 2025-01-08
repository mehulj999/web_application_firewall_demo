import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface FormState {
    email: string;
    password: string;
    full_name?: string;
    phone_number?: string;
    date_of_birth?: string;
    address?: string;
}

const LoginRegister: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [action, setAction] = useState<string>('');
    const [registerForm, setRegisterForm] = useState<FormState>({
        email: '',
        password: '',
        full_name: '',
        phone_number: '',
        date_of_birth: '',
        address: '',
    });
    const [loginForm, setLoginForm] = useState<FormState>({ email: '', password: '' });
    const [message, setMessage] = useState<string>('');

    const registerLink = () => setAction(' active');
    const loginLink = () => setAction('');

    const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string): boolean => {
        const allowedDomains = ['@gmail.com', '@hotmail.com', '@ue-germany.de', '@yahoo.com', '@live.com'];
        return allowedDomains.some((domain) => email.endsWith(domain));
    };

    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(registerForm.email)) {
            setMessage('Invalid email domain. Please use a valid email.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerForm),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully');
                setRegisterForm({
                    email: '',
                    password: '',
                    full_name: '',
                    phone_number: '',
                    date_of_birth: '',
                    address: '',
                });
            } else {
                setMessage(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                setMessage('User logged in successfully');
                setLoginForm({ email: '', password: '' });

                const is_admin = result.is_admin;
                window.location.href = '/monitoring';

                login();
    
                // Redirect based on user role
                if (result.is_admin) {
                    navigate('/monitoring'); // Navigate to monitoring page for admin
                } else {
                    navigate('/home'); // Navigate to home page for regular users
                }
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

            <div className="form-box register">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="full_name"
                            value={registerForm.full_name}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone_number"
                            value={registerForm.phone_number}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            name="date_of_birth"
                            value={registerForm.date_of_birth}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={registerForm.address}
                            onChange={handleRegisterChange}
                            required
                        />
                    </div>
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
