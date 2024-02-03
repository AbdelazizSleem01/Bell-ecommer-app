import React from 'react'
import Layout from '../Layout/Layout'

const About = () => {
    return (
        <Layout title={"About Us | Ecommer App"}>
            <div className="row contactus mt-4">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p className="text-justify mt-2 ">
                        
                        Introducing our revolutionary eCommerce app, designed to provide a
                        seamless shopping experience for our customers. At AZ Developer,
                        we understand the importance of creating an intuitive and user-friendly
                        platform that allows users to browse and purchase products effortlessly.
                        Our app is equipped with advanced features such as secure payment gateways
                        , personalized recommendations, and real-time inventory updates
                    </p>
                </div>
            </div>
        </Layout>
    )
}
export default About
