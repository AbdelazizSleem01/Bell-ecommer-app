import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import DropIn from "braintree-web-drop-in-react";
import { useCart } from '../../context/cart'
import { useAuth } from '../../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import axios from 'axios'
import "braintree-web";
import '../../styles/CartPage.css'

const CartPage = () => {

    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // Language

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const { t } = useTranslation();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price });
            //toLocaleString use to convert the number to string
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        } catch (err) {
            console.log('Error in calcular price total')
        }
    }

    // delete item 
    const removeFromCart = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
            toast.success(
                currentLanguageCode === "ar" ?
                    `تـم إزالـة المنتـج بنجـاح` :
                    `Item Removed Successfully`,
            )
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    //getpayment
    const getToken = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
            // console.log(data.response)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);


    //handle payment 
    const handlePayment = async () => {
        try {
            setLoading(true);
            if (!instance) {
                throw new Error("Payment instance is not available");
            }
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('https://bellissimo-ecommer-app.onrender.com/api/v1/product/braintree/payment', {
                nonce,
                cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Completed Successfully');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    return (
        <Layout title={t("Cart_title")}>
            <div className='container'>
                <div className='row text-center text-3xl font-bold cart-title'>
                    <h1 className=" mt-4 lh-lg ">
                        {t("Cart_title")}
                        <br />
                        <h4 className='user-name'>
                            {`${t("Hello")} | ${auth?.token && auth?.user?.name} |`}
                        </h4>
                    </h1>
                    <h4 className='cart-length-auth'>
                        {cart?.length
                            ? `You Have ( ${cart.length} ) items in your cart ${auth?.token ? "" : "Please login to checkout"} `
                            : `${t("Cart_Empty")}`
                        }
                    </h4>
                </div>
                <div className='row mt-5 mb-5 cart-product'>
                    <div className='col-md-7'>
                        {cart?.map((p) => (
                            <div className='row mb-3 card flex-row p-2 product mx-auto' key={p._id}>
                                <div className='col-md-4'>
                                    <Link to={`/product/${p.slug}`}>
                                        <img
                                            src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${p._id}`}
                                            className=" pb-2 ps-2 mx-auto mt-3 p-2 "
                                            alt={p.name}
                                            width='120px'
                                            height='150px'
                                        />
                                    </Link>
                                </div>
                                <div className='col-md-8 text-center'>
                                    {
                                        currentLanguageCode === 'en' ? (
                                            <h4 className='fs-4 '>
                                                {p.name}
                                            </h4>
                                        ) : (
                                            <h4 className='fs-4 '>
                                                {p.nameAR}
                                            </h4>
                                        )
                                    }
                                    {
                                        currentLanguageCode === 'en' ? (
                                            <h4 className='fs-5'>
                                                {p.description}
                                            </h4>

                                        ) : (
                                            <h4 className='fs-5'>
                                                {p.descriptionAR}
                                            </h4>
                                        )
                                    }
                                    <h4 className='price'>Price : ${p.price}</h4><br />
                                    <button onClick={() => removeFromCart(p._id)} type='button' className='btn btn-danger mb-2' >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className='col-md-5 text-center cart-summary'>
                        <h4 className='title mx-auto'>{t("Cart_Summary")}</h4>
                        <p>{t("Total | Checkout | Payment")}</p>
                        <hr />
                        <h4>{t("Total")} : {totalPrice()} 💲</h4>
                        {auth?.user?.address ? (
                            <div className='mb-4'>
                                <hr />
                                <h4 className='mt-4'>{t("Current Address")}</h4>
                                <h5>
                                    <img src='/images/map.png' alt='map icon' style={{ objectFit: "contain", width: "25px", height: "auto", margin: "5px " }} />
                                    {auth?.user?.address}
                                </h5>
                                <button className='btn btn-address'
                                    onClick={() => navigate('/dashboard/user/profile')}>
                                    {t("Update Address")}
                                </button>
                            </div>
                        ) : (
                            <div className='mb-4'>
                                {
                                    auth?.token ? (
                                        <button className='btn btn-warning'
                                            onClick={() => navigate('/dashboard/user/profile')}>
                                            {("Update Address")}
                                        </button>
                                    ) : (
                                        <button className='btn btn-warning'
                                            onClick={() => navigate('/login', {
                                                state: '/cart',
                                            })}
                                        >
                                            {t("Please login to Checkout")}
                                        </button>
                                    )
                                }
                            </div>
                        )}
                        <div>
                            {!clientToken || !cart?.length ? (
                                <p className='payment-loading mx-auto '>{t("Loading")}</p>
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            // paypal: {
                                            //     flow: "vault",
                                            // },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button
                                        className="btn btn-payment mt-2"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? 'Processing...' : `${t("do Payment")}`}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CartPage
