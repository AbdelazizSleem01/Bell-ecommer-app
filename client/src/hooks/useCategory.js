import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCategory() {
    const [categoryList, setCategoryList] = useState([]);

    // get category 

    const getCategory = async () => {
        try {
            const { data } = await axios.get('https://bellissimo-ecommer-app.onrender.com/api/v1/category/get-categories')
            setCategoryList(data.category)
        } catch (err) {
            console.log('Error: ', err)
        }
    }
    useEffect(() => {
        getCategory();
    }, [])

    return categoryList;
}