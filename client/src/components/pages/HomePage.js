import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import { Checkbox, Radio } from 'antd';
import { toast } from 'react-toastify';
import { Prices } from '../Prices';
import { useCart } from '../../context/cart';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();


    // Language

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const { t } = useTranslation();

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/category/get-categories');
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getAllProducts = async () => {
        try {
            const perPage = 2; // Set the number of products per page
            const { data } = await axios.get(`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-list/${page}?perPage=${perPage}`);
            setProducts(data?.products);
        } catch (error) {
            console.log('Error:', error);
        }
    };



    const getTotal = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-count');
            setTotal(data?.total);
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        getAllCategory();
        getTotal();
        loadMore();
        getAllProducts();
    }, [page]);

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);


    //Loadmore Function

    const loadMore = async () => {
        try {
            setLoading(true);
            const perPage = 18;
            const { data } = await axios.get(`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-list/${page}?perPage=${perPage}`);
            setLoading(false);
            setProducts((prevProducts) => [...prevProducts, ...data?.products]);
        } catch (error) {
            console.log('Error:', error);
            setLoading(false);
        }
    };



    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) {
            filterProduct();
        }
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const response = await axios.post('https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-filter', {
                checked,
                radio,
            });
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Layout title={t("app_title")}>
            <div className="container-fluid row mb-5 ">
                <div className='hero-section'>
                    <Swiper className="mySwiper">
                        <SwiperSlide>
                            <img src='/images/banner4.jpg' alt='banner-img' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='/images/banner5.jpg' alt='banner-img' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='/images/banner2.jpg' alt='banner-img' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='/images/banner.jpg' alt='banner-img' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='/images/banner3.jpg' alt='banner-img' />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-md-12 col-lg-4 mx-auto filter ">
                    <h4 className="text-center">{t("Filter_By_Category")} </h4>
                    <div className="d-flex flex-column">
                        {categories.map((category) => (
                            <Checkbox
                                className='Checkbox'
                                key={category._id}
                                onChange={(e) => handleFilter(e.target.checked, category._id)}
                            >
                                {category.name}
                            </Checkbox>
                        ))}

                    </div>
                    <h4 className="text-center mt-4">{t("Filter_By_Price")}</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group
                            onChange={(e) => setRadio(e.target.value)}
                        >
                            {Prices.map((price) => (
                                <div key={price._id} >
                                    <Radio
                                        value={price.array}
                                        className='Checkbox'
                                    >{price.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-filter mt-4"
                            onClick={() => window.location.reload()}
                            block
                        >
                            {t("Reset Filters")}
                        </button>
                    </div>
                </div>
                <div className="col-md-12 col-lg-9 products">
                    <h1 className="mx-auto product-title">{t("All_Products")}</h1>
                    <div className="d-flex flex-wrap mx-auto">
                        {products.map((product) => (
                            <div className="card-home col-md-6 p-2 " key={product._id}>
                                <img
                                    src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${product._id}`}
                                    className="card-img-top pb-3 mx-auto "
                                    alt={product.name}
                                />
                                <div className="card-body border-top pb-2 mt-4">
                                    {
                                        currentLanguageCode === 'ar' ? (
                                            <h5 className="card-title text-center ">{product.nameAR}</h5>
                                        ) : (
                                            <h5 className="card-title text-center ">{product.name}</h5>
                                        )
                                    }
                                    <div className=' des-price'>
                                        {
                                            currentLanguageCode === 'ar' ? (
                                                <p className="card-text text-center">
                                                    {product.descriptionAR && product.descriptionAR.length > 30
                                                        ? `${product.descriptionAR.substring(0, 60)}...`
                                                        : product.descriptionAR}
                                                </p>
                                            ) : (
                                                <p className="card-text text-center">
                                                    {product.description && product.description.length > 30
                                                        ? `${product.description.substring(0, 60)}...`
                                                        : product.description}
                                                </p>
                                            )
                                        }
                                        <h6 className="card-text text-center">{product.price}$</h6>
                                    </div>

                                    <div className="buttons">
                                        <button
                                            className="btn btn-Details "
                                            onClick={() => navigate(`/product/${product.slug}`)}
                                        >
                                            {t("More_Details")}
                                            <span class="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </button>
                                        <button
                                            className="btn btn-cart "
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
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-loading"
                                onClick={() => {
                                    setPage((prevPage) => prevPage + 1);
                                    getAllProducts();
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default HomePage;