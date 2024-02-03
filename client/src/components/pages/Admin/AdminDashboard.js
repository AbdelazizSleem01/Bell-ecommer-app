import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { useAuth } from '../../../context/auth';
import '../../../styles/AdminDashBoard.css'
const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={'Admin Dashboard | Ecommer'}>
            <h2 className='text-center mt-4 title'>Admin Profile</h2>
            <div className="container-fluid admin-dashboard">
                <div className="row">
                    <div className="col-md-3 menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className="card  mx-auto">
                            <h3> Admin Name : {auth?.user?.name}</h3>
                            <hr />
                            <h3> Admin Email : {auth?.user?.email}</h3>
                            <hr />
                            <h3> Admin Contact : {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
