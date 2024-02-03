import React, { useState, useEffect } from "react";
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import '../../../styles/AdminDashBoard.css'
const { Option } = Select;
const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [nameAR, setNameAR] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionAR, setDescriptionAR] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //Get Single Product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name);
            setNameAR(data.product.nameAR);
            setId(data.product._id);
            setDescription(data.product.description);
            setDescriptionAR(data.product.descriptionAR);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);
            setQuantity(data.product.quantity);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSingleProduct();
        //disable-nextline
    }, [])

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-categories");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("nameAR", nameAR);
            productData.append("description", description);
            productData.append("descriptionAR", descriptionAR);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);

            const { data } = await axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Delete product

    const handleDelete = async () => {
        try {
            const confirmBox = window.confirm('Are you sure to delete this Product?')
            if (!confirmBox) return
            const { data } = await axios.delete(
                `/api/v1/product/delete-product/${id}`,
            );
            toast.success("Product Deleted Successfully");
            navigate("/dashboard/admin/products");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout title={"Dashboard | Update Product"}>
            <ToastContainer />
            <div className="container-fluid p-5 create-product updated-product">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="title text-center">Update Product</h1>
                        <div className="form mx-auto update-form">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control mx-auto"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={nameAR}
                                    placeholder="اكتب الاسم بالعربي"
                                    className="form-control mx-auto"
                                    onChange={(e) => setNameAR(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control mx-auto"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={descriptionAR}
                                    placeholder="اكتب الوصف بالعربي"
                                    className="form-control mx-auto"
                                    onChange={(e) => setDescriptionAR(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control mx-auto"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control mx-auto"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? 'Yes' : 'No'}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="button">
                                <div className="mb-3">
                                    <button className="btn btn-create" onClick={handleUpdate}>
                                        Update Product
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        Delete Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct