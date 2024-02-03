import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DarkMode from './DarkMode';
import ChatGPT from './ChatGPT'

const Layout = ({ children, title, describtion, keywords, author }) => {
    return (
        <>
            <Header />
            <DarkMode/>
            <ChatGPT/>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={describtion} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <main style={{ minHeight: "75vh" }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </>
    );
};

Layout.defaultProps = {
    title: `Ecommerce app - Shop now`,
    describtion: `This is a ecommerce application built with react and Node`,
    keywords: `ecommerce, nodejs, react, mern, mongodb`,
    author: `Abdelaziz Sleem`,
}
export default Layout
