/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

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
  z-index: 999;
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
  font-size: 30px;
  font-weight: bold;
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
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:active {
    background-color: #b9b9b9;
  }
`;

const confirmButton = css`
  background-color: #C8E8E5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;

  &:active {
    background-color: #A7DED9;
  }
`;

const radioBox = css`
  font-size: 25px;
`;


const ApplicantSelectStateLevelModal = ({ closeStateLevelChangeModal, submitAndCloseModal, updateStateId, updateLevelId, postId }) => {
  const [newStateId, setNewStateId] = useState('');
  const [newLevelId, setNewLevelId] = useState('');

  const handleNewStateChange = (e) => {
      const selectedStateValue = e.target.value;

      if (selectedStateValue === '알려주세요') {
          setNewStateId(1);
      } else if (selectedStateValue === '같이해요') {
          setNewStateId(2);
      } else if (selectedStateValue === '알려줄게요') {
          setNewStateId(3);
      }
  };

  useEffect(() =>  {
      updateStateId(newStateId);
  }, [newStateId]);
  
  const handleNewLevelChange = (e) => {
    const selectedLevelValue = e.target.value;
    
    if (selectedLevelValue === '초급') {
      setNewLevelId(1);
    } else if (selectedLevelValue === '중급') {
      setNewLevelId(2);
    } else if (selectedLevelValue === '고급') {
      setNewLevelId(3);
    }
  };
  useEffect(() =>{
    updateLevelId(newLevelId);
  }, [newLevelId]);
  
  const handleSubmit = () => {
    if (!newStateId || !newLevelId) {
        alert("공란이 있습니다");
        return;
    }
    submitAndCloseModal();
  };

  const handleCancelButtonClick = () => {
    closeStateLevelChangeModal(); // 모달창 닫기
  };

  

  return (
      <div css={modalContainer}>
        <div css={modalContent}>
          <div css={inputWrapper}>
              <label css={label}>신청자의 상태를 선택하세요</label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="state"
                  value="알려주세요"
                  onClick={handleNewStateChange}
                />
                알려주세요
              </label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="state"
                  value="같이해요"
                  onClick={handleNewStateChange}
                />
                같이해요
              </label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="state"
                  value="알려줄게요"
                  onClick={handleNewStateChange}
                />
                알려줄게요
              </label>
          </div>
          <div css={inputWrapper}>
              <label css={label}>신청자의 레벨을 선택하세요</label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="level"
                  value="초급"
                  onClick={handleNewLevelChange}
                />
                초급
              </label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="level"
                  value="중급"
                  onClick={handleNewLevelChange}
                />
                중급
              </label>
              <label css={radioBox}>
                <input
                  type="radio"
                  name="level"
                  value="고급"
                  onClick={handleNewLevelChange}
                />
                고급
              </label>
          </div>
          <div css={buttonContainer}>
            <button css={confirmButton} onClick={handleSubmit}>확인</button>
            <button css={cancelButton} onClick={handleCancelButtonClick}>취소</button>
          </div>
        </div>
      </div>
  );
};

export default ApplicantSelectStateLevelModal;