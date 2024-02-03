import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "../../../styles/AuthStyles.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()


    // Language
    const { t } = useTranslation();

    //handleSubmit function Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {
                toast(res.data && res.data.message, {
                    icon: "👍",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                navigate('/login');
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log('Error', err);
            toast.error('Some Thing is Error')
        }
    }

    return (
        <Layout title={'Forgot Password | Ecommerce App'}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">{t("Reset Password")}</h4>

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
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder={t("Favorite Sports")}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder={t("New Password")}
                            required
                        />

                    </div>
                    <button type="submit" className="btn mx-auto w-100">
                        Reset
                    </button>
                    <Toaster
                        position="top-right"
                        reverseOrder={false} />
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
