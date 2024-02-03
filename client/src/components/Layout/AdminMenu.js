import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/AdminDashBoard.css'

const AdminMenu = () => {
    return (
        <div className='text-center menu'>
            <h4>Admin Panle</h4>
            <div className="list-group">
                <NavLink
                    to='/dashboardapp'
                    className="list-group-item list-group-item-action">
                    Dash Chart
                </NavLink>
                
                <NavLink
                    to='/dashboard/admin/create-category'
                    className="list-group-item list-group-item-action">
                    Create Category
                </NavLink>
                
                <NavLink
                    to='/dashboard/admin/create-product'
                    className="list-group-item list-group-item-action" >
                    Create Product
                </NavLink>

                <NavLink
                    to='/dashboard/admin/products'
                    className="list-group-item list-group-item-action" >
                    Products
                </NavLink>

                <NavLink
                    to='/dashboard/admin/orders'
                    className="list-group-item list-group-item-action" >
                    Orders
                </NavLink>

                <NavLink
                    to='/dashboard/admin/users'
                    className="list-group-item list-group-item-action">
                    User
                </NavLink>

            </div>
        </div>
    )
}

export default AdminMenu
