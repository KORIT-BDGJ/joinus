/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

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


const ApplicantSelectStateLevelModal = ({ modalState, updateStateId, updateLevelId, postId, applyPost }) => {
    const [ newStateValue, setNewStateValue] = useState('');
    const [ newLevelValue, setNewLevelValue] = useState('');
    const [newStateId, setNewStateId] = useState('');
    const [newLevelId, setNewLevelId] = useState('');


    const handleNewStateChange = (e) => {
        const selectedStateValue = e.target.value;

        if (selectedStateValue === '알려줄게요') {
            setNewStateValue(1);
        } else if (selectedStateValue === '알려주세요') {
            setNewStateValue(2);
        } else if (selectedStateValue === '같이해요') {
            setNewStateValue(3);
        }
        setNewStateId(newStateValue);
    };

    const handleNewLevelChange = (e) => {
        const selectedLevelValue = e.target.value;

        if (selectedLevelValue === '초급') {
            setNewLevelValue(1);
        } else if (selectedLevelValue === '중급') {
            setNewLevelValue(2);
        } else if (selectedLevelValue === '고급') {
            setNewLevelValue(3);
        }

        setNewLevelId(newLevelValue);
    };

    const handleSubmit = () => {
        updateStateId(newStateId);
        updateLevelId(newLevelId);
        alert("신청이 성공적으로 완료되었습니다.");
        modalState();
        applyPost.mutate(postId)
    };

    return (
        <div css={modalContainer}>
          <div css={modalContent}>
            <div css={inputWrapper}>
                <label css={label}>신청자의 상태를 선택하세요</label>
                <label>
                <input
                    type="radio"
                    name="state"
                    value="알려줄게요"
                    onChange={handleNewStateChange}
                />
                알려줄게요
                </label>
                <label>
                <input
                    type="radio"
                    name="state"
                    value="알려주세요"
                    onChange={handleNewStateChange}
                />
                알려주세요
                </label>
                <label>
                <input
                    type="radio"
                    name="state"
                    value="같이해요"
                    onChange={handleNewStateChange}
                />
                같이해요
                </label>
            </div>
            <div css={inputWrapper}>
                <label css={label}>신청자의 레벨을 선택하세요</label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="초급"
                        onChange={handleNewLevelChange}
                    />
                초급
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="중급"
                        onChange={handleNewLevelChange}
                    />
                중급
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="고급"
                        onChange={handleNewLevelChange}
                    />
                고급
                </label>
            </div>
            <div css={buttonContainer}>
              <button css={cancelButton} onClick={modalState}>취소</button>
              <button css={confirmButton} onClick={handleSubmit}>확인</button>
            </div>
          </div>
        </div>
    );
};

export default ApplicantSelectStateLevelModal;