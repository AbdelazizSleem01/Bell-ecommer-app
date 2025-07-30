import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../styles/HomePage.css';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categoryList = useCategory();
    const [isLoggedIn, setIsLoggedIn] = useState();
    const { t } = useTranslation();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        toast.success('Logout Successfully');
    };

    useEffect(() => {
        const userIsLoggedIn = auth.user;
        setIsLoggedIn(userIsLoggedIn);
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="web-title">
                            <img src='/images/letter-b.png' alt='LOGO' />
                            {t("LOGO")}
                        </Link>
                        
                        <ul className="navbar-nav ms-auto">
                            <div className="SearchInput">
                                <SearchInput />
                            </div>

                            <li className={`${isLoggedIn ? "nav-item Ar-nav" : "nav-item logoutAr"}`}>
                                <NavLink to="/" className="nav-link text-capitalize mx-auto">
                                    {t("Home")}
                                </NavLink>
                            </li>
                            
                            <li className={`${isLoggedIn ? "nav-item dropdown Ar-nav" : "nav-item dropdown logoutAr"}`}>
                                <Link
                                    className="nav-link text-capitalize"
                                    to="/categories"
                                    data-bs-toggle="dropdown"
                                >
                                    {t("Categories")}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/categories">
                                            All Categories
                                        </Link>
                                    </li>
                                    {categoryList?.map((c) => (
                                        <li key={c._id}>
                                            <Link
                                                to={`/category/${c.slug}`}
                                                className="dropdown-item text-capitalize"
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            
                            {!auth?.user ? (
                                <>
                                    <li className={`${isLoggedIn ? "nav-item Ar-nav" : "nav-item logoutAr"}`}>
                                        <NavLink to="/register" className="nav-link text-capitalize">
                                            {t("Register")}
                                        </NavLink>
                                    </li>
                                    <li className={`${isLoggedIn ? "nav-item Ar-nav" : "nav-item logoutAr"}`}>
                                        <NavLink to="/login" className="nav-link text-capitalize">
                                            {t("Login")}
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className={`${isLoggedIn ? "nav-item dropdown Ar-nav" : "nav-item dropdown logoutAr"}`}>
                                        <NavLink
                                            className="nav-link active-item name-letter mx-auto"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <h4
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="This top tooltip is themed via CSS variables."
                                            >
                                                {auth?.user?.name[0]}
                                            </h4>
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === "Admin" ? 'admin' : 'user'}`}
                                                    className="dropdown-item text-capitalize"
                                                >
                                                    {t("Dashboard")}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item text-capitalize"
                                                >
                                                    {t("Logout")}
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            
                            <li className={`${isLoggedIn ? "nav-item Ar-nav" : "nav-item logoutAr"}`}>
                                <Badge count={cart?.length} className='Num' showZero>
                                    <NavLink to="/cart" className="nav-link nav-cart text-capitalize">
                                        {t("Cart")}
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;