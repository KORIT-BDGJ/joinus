/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaRegAddressCard, FaSearch } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { BiFemale, BiMale } from 'react-icons/bi';

const inputLabel = css`
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
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

const UserOAuth2Register = () => {
  const navigate = useNavigate();

  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
    gender: "", // 추가된 필드
  });

  const [passwords, setPasswords] = useState({ password: '', passwordConfirm: '' });
  const [searchParams, setSearchParams] = useSearchParams();
  const registerToken = searchParams.get('registerToken');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const provider = searchParams.get('provider');

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
    setPasswords({ ...passwords, [name]: value });
  };

  const oauth2RegisterSubmitHandle = () => {
    oauth2Register.mutate({
      email,
      name,
      ...passwords,
      provider,
    });
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
    <div>
      <input type="text" value={email} disabled={true} />
      <input type="text" value={name} disabled={true} />
      <input type="password" name="password" placeholder="비밀번호" onChange={passwordInputChangeHandle} />
      <input type="password" name="passwordConfirm" placeholder="비밀번호확인" onChange={passwordInputChangeHandle} />
      <label css={inputLabel}>Address</label>
      <div css={addressContainer}>
        <LoginInput
          type="text"
          placeholder="Click the search button"
          onChange={addressInputChangeHandle}
          name="address"
          readOnly={true}
          value={registerUser.address}
        >
          <FaRegAddressCard />
        </LoginInput>
        <button css={searchButton} onClick={searchAddress}>
          <FaSearch />
        </button>
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
      </div>
      <button onClick={oauth2RegisterSubmitHandle}>가입하기</button>
    </div>
  );
};

export default UserOAuth2Register;