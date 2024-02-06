import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../../context/auth'
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import '../../../styles/AdminDashBoard.css'


const Order = () => {
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()


    const currentLanguageCode = cookies.get('i18next') || 'en';
    const { t } = useTranslation();

    const getOrders = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/auth/orders')
            setOrders(data)
        } catch (err) {
            console.log('Error:', err)
        }
    }

    useEffect(() => {
        if (auth?.token)
            getOrders()
    }, [auth?.token])

    return (
        <Layout title={"Dashboard | Your Order"}>
            <div className="container-fluid order-page p-5 mb-5">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <h1 className='text-center title'>{t("All Orders")}</h1>
                        {orders?.length > 0 ? (
                            orders?.map((o, i) => {
                                return (
                                    <div >
                                        <table className='order-table table-responsive text-center'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>{t("Status")}</th>
                                                    <th scope='col'>{t("Buyer")}</th>
                                                    <th scope='col'>{t("date")}</th>
                                                    <th scope='col'>{t("Payment")}</th>
                                                    <th scope='col'>{t("Quantity")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer.name}</td>
                                                    <td>{moment(o?.createAt).format("YYYY-MM-DD")}</td>
                                                    <td scope='row'>{o?.payment.success ? "Success" : "Failes"}</td>
                                                    <td scope='row'>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container-fluid products'>
                                            {o?.products?.map((p, i) => (
                                                <div className='row single-product flex-row' key={p._id}>
                                                    <div className='col-md-4'>
                                                        <img
                                                            src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${p._id}`}
                                                            className="mx-auto"
                                                            alt={p.name}
                                                        />
                                                    </div>
                                                    <div className='col-md-8 my-auto text-center'>
                                                        <h4 className='name'>
                                                            {
                                                                currentLanguageCode === 'ar' ? (
                                                                    <h5 className="card-title text-center ">{p.nameAR}</h5>
                                                                ) : (
                                                                    <h5 className="card-title text-center ">{p.name}</h5>
                                                                )
                                                            }
                                                        </h4>
                                                        <p className='fs-5'>
                                                            {t("description")} :  {currentLanguageCode === 'ar' ? (
                                                                <p className="card-text text-center">
                                                                    {p.descriptionAR && p.descriptionAR.length > 120
                                                                        ? `${p.descriptionAR.substring(0, 60)}...`
                                                                        : p.descriptionAR}
                                                                </p>
                                                            ) : (
                                                                <p className="card-text text-center">
                                                                    {p.description && p.description.length > 120
                                                                        ? `${p.description.substring(0, 60)}...`
                                                                        : p.description}
                                                                </p>
                                                            )
                                                            }
                                                        </p>
                                                        <h4>{t("Price")} : {t("$")}{p.price}</h4><br />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <>
                                <h4 className='noOrder mx-auto my-auto'> </h4>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Order
