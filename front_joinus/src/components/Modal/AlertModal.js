/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modal = css`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const modalMessage = css`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const modalButtons = css`
  display: flex;
  gap: 20px;
  height: 30px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const AlertModal = ({ isModalOpen, confirmRemove, cancelRemove, message }) => { 
  if (!isModalOpen) return null;

  return (
    <div css={modalOverlay}>
      <div css={modal}>
        <p css={modalMessage}>{message}</p> 
        <div css={modalButtons}>
          <button css={confirmButton} onClick={confirmRemove}>확인</button>
          <button css={cancelButton} onClick={cancelRemove}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;