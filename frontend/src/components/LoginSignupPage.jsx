import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Tracks login vs sign-up mode
    const [userDetails, setUserDetails] = useState({
        fullname: '',
        phone_number: '',
        email: '',
        password: '',
        emailOrPhone: '', // Field for login
    });
    const navigate = useNavigate();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setUserDetails({
            fullname: '',
            phone_number: '',
            email: '',
            password: '',
            emailOrPhone: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLogin) {
            // Login logic
            try {
                const response = await axios.post('http://localhost:5000/auth/login', {
                    emailOrPhone: userDetails.emailOrPhone,
                    password: userDetails.password,
                });
                localStorage.setItem('userId', response.data.userId);
                navigate('/book-slot'); // Redirect to booking page
            } catch (error) {
                alert(error.response?.data?.error || 'Login failed. Please try again.');
            }
        } else {
            // Sign-up logic
            try {
                const response = await axios.post('http://localhost:5000/auth/signup', {
                    fullname: userDetails.fullname,
                    phone_number: userDetails.phone_number,
                    email: userDetails.email,
                    password: userDetails.password,
                });
                alert('Sign-up successful! Please log in.');
                toggleAuthMode(); // Switch to login mode
            } catch (error) {
                alert(error.response?.data?.error || 'Sign-up failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-signup-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="fullname"
                                value={userDetails.fullname}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Phone Number:
                            <input
                                type="tel"
                                name="phone_number"
                                value={userDetails.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                    </>
                )}
                {isLogin && (
                    <>
                        <label>
                            Email or Phone Number:
                            <input
                                type="text"
                                name="emailOrPhone"
                                value={userDetails.emailOrPhone}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                    </>
                )}
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={toggleAuthMode} style={{ cursor: 'pointer', color: 'blue' }}>
                {isLogin ? "Don't have an account? Sign up here." : 'Already have an account? Log in here.'}
            </p>
        </div>
    );
};

export default LoginSignupPage;
