
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
`;
const logoStyle= css`
    width: 310px; 
    height: 210px;
    background-image: url('/images/register.png');
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
    margin-top: 100px;
    padding: 20px 20px;
    padding-bottom: 0px;
    width: 400px;
`;

const authForm = css`
  width: 100%;

`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 25px;
    font-weight: 600;
`;



const registerButton = css`
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 10px 0px ;
    border: none;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: #C8E8E5;
    color: black;
    font-weight: 900;
    cursor: pointer;
    &:hover {
    background-color: #A6CEC7;  // 대략적으로 #C8E8E5보다 조금 어둡게 설정하였습니다.
    }
    &:active {
    background-color: #85B4A3;  // 대략적으로 #C8E8E5보다 훨씬 어둡게 설정하였습니다.
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
    width: 30px;
    height: 30px;
    border: none;
    background-color : #C8E8E5;
    cursor: pointer;
    border-radius: 5px;
    font-size: 20px;

    &:hover {
    background-color: #85B4A3;
    }
`;


const signupMessage = css`
    margin-top: 20px;
    font-size: 18px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-size: 25px;
    font-weight: 600;
`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 17px;
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
            navigate("/auth/login");
            
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
                if (!error.response || error.response.status !== 400) {
                    console.error('Unexpected error:', error);
                }
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

                    <button css={ registerButton } onClick={registerSubmit}>등록</button>
                    
                </div>
                
            </main>

            <div css= { signupMessage }>Already a user?</div>

            <footer>
                <div css = { register }><Link to="/auth/login">로그인</Link></div>
            </footer>
        </div>
    );
};

export default UserRegister;