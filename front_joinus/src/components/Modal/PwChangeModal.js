/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const modalContainer = css`
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
  padding: 20px;
  border-radius: 5px;
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
  width: calc(100% - 8px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const inputError = css`
  width: calc(100% - 8px);
  padding: 10px;
  font-size: 16px;
  border: 2px solid red;
  border-radius: 5px;
`;

const inputSuccess = css`
  width: calc(100% - 8px);
  padding: 10px;
  font-size: 16px;
  border: none;
  border: 2px solid #C8E8E5; 
  border-radius: 5px;
`;

const inputActive = css`
 width: calc(100% - 8px);
  padding: 10px;
  font-size: 16px;
  border: 2px solid black; 
  border-radius: 5px;
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
`;

const confirmButton = css`
  background-color: #C8E8E5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-weight: bold;
  cursor: pointer;

  &:active{
    background-color: #85B4A3;
  }
`;
const cancelButton = css`
  background-color: #dbdbdb;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:active {
    background-color: #b5b5b5; /* 더 진한 색상으로 변경 */
  }
`;




const confirmInputButton = css`
  width: 70px;
  background-color: #C8E8E5;
  color: black;
  padding: 8px 12px; /* Adjusted padding */
  border: none;
  border-radius: 5px;
  margin-left: 10px; /* Added margin-left */
  font-weight: bold;
  cursor: pointer;

  &:active{
    background-color: #85B4A3;
  }
`;

const inputContainer = css`
  display: flex;
  align-items: center;
`;

const errorMessage = css`
  color: red;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const PwChangeModal = ({ closeModal, updatePassword }) => {

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [inputErrorState, setInputErrorState] = useState(false);
  const [inputActiveState, setInputActiveState] = useState(false);

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://3.39.18.64/account/principal", option);
    return response.data;
  });

  
  const handleCurrentPwChange = (e) => {
    setCurrentPw(e.target.value);
  };
  
  const handleNewPwChange = (e) => {
    setNewPw(e.target.value);
  };
  
  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };
  
  const handleInputFocus = () => {
    setError('');
    setInputActiveState(true);
  };
  
  const handleInputBlur = () => {
    setInputErrorState(false);
  };
  
 

  const handleConfirm = async () => {
    if (!currentPw) {
      setError('기존의 비밀번호를 입력하세요!');
      return; 
    } 
    try {
      
      const options = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      };
      console.log(`Sending password: ${currentPw}`);
      const response = await axios.post('http://3.39.18.64/account/check/password', 
        {
          email: principal.data.email,
          oldPassword: currentPw
        }  
      ,options);

      
      if (response.status === 200 ) {

        if(response.data === true){
          alert("일치하는 비밀번호를 찾았습니다.");
          setPasswordConfirmed(true);
          setInputErrorState(false);
          setInputActiveState(false);
        }else if(response.data === false){
          alert("일치하는 비밀번호를 찾지 못했습니다.");
          setInputErrorState(true);
          setInputActiveState(false);
        }else{
          setError('예기치 못한 예외가 발생하였습니다.');
        }

      }
    }catch (error) {
      //console.log(error.message);
      setError('An error occurred during password confirmation');
      setInputErrorState(false);
    }
    
  };


  const handleSubmit = async () => {
    // 비밀번호 변경 로직 구현
    // 비밀번호 또는 비밀번호 확인란이 비어 있는 경우의 검사
    if(!newPw){
      alert("새 비밀번호를 입력해주세요.");
      return;
    }
  
    if(!confirmPw){
      alert("비밀번호 확인란을 비워둘 수 없습니다.");
      return;
    }
    if(newPw !== confirmPw){
      setNewPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (currentPw === newPw) {
      setNewPasswordError("기존 비밀번호와 새 비밀번호가 동일합니다. 다른 비밀번호를 선택해주세요.");
      return;
    }
  
    const options = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    };
  
    try {
      const response = await axios.put('http://3.39.18.64/account/change/password', 
        {
          email: principal.data.email,
          oldPassword: currentPw,
          newPassword: newPw
        }  
      , options);
  
      if (response.status === 200 ) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        closeModal();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNewPasswordError("비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16 글자로 작성하세요.");
      } else {
        setNewPasswordError("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  if(principal.isLoading) {
    return <></>;
  }

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <div css={inputWrapper}>
          <label css={label}>기존 비밀번호</label>
          <div css={inputContainer}>
            <input 
              css={passwordConfirmed ? inputSuccess : (inputActiveState ? inputActive : (inputErrorState ? inputError : input))} 
              type="password" 
              value={currentPw} 
              onChange={handleCurrentPwChange} 
              onFocus={handleInputFocus} 
              onBlur={handleInputBlur} 
              disabled={passwordConfirmed}
            />
            <button css={confirmInputButton} onClick={handleConfirm} disabled={passwordConfirmed}>확인</button>
          </div>
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        {passwordConfirmed && (
          <>
            <div css={inputWrapper}>
              <label css={label}>새 비밀번호</label>
              <input css={input} type="password" value={newPw} onChange={handleNewPwChange} />
            </div>
            <div css={inputWrapper}>
              <label css={label}>비밀번호 확인</label>
              <input css={input} type="password" value={confirmPw} onChange={handleConfirmPwChange} />
              {newPasswordError && <div css={errorMessage}>{newPasswordError}</div>}
            </div>
          </>
        )}
        <div css={buttonContainer}>
          <button css={confirmButton} onClick={handleSubmit}>변경</button>
          <button css={cancelButton} onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PwChangeModal;
