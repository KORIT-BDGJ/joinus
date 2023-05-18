import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../../atoms/Auth/AuthAtoms';

const AuthRoute = ({ path, element}) => {

    const navigate = useNavigate();
    const [ authState, setAuthState ] = useRecoilState(authenticatedState); 

    useQuery(
        ["authenticated"], 
        async () => {
            const option = {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}` ,
            },
        };
        return await axios.get("http://localhost:8080/auth/authenticated", option);
    },{
        onSuccess: (response) => {
            console.log(response);
            if(response.status === 200 && response.data){
                setAuthState(true);
                if(path.startsWith("/auth") || path === "/"){
                    navigate("/main");
                }    
            }else{
                if(path.startsWith("/user") || path.startsWith("/main")){
                    navigate('/auth/login');
                }
            }
        },
        // onError: () => {
        //     setAuthState(false);
        //     if(path.startsWith("/user") || path.startsWith("/main")){
        //         navigate('/auth/login');
        //     }
        // }
    });

    return element;
};

export default AuthRoute;
