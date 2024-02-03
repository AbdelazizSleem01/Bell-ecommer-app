import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import '../../styles/HomePage.css'

const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values, results : data});
            navigate('/search')
        } catch (err) {
            console.log('Error:', err)
        }
    }
    return (
        <div>
            <form className="d-flex search" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder={t("Search")}
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-search" type="submit">
                    {t("Search")}
                </button>
            </form>
        </div>
    )
}

export default SearchInput