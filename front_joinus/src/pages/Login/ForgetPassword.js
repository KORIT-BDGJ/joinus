/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser } from 'react-icons/fi';



const inputLabel = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;




const ForgetPassword = () => {
    const [loginUser, setLoginUser] = useState({ email:"",password:""});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]:value });
    }
    return (
        <div>
           <label css = { inputLabel }>Email</label>
            <LoginInput type="email" placeholder="Type your email" onChange={handleChange} name="email" >
                <FiUser />
            </LoginInput>         
        </div>
    );
};

export default ForgetPassword;