/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser } from 'react-icons/fi';
import axios from 'axios';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 25px;
    font-weight: 600;
`;
const headerContainer = css`
    height :125px ;
    display: flex;
    align-content: flex-start;
    justify-content: center;
`;

const title = css`
  font-weight : 600 ;
  font-size: 35px;

`;

const emailContainer = css`
    display: flex;
    align-items: center;
`;

const confirmButton = css`
    width: 50px;
    height: 30px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content:center;
    align-items: center;
    border: none;
    background-color : #C8E8E5;
    cursor: pointer;
    border-radius: 5px;
`;


const ForgetPassword = () => {

    const [loginUser, setLoginUser] = useState({ email:"",password:""});
    const [errorMessages, setErrorMessages] = useState({
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]:value });
    }


    const checkEmailSubmitHandle = async() => {
        try {
            const response = await axios.put("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/auth/forget/password", { email: loginUser.email });
          
            if (response.status === 200) {
                alert('일치하는 이메일 정보가 있습니다.');
                const sendResponse = await axios.post("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/auth/validation/send", { email: loginUser.email });
                if(sendResponse.status === 200) {
                    alert('해당 이메일로 인증 메일을 발송하였습니다.');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.status === 400) {
                    alert('일치하는 이메일 정보가 없습니다.');
                } else {
                    setErrorMessages((prevErrorMessages) => ({
                        ...prevErrorMessages,
                        email: '',
                        ...error.response.data.errorData,
                    }));
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

  return (
        <div css={container}>
            
            <header css={headerContainer}>
                <h1 css={title}>비밀 번호 변경</h1>
            </header>
           
            
            <main>
                <div css={emailContainer}>
                    <label css = { inputLabel }>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={handleChange} name="email" >
                        <FiUser />
                    </LoginInput>  
                    <button css={confirmButton} onClick={checkEmailSubmitHandle}>확인</button>
                </div>

            </main>
 
        </div>
  );
};

export default ForgetPassword;