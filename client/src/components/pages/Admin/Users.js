import React, { useEffect, useState } from "react";
import AdminMenu from "../../Layout/AdminMenu";
import Layout from "./../../Layout/Layout.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import RoleForm from "../../Form/RoleForm.js";


const Users = () => {
    const [user, setUser] = useState([])
    const [updateRole, setUpdateRole] = useState("")
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);

    // get all users 
    const getAllUser = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/auth/users')
            setUser(data?.user)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllUser()
    }, [])

    // Update-Role 
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`https://bellissimo-ecommer-app.onrender.com/api/v1/auth/role-update/${selected._id}`,
                { role: updateRole });
            if (data.success) {
                setUser((prevUser) =>
                    prevUser.map((u) => {
                        if (u._id === selected._id) {
                            const newRole = updateRole === "Admin" ? "Admin" : "User";
                            toast.success(`👨‍💼 ${u.name} became ${newRole} `);
                            return { ...u, role: updateRole };
                        }
                        return u;
                    })
                    
                );
                setSelected(null);
                setUpdateRole("");
                setVisible(false)
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout title={"Dashboard | All Users"}>
            <div className="container-fluid p-5">
                <div className="row">
                    
                    <div className="col-md-12 user">
                        <h1 className="text-center ">All Users</h1>
                        <table className=" custom-table text-center table-responsive">
                            <thead>
                                <tr className="table-light">
                                    <th scope="col">
                                        Name
                                        <img src="/images/id-card.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        Email
                                        <img src="/images/email.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        Address
                                        <img src="/images/address.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        Phone
                                        <img src="/images/phone.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        Answer
                                        <img src="/images/answer.png" alt="Id-img" />
                                    </th>
                                    <th scope="col">
                                        Role
                                        <img src="/images/management.png" alt="Id-img" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {user?.map((U, index) => (
                                    <tr key={index}>
                                        <td>{U.name}</td>
                                        <td>{U.email}</td>
                                        <td>{U.address}</td>
                                        <td>{U.phone}</td>
                                        <td>{U.answer}</td>
                                        <td>{U.role === "Admin" ? "Admin" : "User"}
                                            <button
                                                className="btn btn-edit ms-4"
                                                onClick={() => {
                                                    setVisible(true);
                                                    setUpdateRole(U.role);
                                                    setSelected(U);
                                                }}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <Modal
                                footer={null}
                                visible={visible}
                                className="Model"
                                onCancel={() => setVisible(false)}
                            >
                                <div>
                                    <RoleForm
                                        setValue={setUpdateRole}
                                        handleSubmit={handleUpdate}
                                    />
                                </div>
                            </Modal>
                        </table>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <AdminMenu />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;