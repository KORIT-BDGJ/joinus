import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuth2Login = () => {


    const navigate = useNavigate();
    const [ searchParams, serSearchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    if(!!accessToken){
        localStorage.setItem("accessToken", accessToken);
        window.location.replace("/main");
    }



    return (
        <></>
    );
};

export default OAuth2Login;