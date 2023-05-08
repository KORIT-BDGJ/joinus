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

const AddressChangeModal = ({ closeModal, updateAddress }) => {

  const [newAddress, setNewAddress] = useState('');


  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };


  

  const handleSubmit = () => {
    
    updateAddress(newAddress);
    alert("주소가 성공적으로 변경되었습니다.");
    closeModal();
  };

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <div css={inputWrapper}>
        <label css={label}>변경할 주소를 입력하시오</label>
        <input css={input} type="text" value={newAddress} onChange={handleNewAddressChange} />
        </div>
        <div css={buttonContainer}>
          <button css={cancelButton} onClick={closeModal}>취소</button>
          <button css={confirmButton} onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default AddressChangeModal;
