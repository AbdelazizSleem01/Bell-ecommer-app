import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage.js'
import About from './components/pages/About.js'
import Contact from './components/pages/Contact.js'
import Policy from './components/pages/Policy.js'
import PageNotFound from './components/pages/PageNotFound';
import Register from './components/pages/Auth/Register.js';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/Auth/Login.js';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/pages/user/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './components/pages/Auth/ForgotPassword.js';
import AdminRoute from './components/Routes/AdminRoute.js';
import AdminDashboard from './components/pages/Admin/AdminDashboard.js';
import CreateCategory from './components/pages/Admin/CreateCategory.js';
import CreateProduct from './components/pages/Admin/CreateProduct.js';
import Users from './components/pages/Admin/Users.js';
import Profile from './components/pages/user/Profile.js'
import Order from './components/pages/user/Order.js'
import GoogleAuth from './components/pages/Auth/GoogleAuth.js';
import Products from './components/pages/Admin/Products.js';
import UpdateProduct from './components/pages/Admin/UpdateProduct.js';
import Search from './components/pages/Search.js';
import ProductDetails from './components/pages/ProductDetails.js';
import Categories from './components/pages/Categories.js';
import CategoryProduct from './components/pages/CategoryProduct.js';
import DashApp from './components/DashApp.js';
import CartPage from './components/pages/CartPage.js';
import AdminOrder from './components/pages/Admin/AdminOrder.js';
import ChatGPT from './components/Layout/ChatGPT.js';
import { useEffect, useState } from 'react';
import FadeLoader from 'react-spinners/FadeLoader'
function App() {

  const [loading, setloading] = useState(false);


  useEffect(() => {
    setloading(true);

    setTimeout(() => {
      setloading(false)
    }, 500)
  }, [])


  return (
    <>
      {
        loading ? (
          <div className='Loader'>
            <FadeLoader color="#996699"/>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/chat" element={<ChatGPT />} />
            <Route path="/category/:slug" element={<CategoryProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboardapp" element={<DashApp />} />
            <Route path="/search" element={<Search />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/orders" element={<Order />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/create-category" element={<CreateCategory />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/product/:slug" element={<UpdateProduct />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="admin/orders" element={<AdminOrder />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/google-auth" element={<GoogleAuth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )
      }
    </>
  );
}

export default App;
