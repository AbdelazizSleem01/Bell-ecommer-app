
import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { toast } from 'react-toastify';


function GoogleAuth() {

    const responseGoogle = (response) => {
        console.log(response);
        //try and catch
        try {
            axios.post("http://localhost:8080/api/google", { token: response.tokenId });
        } catch (err) {
            console.log("Error", err);
            toast.error("Something Went Wrong");
        }
    };
    return (
        <GoogleLogin
            clientId="256921434037-nspo7u7u32l9m4110p5ld3sevtkjmlka.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={(response) => responseGoogle(response)}
            onFailure={(response) => responseGoogle(response)}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default GoogleAuth;