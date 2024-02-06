import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../../styles/AuthStyles.css";
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

        // Language
        const { t } = useTranslation();

    //handleSubmit function Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://bellissimo-ecommer-app.onrender.com/api/v1/auth/register",
                { name, email, password, phone, address, answer }
            );
            if (res.data.success) {
                toast.success(res.data.message, {
                    icon: "👍",
                    toastId: 'register-notification' // Unique toastId to force display
                });
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log('Error', err);
            toast.error('Something Went Wrong');
        }
    }
    return (
        <div>
            <Layout title={'Register - Ecommerce App'}>
                <div className="form-container ">
                    <form onSubmit={handleSubmit}>
                        <h1 className="title">{t("Register")} </h1>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="exampleInputName"
                                placeholder={t('Name')}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder={t("Email Address")}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder={t("Password")}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder={t("Phone Number")}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder={t("Address")}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder={t('Favorite Sports')}
                            />
                        </div>
                        <button type="submit" className="btn  mx-auto">{t("Register")}</button>
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default Register
