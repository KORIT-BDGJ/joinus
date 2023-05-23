/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
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
const inputContainer = css`
  display: flex;
  align-items: center;
`;
const label = css`
  display: block;
  font-size: 16px;
  margin-bottom:5px;
`;

const input = css`
  width: calc(100% - 80px);
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;
const inputWrapper = css`
  margin-bottom: 10px;
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

const searchButton = css`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 70px;
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-left: 10px; 
  cursor: pointer;
`;

const AddressChangeModal = ({ closeModal, updateAddress }) => {

  const [newAddress, setNewAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  if(principal.isLoading) {
    return <></>;
  }

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        var addr = '';
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        setNewAddress(addr);
      },
    }).open();
  };

  

  const handleSubmit = async () => {

    if (!newAddress){
      alert("주소를 공란으로 둘 수 없습니다.");
      return;
    }


    const options = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    };
    
    try {
      const response = await axios.put('http://localhost:8080/account/change/address', 
        {
          email: principal.data.email,
          newAddress: newAddress
        }  
      , options);
  
      if (response.status === 200 ) {
        alert("주소가 성공적으로 변경되었습니다.");
        updateAddress(newAddress);
        closeModal();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAddressError("주소 형식이 올바르지 않습니다. 다시 입력해주세요.");
      } else {
        setAddressError("주소 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div css={modalContainer}>
      <div css={modalContent}>
        <div css={inputWrapper}>
          <label css={label}>변경할 주소를 입력하시오</label>
          <div css={inputContainer}>
            <input css={input} type="text" placeholder="Click the search button" value={newAddress} readOnly={true} />
            <button css={searchButton} onClick={searchAddress}><FaSearch /></button>
          </div>
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
