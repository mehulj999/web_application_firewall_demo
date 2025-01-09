import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt, FaRegAddressBook } from "react-icons/fa";

interface FormState {
  email: string;
  password: string;
  full_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  address?: string;
}

const LoginRegister: React.FC = () => {
  const { setUser } = useAuth(); // Use setUser from AuthContext
  const navigate = useNavigate();

  const [action, setAction] = useState<string>(''); // Default to login view
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

  const registerLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAction(' active');
    setMessage('');
  };

  const loginLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAction('');
    setMessage('');
  };

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
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result); // Update AuthContext with registered user
        setMessage('User registered successfully');
        setRegisterForm({
                    email: '',
                    password: '',
                    full_name: '',
                    phone_number: '',
                    date_of_birth: '',
                    address: '',
                });
        setAction(''); // Switch to login form
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
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result); // Update AuthContext with logged-in user
        setMessage('User logged in successfully');
        setLoginForm({ email: '', password: '' });

        // Redirect based on user role
        if (result.is_admin) {
          navigate('/monitoring');
        } else {
          navigate('/home');
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
      {message && <p className="message">{message}</p>}
      <div className="form-box login">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
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
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={registerLink}>
              Register
            </a>
          </p>
        </form>
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
                        <IoPerson className="icon"/>
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
                        <FaPhoneAlt className="icon"/>
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
                        {/* <FaRegCalendarAlt className="icon"/> */}
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
                        <FaRegAddressBook className="icon"/>
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
      </div>
    </div>
  );
};

export default LoginRegister;