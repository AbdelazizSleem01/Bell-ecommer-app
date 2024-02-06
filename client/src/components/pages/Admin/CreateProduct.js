import React, { useState, useEffect } from "react";
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;


const CreateProduct = () => {
    const navigate = useNavigate();
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

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://bellissimo-ecommer-app.onrender.com/api/v1/category/get-categories");
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
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("nameAR", nameAR);
            productData.append("description", description);
            productData.append("descriptionAR", descriptionAR);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);

            const { data } = await axios.post(
                "https://bellissimo-ecommer-app.onrender.com/api/v1/product/create-product",
                productData
            );

            if (data?.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } if (name === "") {
                toast.error("data.error");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Layout title={"Dashboard | Create Product"}>
            <div className="container-fluid p-5 create-product">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="title text-center">Create Product</h1>
                        <div className="form mx-auto">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mx-auto"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3 ">
                                <label className="btn btn-outline-secondary col-md-12 ">
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
                            <div className="mb-3 mx-auto">
                                {photo && (
                                    <div className="text-center ">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3 ">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control mx-auto"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 ">
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
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control mx-auto"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mx-auto mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="create">
                                <button className="btn btn-create" onClick={handleCreate}>
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    );
}

export default CreateProduct
