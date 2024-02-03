import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer>
            <div className="container-fluid mt-5 footer">
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6">
                        <div>
                            <Link to="/" className=" web-title ">
                                <img src='/images/letter-b.png' alt='LOGO' />{t("LOGO")}
                            </Link>
                            <p className="about-company">
                                Bellissimo is an enchanting website that combines elegance,
                                a diverse product range, seamless navigation,
                                and exceptional customer service to provide users with a
                                delightful online shopping experience.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-2 offset-xl-1 col-lg-2 col-md-6">
                        <div className='mx-auto text-center'>
                            <h4 className='text-center'>Quick Link</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/" className="text-decoration-none">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-decoration-none">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/service" className="text-decoration-none">Service</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-decoration-none">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                        <div className='mx-auto text-center'>
                            <h4 className='text-center'>
                                Address
                            </h4>
                            <ul className="list-unstyled">
                                <li>
                                    <p>
                                        📞+20 1119268163
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        📧  abdelazizsleem957@gmail.com
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Full Stack Developer
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6  social-network ">
                        <h4 className='text-center'>
                            Social Network
                        </h4>
                        <ul className="list-unstyled row Icons">
                            <li className='col-md-3'>
                                <Link className="text-decoration-none" to={'https://github.com/AbdelazizSleem01'}>
                                    <img src='/images/github.png' alt='Git Logo' />
                                </Link>
                            </li>
                            <li className='col-md-3'>
                                <Link className="text-decoration-none" to={'https://www.linkedin.com/in/abdelaziz-sleem-600a1027a/'}>
                                    <img src='/images/linkedin.png' alt='Linkedin Logo' />
                                </Link>
                            </li>
                            <li className='col-md-3'>
                                <Link className="text-decoration-none" to={'https://www.facebook.com/profile.php?id=100028557526450'}>
                                    <img src='/images/facebook.png' alt='Facebook Logo' />
                                </Link>
                            </li>
                            <li className='col-md-3'>
                                <Link className="text-decoration-none" to={'https://vercel.com/dashboard'}>
                                    <img src='/images/vercel.png' alt='Facebook Logo' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex justify-content-center">

                    <div className="copyright">
                        <p>
                            All Right Reserved &copy;  AZ Web Developer
                            <Link className='company-link' to="https://www.linkedin.com/in/abdelaziz-sleem-600a1027a/" target="_blank">
                                AZ company
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer
