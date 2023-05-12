
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegAddressCard, FaSearch } from 'react-icons/fa';

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
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 10px 0px ;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: #2ecc71;
    color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
    border: 1px solid #000000;
    }
    &:active {
    background-color: #27ae60;
    }
`;

const addressContainer = css`
    display: flex;
    align-items: center;
`;

const searchButton = css`
    display: flex;
    justify-content:center;
    align-items: center;
    margin-left: 10px;
    border: none;
    background-color : #2ecc71;
    cursor: pointer;
    border-radius: 5px;
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
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        address: "",
        gender: "",
    });
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const searchAddress = () => {
       
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = '';

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }
                console.log(addr);
                setRegisterUser({ ...registerUser, address: addr });
            },
        }).open();
    };

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser( { ...registerUser, [name]:value } );
    }

    const registerSubmit = async() => {

        if (registerUser.name === "" || 
            registerUser.email === "" || 
            registerUser.password === "" || 
            registerUser.passwordConfirm === "" || 
            registerUser.address === "" || 
            registerUser.gender === ""
            ) {
            let missingInputs = [];
            if (registerUser.name === "") missingInputs.push("이름");
            if (registerUser.email === "") missingInputs.push("이메일");
            if (registerUser.password === "") missingInputs.push("비밀번호");
            if (registerUser.passwordConfirm === "") missingInputs.push("비밀번호 확인");
            if (registerUser.address === "") missingInputs.push("주소");
            if (registerUser.gender === "") missingInputs.push("성별");
    
            alert(missingInputs.join(", ") + " 입력란을 확인해주세요.");
            return;
        }

        // 클라이언트 단에서 검증이 완료되면 서버와 통신
        const data = {
            ...registerUser,
        }

        const option = {
            headers: {
                "Content-Type" : "application/json",
            },
        };

        try{
            await axios.post("http://localhost:8080/auth/register", JSON.stringify(data), option);
            setErrorMessages({name: "", email: "", password: "" ,passwordConfirm: ""}); //빈값 ( 로그인 성공 시, error 메시지 뜨지않음 )
            alert("회원가입 성공!");
            navigate("/login");
            
        }catch (error) {
            if (error.response && error.response.data) {
                setErrorMessages({
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    ...error.response.data.errorData,
                });
            } else {
                console.error('Unexpected error:', error);
            }
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
                    <div css={addressContainer}>
                        <LoginInput
                            type="text"
                            placeholder="Click the search button"
                            onChange={onChangeHandle}
                            name="address"
                            readOnly={true}
                            value={registerUser.address}
                        >
                            <FaRegAddressCard />
                        </LoginInput>
                        <button css={searchButton} onClick={searchAddress}>
                                <FaSearch />
                        </button>
                    </div>
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