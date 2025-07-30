import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import '../../styles/AdminDashBoard.css'

const UserMenu = () => {

    //language 
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
