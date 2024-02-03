import React from 'react'
import Layout from '../Layout/Layout'
import useCategory from '../../hooks/useCategory'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import '../../styles/Categories.css'

const Categories = () => {
    const categoryList = useCategory()

    //language 
    const { t } = useTranslation();

    return (
        <Layout title={t("All_Categories")}>
            <h1 className='title'>{t("All_Categories")}</h1>
            <div className='container-fluid categories'>
                <div className='row '>
                    {categoryList?.map((c) => (
                        <div className='col-md-6 mt-2 mb-3 ' key={c._id}>
                            <Link to={`/category/${c.slug}`}
                                className='btn btn-category text-decoration-none '>
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
