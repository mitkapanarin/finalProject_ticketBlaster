import '../SignUp/SignUp.css';
import React, { useState } from 'react';
import InputField from '../../components/Form/InputField';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const store = useSelector((state) => state);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div>
            <section className="signup-section">
                <div className="signup-container">
                    <div className="signup-card">
                        <div className="signup-card-content">
                            <h1 className="signup-title">Create account</h1>
                            <form className="signup-form" onSubmit={handleSubmit}>
                                <InputField
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={handleInput}
                                    label="Full Name"
                                    placeholder="Your username"
                                    required={true}
                                    className="signup-input"
                                />
                                <InputField
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleInput}
                                    label="Email"
                                    placeholder="name@company.com"
                                    required={true}
                                    className="signup-input"
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleInput}
                                    label="Password"
                                    placeholder="Enter your password"
                                    required={true}
                                    className="signup-input"
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleInput}
                                    label="Re-type Password"
                                    placeholder="Re-enter your password"
                                    required={true}
                                    className="signup-input"
                                />
                                <button type="submit" className="signup-button">Create account</button>
                                <button type="submit" className="signup-button">Already have an account?</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Signup;

