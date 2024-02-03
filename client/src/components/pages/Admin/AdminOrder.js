import React, { useEffect, useState } from 'react'
import AdminMenue from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
import '../../../styles/AdminDashBoard.css'
const { Option } = Select

const AdminOrder = () => {

    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped...", "Delivered", "Cancelled"])
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders')
            setOrders(data)
        } catch (err) {
            console.log('Error:', err)
        }
    }

    useEffect(() => {
        if (auth?.token)
            getOrders()
    }, [auth?.token])

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/orders-status/${orderId}`, { status: value });
            getOrders();
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Layout title={'All orders | Ecommerce '}>
            <div className='container-fluid order-page mt-5 mb-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <AdminMenue />
                    </div>
                    <div className='col-md-8'>
                        <h1 className='text-center title'>All Orders</h1>
                        {orders?.length > 0 ? (
                            orders?.map((o, i) => {
                                return (
                                    <div>
                                        <table className='order-table table-responsive text-center'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>date</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td className='status text-center'>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(o._id, value)}
                                                            defaultValue={o?.status}
                                                            style={{textAlign:"center"}}
                                                            dropdownStyle={{
                                                                backgroundColor: "#996699",
                                                                color: "#fff",
                                                                border: "2px solid #006699",
                                                            }}
                                                        >
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>
                                                                    {s}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer.name}</td>
                                                    <td>{moment(o?.createAt).format("YYYY-MM-DD")}</td>
                                                    <td >{o?.payment.success ? "Success" : "Failes"}</td>
                                                    <td >{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container-fluid products'>
                                            {o?.products?.map((p, i) => (
                                                <div className='row single-product flex-row' key={p._id}>
                                                    <div className='col-md-4'>
                                                        <img
                                                            src={`/api/v1/product/product-photo/${p._id}`}
                                                            className="mx-auto"
                                                            alt={p.name}
                                                        />
                                                    </div>
                                                    <div className='col-md-8 my-auto text-center'>
                                                        <h4 className='name'>
                                                            {p.name}
                                                        </h4>
                                                        <p className='fs-5'>
                                                            description : {p.description && p.description.length > 30
                                                                ? `${p.description.substring(0, 30)}...`
                                                                : p.description}
                                                        </p>
                                                        <h4>Price : ${p.price}</h4><br />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <>
                                <h4 className='noOrder mx-auto mt-5'> </h4>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrder
