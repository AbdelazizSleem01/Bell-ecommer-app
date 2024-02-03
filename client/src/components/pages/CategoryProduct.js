import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/HomePage.css'
import { useCart } from '../../context/cart';
const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params?.slug)
            getProductByCat();
    }, []);
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    return (
        <Layout title={`${category.name} | Category `}>
            <div className='container mt-5 mb-5 cat-pro'>
                <h2 className='text-center text-capitalize title'>Category - {category.name}</h2>
                <h5 className='text-center mb-5 founds'> ({products?.length}) result found</h5>
                <div className='row'>
                    <div className='d-flex flex-wrap '>
                        {products?.map((p) => (
                            <div className="card-home p-2  mx-auto" >
                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top pb-3 mx-auto"
                                    alt={p.name}
                                />
                                <div className="card-body border-top pb-2 mt-4">
                                    <h5 className="card-title text-center">{p.name}</h5>
                                    <div className='des-price'>
                                        <p className="card-text text-center">
                                            {p && p.description && p.description.length > 30 ? `${p.description.substring(0, 30)}...` : p.description}
                                        </p>
                                        <h6 className="card-text text-center">{p.price}$</h6>
                                    </div>
                                    <div className="d-flex justify-content-center align-align-items-end ">
                                        <button
                                            className="btn btn-Details "
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </button>
                                        <button
                                            className="btn btn-cart ms-2"
                                            onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success(`Item Added to cart`,
                                                    { position: "top-center" }
                                                )
                                            }}
                                        >
                                            Add To Cart
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

export default CategoryProduct
