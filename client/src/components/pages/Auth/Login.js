import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../../context/auth';
import { useTranslation } from 'react-i18next';
import "../../../styles/AuthStyles.css";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const locaton = useLocation()


    // Language
    const { t } = useTranslation();

    //handleSubmit function Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://bellissimo-ecommer-app.onrender.com/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message, {
                    icon: "👍",

                })
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(locaton.state || '/');
            } else {
                toast.error(res.data.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
            }
        } catch (err) {
            console.log('Error', err);
            toast.error('Invalid email or password', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
    }


    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <h1 className="title">{t("Login")} </h1>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder={t("Email Address")}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder={t("Password")}
                            required
                        />

                    </div>
                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn mx-auto w-100"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >
                            {t("Forgot Password")}
                        </button>
                    </div>
                    <button type="submit" className="btn mx-auto w-100">
                        {t("Login")}
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login