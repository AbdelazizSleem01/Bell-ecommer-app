import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import '../../styles/AdminDashBoard.css'

const UserMenu = () => {

    //language 

    const languages = [
        {
            code: 'en',
            name: 'English',
            country_code: 'gb',
            imgSrc: "/images/usa.png"
        },
        {
            code: 'ar',
            name: 'العربية',
            country_code: 'sa',
            dir: 'rtl',
            imgSrc: "/images/flag.png"

        },
    ];

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();

    return (
        <div className='text-center menu mt-5'>
            <div className="list-group ">
                <h4>{t("User Dashboard")}</h4>
                <NavLink
                    to='/dashboard/user/profile'
                    className="list-group-item list-group-item-action">
                    📄 {t("Profile")}
                </NavLink>
                <NavLink
                    to='/dashboard/user/orders'
                    className="list-group-item list-group-item-action">
                    🛍️ {t("Orders")}
                </NavLink>
            </div>
        </div>
    )
}

export default UserMenu
