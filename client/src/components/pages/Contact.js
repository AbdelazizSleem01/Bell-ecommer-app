import React, { useState } from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const [resultMessage, setResultMessage] = useState("");
    const [resultColor, setResultColor] = useState("");

    //language 

    const { t } = useTranslation();


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        setResultMessage("Please wait...");

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    setResultMessage(json.message);
                    setResultColor("Green");
                    toast.success(` Message Sent Successfully \n  Thank You`,
                        { position: "top-center" }
                    )
                } else {
                    console.log(response);
                    setResultMessage(json.message);
                    setResultColor("Red");
                }
            })
            .catch((error) => {
                console.log(error);
                setResultMessage("Something went wrong!");
                setResultColor("warning");
            })
            .finally(() => {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                    setResultMessage("");
                }, 5000);
            });
    };

    return (
        <Layout title={t("Contact Us")}>
            <div className="container contactus mx-auto">
                <div className=" text-center ">
                    <div className=" mx-auto ">
                        <div className="text-center">
                            <h1 className=" mx-auto">{t("Contact Us")}</h1>
                            <p>{t("Fill")}</p>
                        </div>
                        <div className="row form ">
                            <div className="col-md-6">
                                <span className="img"></span>
                                <div className="form-group">
                                    <p className={`text-center ${resultColor}`} id="result">
                                        {resultMessage}
                                    </p>
                                    <p className="mt-3 ">
                                        <BiMailSend /> : abdelazizsleem957@gmail.com
                                    </p>
                                    <p className="mt-3">
                                        <BiPhoneCall /> : 01119268163
                                    </p>
                                    <p className="mt-3">
                                        <BiSupport /> : 1800-0000-0000 (toll-free)
                                    </p>
                                </div>
                            </div>
                            <form
                                action="https://api.web3forms.com/submit"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="needs-validation col-md-6"
                                noValidate
                            >
                                <input type="hidden" name="access_key" value="f8527abd-f87c-4888-85ce-9bdb7ede6769" />
                                <input type="hidden" name="subject" value="New Submission from Web3Forms" />
                                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="fname" className="form-label mb-2">
                                            {t("First Name")}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="first_name"
                                            placeholder="Abdelaziz"
                                            required
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback text-danger">
                                            {t("Valid_First")}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lname" className="form-label mb-2">
                                            {t("Last Name")}
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="lname"
                                            placeholder="Sleem"
                                            required
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback text-danger">
                                            {t("Valid_Last")}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label mb-2">
                                            {t("Email Address")}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="you@company.com"
                                            required
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback text-danger">
                                            {t("Valid_Email")}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phone" className="form-label mb-2">
                                            {t("Phone Number")}
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="+20 111-9268-163"
                                            required
                                            className="form-control"
                                        />
                                        <div className="invalid-feedback text-danger">
                                            {t("Valid_Phone")}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label mb-2">
                                        {t("Address")}
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Benha, Qalubia, Egypt"
                                        required
                                        className="form-control"
                                    />
                                    <div className="invalid-feedback text-danger">
                                        {t("Valid_Address")}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label mb-2">
                                        {t("Message")}
                                    </label>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        id="message"
                                        placeholder="Your Message"
                                        className="form-control"
                                        required
                                    ></textarea>
                                    <div className="invalid-feedback text-danger">
                                        {t("Valid_Message")}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        {t("Send")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;