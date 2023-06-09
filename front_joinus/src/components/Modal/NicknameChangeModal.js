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
  width: 100%;
  padding: 10px;
  font-size: 25px;
  border: 1px solid #dbdbdb;
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
  margin-right: 10px;
  border: none;
  border-radius: 5px;
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


const errorMessage = css`
  color: red;
  font-size: 20px;
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
    const response = await axios.get("http://3.39.18.64/account/principal", option);
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
        const response = await axios.put('http://3.39.18.64/account/change/nickname', 
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
          <button css={confirmButton} onClick={handleSubmit}>확인</button>
          <button css={cancelButton} onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default NicknameChangeModal;
