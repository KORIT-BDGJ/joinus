/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { GoogleLogin } from 'react-google-login';


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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
    gap: 10px;
`;

const googleLoginButtonStyle = css`
    position: relative;
    width: 220px;
    height: 45px;
    border-radius: 10px;
`;

const footerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const Login = () => {

    const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
    
    useEffect(() => {
        const initializeNaverLoginButton = () => {
          const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "YOUR_CLIENT_ID",
            callbackUrl: "YOUR_CALLBACK_URL",
            loginButton: { color: "green", type: 3, height: 48 },
          });
      
          naverLogin.init(); // 로그인 설정
        };
        const initializeKakaoLoginButton = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
              window.Kakao.init("YOUR_KAKAO_APP_KEY");
              window.Kakao.Auth.createLoginButton({
                container: "#kakao-login-btn",
                success: function (authObj) {
                  console.log("Kakao login success:", authObj);
                },
                fail: function (err) {
                  console.error("Kakao login error:", err);
                },
              });
            }
        };

        const loadGoogleAPI = () => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.async = true;
            script.onload = () => {
              window.gapi.load('auth2', () => {
                setGoogleApiLoaded(true);
              });
            };
            document.body.appendChild(script);
          };
        
          if (typeof window !== "undefined" && window.naver) {
            initializeNaverLoginButton();
          }
          if (typeof window !== "undefined" && window.Kakao) {
            initializeKakaoLoginButton();
          }
          if (typeof window !== "undefined" && window.gapi) {
            loadGoogleAPI();
        }
    }, []);
    
    const responseGoogle  = (response) => {
        console.log(response);
    }

    const renderGoogleLoginButton = (renderProps) => {
        return (
            <button
                css={googleLoginButtonStyle}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
            >
                <img
                    src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                    alt="Google Login"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "230px",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </button>
        );
    };
      
      

    
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

            <div css={oauth2Container}>
                <div id="naverIdLogin"></div>
                <div id="kakao-login-btn"></div>
                <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderGoogleLoginButton}
                />
            </div>



            

            <footer css={footerStyles}>
                <div css={register}>
                    <Link to="/register">회원가입</Link>
                </div>
                <div css={userinfo}>
                    <Link to="/userinfo">유저정보</Link>
                </div>
            </footer>
            
        </div>
    );
};

export default Login;