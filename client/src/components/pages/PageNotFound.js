import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <Layout title={'Go back - Page not found'}>
            <div className='pnf'>            
                <h1>404</h1>
                <h2>
                    Oops ! Page Not Found
                </h2>
                <Link to='/' className='pnf-btn'>
                    Go Back Home
                </Link>
            </div>
        </Layout>
    )
}

export default PageNotFound
