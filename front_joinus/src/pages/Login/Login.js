/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FiLock, FiUser } from 'react-icons/fi';
import { SiKakao, SiNaver } from 'react-icons/si';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';



const headerContainer = css`
    height :125px ;
    display: flex;
    align-content: flex-start;
    justify-content: center;
`;

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    
`;

const logoStyle= css`
    width: 300px; 
    height: 200px;
    background-image: url('/images/5_plus.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const title = css`
    margin: 0px;
`;   


const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 50px 20px;
    margin-top: 75px;
    width: 400px;

`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;

const forgotPassword = css`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin-bottom: 45px;
    width: 100%;
    font-size: 12px;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px ;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }

`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color:red;
`;

const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-weight: 600;
`;

const userinfo = css`
    margin-top: 10px;
    font-weight: 600;
`;

const oauth2Container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
`;

const oauth2 = (provider) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    
    border: 1px solid ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60":  "#ffdc00"};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: ${provider === "kakao" ? "30px" : "20px"};
    cursor: pointer;
    &:hover {
        background-color: ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60":  "#ffdc00"};
    }
    
    
`;



const Login = () => {
    
    const [errorMessages, setErrorMessages] = useState({ email: "", password: "" });

    const handleChange = () => {
    
        
        
    };

    const loginHandleSubmit = () => {

    }


    return (
        <div css ={ container }>
            <header>
                <div css={headerContainer}>
                    <h1 css = { title }>
                        <div css={logoStyle} />
                    </h1>
                </div>
            </header>
            <main css = { mainContainer}>
                <div>
                    <label css = { inputLabel }>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={handleChange} name="email" >
                        <FiUser />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.email}</div>
                    <label css = {inputLabel}>Password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={handleChange} name="password" >
                        <FiLock />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.password}</div>
                    <div css= { forgotPassword }><Link to="/forgot/password">Forgot Password?</Link></div>
                    <button css={ loginButton } onClick={loginHandleSubmit}>로그인</button>
                </div>
                
                <div></div>
            </main>

            <div css = { signupMessage }>Or Sign Up Using</div>

            <div css= {oauth2Container}>
                <div css={ oauth2("google") }><BsGoogle /></div>
                <div css={ oauth2("naver") }><SiNaver /></div>
                <div css={ oauth2("kakao") }><SiKakao /></div>
            </div>


            

            <footer>
            <div css = { register }><Link to="/register">회원가입</Link></div>
            <div css = { userinfo }><Link to="/userinfo">유저정보</Link></div>
            </footer>
            
        </div>
    );
};

export default Login;