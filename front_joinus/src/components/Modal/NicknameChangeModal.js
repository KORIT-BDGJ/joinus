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
  font-size: 16px;
  margin-bottom: 5px;
`;

const input = css`
  width: 100%;
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

const errorMessage = css`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const NicknameChangeModal = ({ closeModal, updateNickname }) => {
  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState(''); 
  
  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  const handleNewNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSubmit = async () => {
    const options = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    };

    try {
        const response = await axios.put('http://localhost:8080/account/change/nickname', 
            {
                email: principal.data.email,
                newNickname: newNickname
            }, 
            options
        );

        if (response.status === 200 ) {
            alert("닉네임이 성공적으로 변경되었습니다.");
            closeModal();
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.errorData.newNickname);
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
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
          <label css={label}>변경할 닉네임을 입력하시오</label>
          <input css={input} type="text" value={newNickname} onChange={handleNewNicknameChange} />
          {error && <div css={errorMessage}>{error}</div>}
        </div>
        <div css={buttonContainer}>
          <button css={cancelButton} onClick={closeModal}>취소</button>
          <button css={confirmButton} onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default NicknameChangeModal;
