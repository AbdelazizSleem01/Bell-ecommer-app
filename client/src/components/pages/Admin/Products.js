import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { Link } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products);
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout>
            <div className='row container-fluid p-5 product-table'>
                <div className='col-md-4 mt-5'>
                    <AdminMenu />
                </div>
                <div className='col-md-8'>
                    <h1 className='text-center'>Product List</h1>
                    <div>
                        <table className='Table table-responsive'>
                            <thead >
                                <tr className='tr-thead text-center'>
                                    <th scope="col">
                                            Image
                                            <img src="/images/picture.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        <span className='d-flex mx-auto'>
                                            Name
                                            <img src="/images/document.png" alt="Id-img" />
                                        </span>

                                    </th>
                                    <th scope="col">
                                        <span className='d-flex mx-auto'>
                                            Description
                                            <img src="/images/product-description.png" alt="Id-img" />
                                        </span>

                                    </th>
                                    <th scope="col">
                                        <span className='d-flex mx-auto'>
                                            Price
                                            <img src="/images/tag.png" alt="Id-img" />
                                        </span>

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-center' >
                                {products?.map((p) => (
                                    <tr key={p._id} className='tr-tbody'>
                                        <td>
                                            <Link className='product-link' to={`/dashboard/admin/product/${p.slug}`}>
                                                <img src={`/api/v1/product/product-photo/${p._id}`} className="product-img" alt={p.name} />
                                            </Link>
                                        </td>
                                        <td>{p.name}</td>
                                        <td >{p.description}</td>
                                        <td>{p.price}$</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default Products