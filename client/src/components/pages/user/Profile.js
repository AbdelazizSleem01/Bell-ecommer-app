import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import {toast } from 'react-toastify';

const Profile = () => {

    //context
    const [auth, setAuth] = useAuth()
    //satates
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")


    //get user data 

    useEffect(() => {
        const { name, email, phone, address, } = auth?.user
        setName(name )
        setEmail(email )
        setPhone(phone )
        setAddress(address)
    }, [auth?.user])
    
    //handleSubmit function Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                "/api/v1/auth/updateProfile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                // parse = Converts a JavaScript Object Notation (JSON) string into an object.
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                // stringify = Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success(data?.message);
            }
        } catch (err) {
            console.log('Error', err);
            toast.error('some thing went wrong ');
        }
    }

    return (
        <Layout title={"Dashboard | Your Profile"}>
            <div className="container-fluid bg p-5">
                <div className="row">
                    <div className="col-md-4">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <div className="form-dash-container">
                            <form onSubmit={handleSubmit} className='w-50 '>
                                <h1 className="title text-dark">User Profile</h1>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputName"
                                        placeholder='Enter Your Name'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder='Enter Your Email'
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder='Entar Your Password'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPhone"
                                        placeholder='Enter Your Phone'
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        id="exampleInputAddress"
                                        placeholder='Enter Your Address'
                                    />
                                </div>
                                <button type="submit" className="btn  mx-auto">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
