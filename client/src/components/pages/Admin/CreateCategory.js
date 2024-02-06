import React, { useEffect, useState } from "react";
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../Form/CategoryForm";
import '../../../styles/AdminDashBoard.css'

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://bellissimo-ecommer-app.onrender.com/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(" Please enter new categoey");
        }
    };
    //get all cat
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

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `https://bellissimo-ecommer-app.onrender.com/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somthing went wrong");
        }
    };


    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `https://bellissimo-ecommer-app.onrender.com/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`${name} category is deleted`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard | Create Category"}>
            <div className="container-fluid p-5 create-category">
                <div className="row">
                    <div className="col-md-3 ">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center mb-5 title">
                            Manage Category
                            <span class="material-symbols-outlined">
                                category
                            </span>
                        </h1>
                        <div className=" mb-5 mx-auto">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75 mx-auto">
                            <table className=" category-table table-striped ">
                                <thead >
                                    <tr className="position-relative">
                                        <th scope="col" className="col-md-8">Name</th>
                                        <th scope="col" className="col-md-3  text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {categories?.map((c) => (
                                        <>
                                            <tr >
                                                <td className="pt-3 name" key={c._id}>{c.name} </td >
                                                <td className="d-flex">
                                                    <button
                                                        className="btn btn-edit ms-4"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-delete ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            footer={null}
                            visible={visible}
                            className="Model"
                            onCancel={() => setVisible(false)}
                        >
                            <div>
                                <CategoryForm
                                    value={updatedName}
                                    setValue={setUpdatedName}
                                    handleSubmit={handleUpdate}
                                />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory