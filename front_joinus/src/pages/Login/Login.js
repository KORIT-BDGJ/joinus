/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { useMutation } from 'react-query';


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
    width: 400px; 
    height: 300px;
    background-image: url('/images/logo_move2.gif');
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
    border: 2px solid #C8E8E5;
    border-radius: 10px;
    padding: 20px 20px;
    margin-top: 170px;
    width: 400px;

`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 20px;
    font-weight: 600;
`;

const forgetPassword = css`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin-bottom: 45px;
    width: 100%;
    font-size: 157x;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px;
    border: none; /* 테두리 제거 */
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: #C8E8E5;
    font-size: 30px;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #a7c6c2; /* 어둡게 설정한 호버 색상 */
    }
    &:active {
        background-color: #93b0ad; /* 어둡게 설정한 액티브 색상 */
    }
`;

const naverButton = css`
  background-image: url('/images/naver.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #03c75A;
  width: 160px;
  height: 42px;
  border-radius: 5px; /* 이미지와 동일한 모양을 얻으려면 적절한 값으로 조정하세요 */
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
`;

const googleButton = css`
  background-image: url('/images/google.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #4285F4; /* 구글 버튼의 배경색 */
  width: 160px;
  height: 42px;
  border-radius: 5px; /* 이미지와 동일한 모양을 얻으려면 적절한 값으로 조정하세요 */
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box; /* 박스의 크기를 일관되게 유지하려면 이 속성을 추가하세요 */
`;

const kakaoButton = css`
  background-image: url('/images/kakao.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: #fee500; /* 카카오 버튼의 배경색 */
  width: 160px;
  height: 42px;
  border-radius: 5px; /* 이미지와 동일한 모양을 얻으려면 적절한 값으로 조정하세요 */
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box; /* 박스의 크기를 일관되게 유지하려면 이 속성을 추가하세요 */
`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 10px;
    font-size: 15px;
    color:red;
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

const oauth2Container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
    gap: 10px;
`;



const footerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const Login = () => {

    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({ email:"",password:""});
    const [errorMessages, setErrorMessages] = useState({ email:"", password:"" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]:value });
    }

    const login = useMutation(async (loginUser) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", loginUser);
            setErrorMessages({email: "", password: "" ,  });
            return response;
        } catch(error) {
            if(error.response.status === 401) {
                alert("사용자 정보를 확인해주세요.");
            }
            setErrorMessages({email: "", password: "", ...error.response.data.errorData});
            return error;
        }
    }, {
        onSuccess: (response) => {
            if(response.status === 200) {
                localStorage.setItem("accessToken", response.data);
                navigate("/main");
            }
        }
    });
    
    const 
    loginHandleSubmit = async() => {
        login.mutate(loginUser);
    }

    const googleAuthClickHandle = () => {
        window.location.href="http://localhost:8080/oauth2/authorization/google";
    }

    const naverAuthCliclkHandle = () => {
        window.location.href="http://localhost:8080/oauth2/authorization/naver";
    }

    const kakaoAuthClickHandle = () => {
        window.location.href="http://localhost:8080/oauth2/authorization/kakao";
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
                    <div css= { forgetPassword }><Link to="/auth/forget/password">Forgot Password?</Link></div>
                    <button css={ loginButton } onClick={loginHandleSubmit}>로그인</button>
                </div>
                
                <div></div>
            </main>

            <div css = { signupMessage }>Or Sign Up Using</div>

            <div css={oauth2Container}>
                <div >
                    <button css={naverButton} onClick={naverAuthCliclkHandle}></button>
                </div>
                <div>
                    <button css={googleButton} onClick={googleAuthClickHandle}></button>
                </div>
                <div>
                    <button css={kakaoButton} onClick={kakaoAuthClickHandle}></button>
                </div>
            </div>



            

            <footer css={footerStyles}>
                <div css={register}>
                    <Link to="/auth/register">회원가입</Link>
                </div>
            </footer>
            
        </div>
    );
};

export default Login;