/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const modalContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalContent = css`
  width: 500px;
  background-color: white;
  padding: 20px 20px;  // 좌우 패딩을 20px로 설정
  border-radius: 5px;
`;

const h1 = css`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
`;

const inputWrapper = css`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const label = css`
  display: block;
  font-size: 25px;
  margin-bottom: 5px;
`;

const input = css`
  width: calc(100% - 10px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  outline: none;
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
`;

const cancelButton = css`
  background-color: #dbdbdb;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 23px;
  font-weight: bold;
  cursor: pointer;
`;

const confirmButton = css`
  background-color: #C8E8E5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 23px;
  font-weight: bold;
  cursor: pointer;
`;

const errorMessage = css`
  color: red;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const inputFocused = css`
  border: 3px solid #93b0ad;
`;

const OAuth2Merge = () => {
  const providerMerge = useMutation(async (mergeData) => {
    try {
      const response = await axios.put("http://3.39.18.64/auth/oauth2/merge", mergeData);
      return response;
    } catch (error) {
      setErrorMsg(error.response.data);
      return error;
    }
  }, {
    onSuccess: (response) => {
      if (response.status === 200) {
        alert("계정 통합 완료!");
        window.location.replace("/auth/login");
      }
    },
    onError: (error) => {}
  });

  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const provider = searchParams.get("provider");
  const [passwordFocused, setPasswordFocused] = useState(false);


  const passwordChangeHandle = (e) => {
    setPassword(e.target.value);
  }

  const providerMergeSubmitHandle = () => {
    if (!password) {
        setErrorMsg("기존 계정의 비밀번호를 입력하세요")
        return;
    }
    providerMerge.mutate({
      email,
      password,
      provider
    });
  }

  const cancelHandle = () => {
    window.location.replace("/auth/login");
  }

//   if (providerMerge.isLoading) {
//     return <></>;
//   }

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <h1 css={h1}>{email} 계정을 {provider} 계정과 통합하는 것에 동의 하십니까?</h1>
        <div css={inputWrapper}>
          <label css={label}>기존 계정의 비밀번호</label>
          <input
            css={[input, passwordFocused && inputFocused]}
            type="password"
            placeholder="기존 계정의 비밀번호를 입력하세요"
            value={password}
            onChange={passwordChangeHandle}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {errorMsg && <div css={errorMessage}>{errorMsg}</div>}
        </div>
        <div css={buttonContainer}>
          <button css={confirmButton} onClick={providerMergeSubmitHandle}>
            동의
          </button>
          <button css={cancelButton} onClick={cancelHandle}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuth2Merge;
