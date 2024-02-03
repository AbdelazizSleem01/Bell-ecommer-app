import React from 'react'
import Layout from '../Layout/Layout'
import { MdPrivacyTip } from "react-icons/md";


const Policy = () => {
    return (
        <Layout title={"Privacy Policy | Ecommer App"}>
            <div className="row contactus mt-4 ">
                <div className="col-md-6  ">
                    <img
                        className='img-fluid m-2'
                        src="/images/PrivacyPolicy.jpg"
                        alt="Privacy"
                        style={{ width: "95%", height: "60vh" }}
                    />
                </div>
                <div className="col-md-4  ">
                    <p>
                        <MdPrivacyTip />
                        Personal Information Collection: We collect and use personal information, such as names, addresses, and payment details, to process orders and provide customer support.
                    </p>
                    <p>
                        <MdPrivacyTip />
                        Data Security: We have implemented security measures, such as encryption and firewalls, to protect users' personal information.
                    </p>
                    <p>
                        <MdPrivacyTip />
                        Data Retention: We retain personal information for as long as necessary to fulfill orders and comply with legal obligations.
                    </p>
                    <p>
                        <MdPrivacyTip />
                        Children's Privacy: Our app is not intended for children under a certain age, and we do not knowingly collect personal information from them.
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy
