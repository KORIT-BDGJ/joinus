/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaRegAddressCard, FaSearch } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
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

const UserOAuth2Register = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const registerToken = searchParams.get('registerToken');
  const emailFromNaver = searchParams.get('email');
  const nameFromNaver  = searchParams.get('name');
  const provider = searchParams.get('provider');

  const [registerUser, setRegisterUser] = useState({
    name: nameFromNaver,
    email: emailFromNaver,
    password: "",
    passwordConfirm: "",
    address: "",
    gender: "", 
    // 초기값을 "FEMALE"로 잡아도 됨
    provider: provider,
  });

  const [errorMessages, setErrorMessages] = useState({
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


  
  const validateInputs = () => {
    if (registerUser.password === "" || 
        registerUser.passwordConfirm === "" || 
        registerUser.address === "" || 
        registerUser.gender === "" ) {
      let missingInputs = [];
      if (registerUser.password === "") missingInputs.push("비밀번호");
      if (registerUser.passwordConfirm === "") missingInputs.push("비밀번호 확인");
      if (registerUser.address === "") missingInputs.push("주소");
      if (registerUser.gender === "") missingInputs.push("성별");
  
      alert(missingInputs.join(", ") + " 입력란을 확인해주세요.");
      return false;
    }
  
    if (registerUser.password !== registerUser.passwordConfirm) {
      setErrorMessages((prevState) => ({
        ...prevState,
        passwordConfirm: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      }));
      return false;
    }
  
    return true;
  };
  
  const oauth2Register = useMutation(
    async (registerData) => {
      const option = {
        headers: {
          registerToken: `Bearer ${registerToken}`,
        },
      };

      try {
        const response = await axios.post('http://localhost:8080/auth/oauth2/register', registerData, option);
        return response;
      } catch (error) {
        alert('페이지가 만료되었습니다.');
        window.location.replace('/auth/login');
        return error;
      }
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert('회원가입 완료.');
          window.location.replace('/auth/login');
        }
      },
    }
  );

  const passwordInputChangeHandle = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const oauth2RegisterSubmitHandle = async () => {
    const isValid = validateInputs();
  
    if (!isValid) {
      return;
    }
  
    const registerData = {
      email,
      name,
      ...passwords,
      provider,
      address: registerUser.address,
      gender: registerUser.gender,
    };
  
    try {
      await oauth2Register.mutateAsync(registerData);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages({
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
          ...error.response.data.errorData,
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const addressInputChangeHandle = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';

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
                    <LoginInput type="text" placeholder="Please enter your name" onChange={onChangeHandle} name ="name" value={registerUser.name} disabled={true}>
                        <FiUser />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.name}</div>
                    <label css={ inputLabel }>Email</label>
                    <LoginInput type="email" placeholder="Please enter your email" onChange={onChangeHandle} name="email" value={registerUser.email} disabled={true}>
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

                    <button css={ loginButton } onClick={oauth2RegisterSubmitHandle}>등록</button>
                    
                </div>
                
            </main>

            <div css= { signupMessage }>Already a user?</div>

            <footer>
                <div css = { register }><Link to="/auth/login">로그인</Link></div>
            </footer>
        </div>
    );
};

export default UserOAuth2Register;