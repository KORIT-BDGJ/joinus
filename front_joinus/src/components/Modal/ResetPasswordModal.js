/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';


// CSS Definitions
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
  font-size: 25px;
  font-weight: bold;
  /* 추가적인 스타일링 */
`;

const inputWrapper = css`
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
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const confirmButton = css`
  background-color: #85B4A3;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 20px;
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
  border: 3px solid #85B4A3;
`;

const ResetPasswordModal = ({ setIsOpen , setResetSuccess }) => {
 
  const [ isLoad, setIsLoad ] = useState(true);
  const { temporaryToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const checkToken = useQuery(["checkToken"], async () => {
    const option = {
      params : {
        token: temporaryToken
      }
    }
    try {
      const response = await axios.get("http://3.39.18.64/auth/forget/password/token", option);
      return response.data
    } catch (error) {
      alert(error.response.data.message);
      window.location.replace("http://localhost:3000/auth/login");
      return error;
    }
  }, {
    enabled: isLoad,
    onSuccess: () => {
      setIsLoad(false);
    }
  });
  

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }

    if (!confirmPassword) {
      alert('비밀번호 확인란을 비워둘 수 없습니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setNewPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      
      const response = await axios.put(
        'http://3.39.18.64/auth/reset/password',
        {
          temporaryToken: temporaryToken,
          email: checkToken.data,
          newPassword: newPassword,
        }
      );
      
      
      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.replace("http://localhost:3000/auth/login");
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNewPasswordError(
          '비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16 글자로 작성하세요.'
        );
      } else {
        setNewPasswordError(
          '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  };

  const handleCancel = () => {
    alert('만료된 페이지입니다.');
    window.location.replace("http://localhost:3000/auth/login");
  };

  if(checkToken.isLoading){
    return <></>;
  }

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <h1 css={h1}>비밀번호 변경</h1>
        <div css={inputWrapper}>
          <label css={label}>새 비밀번호</label>
          <input
            css={[input, newPasswordFocused && inputFocused]}
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={handleChangeNewPassword}
            onFocus={() => setNewPasswordFocused(true)}
            onBlur={() => setNewPasswordFocused(false)}
          />
        </div>
        <div css={inputWrapper}>
          <label css={label}>새 비밀번호 확인</label>
          <input
            css={[input, confirmPasswordFocused && inputFocused]}
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />
          {newPasswordError && <div css={errorMessage}>{newPasswordError}</div>}
        </div>
        <div css={buttonContainer}>
          <button css={confirmButton} onClick={handleResetPassword}>
            비밀번호 변경
          </button>
          <button css={cancelButton} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
