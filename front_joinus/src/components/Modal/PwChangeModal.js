/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
  font-size: 16px;
  margin-bottom: 5px;
`;

const input = css`
  width: calc(100% - 80px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
`;

const cancelButton = css`
  background-color: #dbdbdb;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const confirmButton = css`
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;



const confirmInputButton = css`
  width: 70px;
  background-color: #2ecc71;
  color: white;
  padding: 8px 12px; /* Adjusted padding */
  border-radius: 5px;
  margin-left: 10px; /* Added margin-left */
  cursor: pointer;
`;

const inputContainer = css`
  display: flex;
  align-items: center;
`;

const errorMessage = css`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const PwChangeModal = ({ closeModal, updatePassword }) => {

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');


  const handleCurrentPwChange = (e) => {
    setCurrentPw(e.target.value);
  };

  const handleNewPwChange = (e) => {
    setNewPw(e.target.value);
  };

  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };


  const handleConfirm = () => {
    if (!currentPw) {
      setError('기존의 비밀번호를 입력하세요!');
    } else {
      setError('');
      // Perform confirmation logic if needed
    }
  };


  const handleSubmit = () => {
    // 비밀번호 변경 로직 구현
    if(newPw !== confirmPw){
      alert("비밀번호가 일치하지 않습니다.");
    }else{
      updatePassword(newPw);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      closeModal();
    }
  };

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <div css={inputWrapper}>
          <label css={label}>기존 비밀번호</label>
          <div css={inputContainer}>
            <input css={input} type="password" value={currentPw} onChange={handleCurrentPwChange} />
            <button css={confirmInputButton} onClick={handleConfirm}>확인</button>
          </div>
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        {/* <div css={inputWrapper}>
          <label css={label}>새 비밀번호</label>
          <input css={input} type="password" value={newPw} onChange={handleNewPwChange} />
        </div>
        <div css={inputWrapper}>
          <label css={label}>비밀번호 확인</label>
          <input css={input} type="password" value={confirmPw} onChange={handleConfirmPwChange} />
        </div> */}
        <div css={buttonContainer}>
          <button css={cancelButton} onClick={closeModal}>취소</button>
          <button css={confirmButton} onClick={handleSubmit}>변경</button>
        </div>
      </div>
    </div>
  );
};

export default PwChangeModal;
