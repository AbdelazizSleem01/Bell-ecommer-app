import React from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'
import { useAuth } from '../../../context/auth';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

const Dashboard = () => {
    const [auth] = useAuth();


    //language 
    const { t } = useTranslation();

    return (
        <Layout title={t("Dashboard - Ecommerce App")}>
            <h2 className='text-center mt-4'>{t("User_Profile")}</h2>
            <div className="m-3 p-3 admin-dashboard">
                <div className="row ">
                    <div className="col-md-4 ">
                        <UserMenu />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card p-3 mx-auto mt-5 hover ">
                            <h3 className=''>📄 {t("name")} : {auth?.user?.name} </h3>
                            <hr />
                            <h3>📧 {t("Email Address")}: {auth?.user?.email} </h3>
                            <hr />
                            <h3>🗺️ {t("Address")} : {auth?.user?.address} </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard