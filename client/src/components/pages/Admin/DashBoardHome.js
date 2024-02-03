import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill
} from 'react-icons/bs'
import { toast } from 'react-toastify';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
}
    from 'recharts';

function DashBoardHome() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([])



    //get all product length
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products);
            console.log(data)

        } catch (err) {
            console.log('Error: ', err)
            toast.error('Something Error')
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])


    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-categories");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error(" wrong in getting catgeory");
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);

    // get all user 

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async()=> {
        try{
            const {data} = await axios.get ('/api/v1/auth/users')
            setUsers(data?.user)
            console.log(data)
        }catch(error){
            console.log(error)
        }    
    }    



    const data = [
        {
            name: 'Products',
            Products: products.length,
        },
        {
            name: 'Categories',
            Categories: categories.length,
        },
        {
            name: 'Users',
            Users: users?.length || 0,
        },
    

    ];

    return (
        <main className='main-container  mx-auto'>
            <div className='main-title'>
                <h3 className='text-center mx-auto'>DASHBOARD</h3>
            </div>
            <div className='main-cards mx-auto'>
                <div className='dash-card'>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{products.length}</h1>
                </div>
                <div className='dash-card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{categories.length}</h1>
                </div>
                <div className='dash-card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{users?.length || 0}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Products" fill="#82ca9d" />
                        <Bar dataKey="Categories" fill="#996699" />
                        <Bar dataKey="Users" fill="#006699" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default DashBoardHome;