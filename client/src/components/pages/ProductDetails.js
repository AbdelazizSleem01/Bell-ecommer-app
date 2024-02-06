import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import '../../styles/ProductDetails.css'
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [cart, setCart] = useCart();

    //Language
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const { t } = useTranslation();

    //initial detals
    useEffect(() => {
        //Get single Product
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`https://bellissimo-ecommer-app.onrender.com/api/v1/product/get-product/${params.slug}`)
                setProduct(data?.product);
                getSimilarProduct(data?.product._id, data?.product.category._id);
            } catch (err) {
                console.log('Error: ', err)
            }
        }
        if (params?.slug) getProduct()
    }, [params?.slug])

    //get similar product 
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`https://bellissimo-ecommer-app.onrender.com/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (err) {
            console.log("error in getting related products", err);
        }
    }
    return (
        <Layout title={'Product Details'}>
            <h2 className='text-center text-capitalize mt-5'>{t("Product Details")}</h2>
            <div className="row container-fluid mt-3 ">
                <div className='col-md-6 d-flex justify-content-center mt-5'>
                    <img
                        src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${product._id}`}
                        className=" Details-img w-100 mx-auto"
                        alt={product.name}
                    />
                </div>
                <div className='col-md-6 mt-4 details '>
                    <h6 className='mx-auto text-center text-capitalize name'>{t("Name")} : {
                        currentLanguageCode === 'ar' ? (
                            <h5 className="card-title text-center ">{product.nameAR}</h5>
                        ) : (
                            <h5 className="card-title text-center ">{product.name}</h5>
                        )
                    }</h6>
                    <h6 className='text-center'>{t("description")} :  {currentLanguageCode === 'ar' ? (
                        <p className="card-text text-center">
                            {product.descriptionAR && product.descriptionAR.length > 120
                                ? `${product.descriptionAR.substring(0, 60)}...`
                                : product.descriptionAR}
                        </p>
                    ) : (
                        <p className="card-text text-center">
                            {product.description && product.description.length > 120
                                ? `${product.description.substring(0, 60)}...`
                                : product.description}
                        </p>
                    )
                    }</h6>
                    <h6 className='text-center text-capitalize'>{t("Price")} : {t("$")} {product.price}</h6>
                    <h6 className="text-center text-capitalize">{t("Category")}: {product.category?.name}</h6>

                    <button
                        className="btn btn-cart mx-auto"
                        onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem('cart', JSON.stringify([...cart, product]))

                            toast.success(
                                currentLanguageCode === "ar" ?
                                    ` تم اضافه (${product.nameAR})  الى عربه التسوق ` :
                                    `${product.name} Added to cart`,
                                { position: "top-center" }
                            )
                        }}
                    >
                        {t("Add_To_Cart")}
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </button>
                </div>
                <div className=' row mt-5 mb-5 pb-5 '>
                    <hr />
                    <h1 className='my-5 text-center'>{t("Similar Product")}</h1>
                    {relatedProducts.length < 1 && (<p className='text-center mt-5 text-danger shadow p-3 w-25 mx-auto fw-bold rounded'>{t("No Similar Product Found ")}</p>)}
                    <div className='d-flex flex-wrap '>
                        {relatedProducts?.map((p) => (
                            <div className="card-home p-2 mx-auto " >
                                <img
                                    src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top pb-3 mx-auto "
                                    alt={p.name}
                                />
                                <div className="card-body border-top pb-2 ">
                                    <h5 className="card-title text-center m-2">
                                        {
                                            currentLanguageCode === 'ar' ? (
                                                <h5 className="card-title text-center ">{p.nameAR}</h5>
                                            ) : (
                                                <h5 className="card-title text-center ">{p.name}</h5>
                                            )
                                        }
                                    </h5>
                                    <div className=' des-price'>
                                        <p className="card-text text-center">
                                            {
                                                currentLanguageCode === 'ar' ? (
                                                    <p className="card-text text-center">
                                                        {p.descriptionAR && p.descriptionAR.length > 30
                                                            ? `${p.descriptionAR.substring(0, 60)}...`
                                                            : p.descriptionAR}
                                                    </p>
                                                ) : (
                                                    <p className="card-text text-center">
                                                        {p.description && p.description.length > 30
                                                            ? `${p.description.substring(0, 60)}...`
                                                            : p.description}
                                                    </p>
                                                )
                                            }
                                        </p>
                                        <h6 className="card-text text-center">{p.price}$</h6>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button
                                            className="btn btn-cart mx-auto"
                                            onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))

                                                toast.success(
                                                    currentLanguageCode === "ar" ?
                                                        ` تم اضافه (${p.nameAR})  الى عربه التسوق ` :
                                                        `${p.name} Added to cart`,
                                                    { position: "top-center" }
                                                )
                                            }}
                                        >
                                            {t("Add_To_Cart")}
                                            <span class="material-symbols-outlined">
                                                shopping_cart
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
