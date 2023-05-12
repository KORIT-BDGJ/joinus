
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';

import { BiFemale, BiMale } from 'react-icons/bi';




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
    width: 310px; 
    height: 210px;
    background-image: url('/images/6_plus.png');
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
    margin-top: 75px;
    padding: 50px 20px;
    width: 400px;
`;

const authForm = css`
  width: 100%;

`;

const inputLabel = css`
    margin-left: 5px;
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

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color:red;
`;


const UserRegister = () => {

    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({
        email: "",
        password: "",
        name: "",
        passwordConfirm: "",
        address: "",
        gender: "",
    });
    const [errorMessages, setErrorMessages] = useState({
        email: "",
        password: "",
        name: "",
        passwordConfirm: "",
        address: "",
        gender: "",
    });

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser( { ...registerUser, [name]:value } );
    }

    const registerSubmit = async() => {
        const data = {
            ...registerUser
        }

        const option = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        try{
            await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option);
            setErrorMessages({email: "", password: "" , name: ""}); //빈값 ( 로그인 성공 시, error 메시지 뜨지않음 )
            alert("회원가입 성공!");
            navigate("/login");
            
        }catch (error) {
            setErrorMessages({
              email: "",
              password: "",
              name: "",
              passwordConfirm: "",
              address: "",
              gender: "",
              ...error.response.data.errorData,
            });
          }

    }

    return (
        <div css= {container}>
            <header>
                <div css={headerContainer}>
                    <div css={logoStyle}>
                        <h2 css ={ title }> </h2>  

                    </div>
                </div>
            </header>
            <main css={ mainContainer }>
                <div css={authForm}>
                    <label css={ inputLabel }>Name</label>
                    <LoginInput type="text" placeholder="Please enter your name" onChange={onChangeHandle} name ="name">
                        <FiUser />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.name}</div>
                    <label css={ inputLabel }>Email</label>
                    <LoginInput type="email" placeholder="Please enter your email" onChange={onChangeHandle} name="email">
                        <HiOutlineMail />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.email}</div>

                    <label css={ inputLabel }>Password</label>
                    <LoginInput type="password" placeholder="Please enter your password" onChange={onChangeHandle} name="password">
                        <FiLock />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.password}</div>
                    <label css={ inputLabel }>Password 확인</label>
                    <LoginInput type="password" placeholder="Please check your password" onChange={onChangeHandle} name="passwordConfirm">
                        <RiLockPasswordLine />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.passwordConfirm}</div>
                    <label css={ inputLabel }>Address</label>
                    <LoginInput type="text" placeholder="Please enter your address" onChange={onChangeHandle} name="address">
                        <FaRegAddressCard />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.address}</div>
                    <label css={inputLabel}>성별</label>
                    <div>
                        <label>
                            <input type="radio" name="gender" value="male" onChange={onChangeHandle} />
                            <BiMale />
                            남성
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" onChange={onChangeHandle} />
                            <BiFemale />
                            여성
                        </label>
                    </div>
                    <div css={errorMsg}>{errorMessages.gender}</div>


                    <button css={ loginButton } onClick={registerSubmit}>등록</button>
                    
                </div>
                
            </main>

            <div css= { signupMessage }>Already a user?</div>

            <footer>
                <div css = { register }><Link to="/login">로그인</Link></div>
            </footer>
        </div>
    );
};

export default UserRegister;