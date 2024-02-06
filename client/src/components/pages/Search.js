import React from 'react'
import Layout from '../Layout/Layout'
import { useSearch } from '../../context/Search'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import '../../styles/HomePage.css'
import '../../styles/SearchResult.css'


const Search = () => {


    const [values] = useSearch()


    // Language

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const { t } = useTranslation();

    return (
        <Layout title={'Search Result'}>
            <div className='container-fluid mb-5 pb-5'>
                <div className='text-center mt-4'>
                    <h1>{t("Search Result")}</h1>
                    <h6>
                        {values?.results.length < 1 ? 'No Products Found' :
                            `${t("Found")} ( ${values?.results.length} )`
                        }
                    </h6>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {values?.results.map((p) => (
                            <Link key={p._id} className='product-link' to={`/dashboard/admin/product/${p.slug}`}>
                                <div className="card-home  m-2 p-2 " >
                                    <img src={`https://bellissimo-ecommer-app.onrender.com/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top pb-3 mx-auto"
                                        alt={p.name}
                                    />
                                    <div className="card-body border-top pb-2 ">
                                        <h5 className="card-title">
                                            {
                                                currentLanguageCode === 'ar' ? (
                                                    <h5 className="card-title text-center ">{p.nameAR}</h5>
                                                ) : (
                                                    <h5 className="card-title text-center ">{p.name}</h5>
                                                )
                                            }
                                        </h5>
                                        <div className='des-price'>
                                            <p className="card-text">
                                                {
                                                    currentLanguageCode === 'ar' ? (
                                                        <p className="card-text text-center">
                                                            {p.descriptionAR && p.descriptionAR.length > 40
                                                                ? `${p.descriptionAR.substring(0, 60)}...`
                                                                : p.descriptionAR}
                                                        </p>
                                                    ) : (
                                                        <p className="card-text text-center">
                                                            {p.description && p.description.length > 40
                                                                ? `${p.description.substring(0, 60)}...`
                                                                : p.description}
                                                        </p>
                                                    )
                                                }...
                                            </p>
                                            <h6 className="card-text text-center ">{p.price}$</h6>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button className='btn btn-Details '>More Details
                                                <span class="material-symbols-outlined">
                                                    visibility
                                                </span>
                                            </button>
                                            <button className='btn btn-cart ms-2'>
                                                Add To Cart
                                                <span class="material-symbols-outlined">
                                                    shopping_cart
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search