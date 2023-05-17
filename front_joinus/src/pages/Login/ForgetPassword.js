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
    font-size: 12px;
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
  font-size: 30px;

`;

const emailContainer = css`
    display: flex;
    align-items: center;
`;

const confirmButton = css`
    width: 50px;
    height: 20px;
    display: flex;
    justify-content:center;
    align-items: center;
    border: none;
    background-color : #2ecc71;
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

        const registerData = {
            email: loginUser.email, // 유저가 입력한 이메일 주소
          };
          
          const option = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          
          try {
            const response = await axios.get("http://localhost:8080/auth/forget/password", JSON.stringify(registerData), option);
          
            if (response.status === 200) {
              alert('이메일 검색 완료');
            }
          } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessages((prevErrorMessages) => ({
                  ...prevErrorMessages,
                  email: '',
                  ...error.response.data.errorData,
                }));
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

            <footer>

            </footer>
             
        </div>
    );
};

export default ForgetPassword;