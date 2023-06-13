import './ForgotPassword.css';
import React, { useState } from 'react';
import InputField from '../../components/Form/InputField';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (err) {
            console.log("error occurred");
            toast.error("Couldn't reset password, please try again");
        }
    };

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="psw-reset-container">
            <section>
                <div className="reset-form-container">
                    <div className="reset-form-card">
                        <div className="reset-form-content">
                            <h1 className="reset-form-title">Forgot Password</h1>
                            <form onSubmit={handleSubmit} className="login-form">
                                <InputField
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleInput}
                                    label="Email"
                                    placeholder="name@company.com"
                                    required={true}
                                />
                                <button type="submit" className="btn-password-reset-email">
                                    Send password reset email
                                </button>
                                <button type="submit" className="back-to-login" onClick={handleBackToLogin}>
                                    Back to login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;
