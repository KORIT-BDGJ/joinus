/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

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

const star = css`
  font-size: 40px;
  font-weight: 900;
  color: #ffd700;
  cursor: pointer;
  background-color: white;
  border: none;
`;


const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
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

const tableContainer = css`
    width: 100%;
`;

const member = css`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const attendInfo = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const imgIcon = css`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const infoImage = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 1px solid #dbdbdb;
    border-radius:  50%;
    font-size: 10px;
`;

const infoNickname = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    padding-left: 10px;
`;
const infoOption = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    padding-left: 10px;
`;

const attendButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const attendButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
`;

const MedalRatingModal = ({ modalState, postId, currentUserId }) => {
  const [starValues, setStarValues] = useState({});
  const getAttendList= useQuery(["getAttendList"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }

    const response = await axios.get(`http://localhost:8080/post/${postId}/attend/list`, option);
    return response.data;
  });
  
  
  
  const handleNewStarChange = (userId, selectedStarValue) => {
    setStarValues((prevStarValues) => ({
      ...prevStarValues,
      [userId]: selectedStarValue,
    }));
  };

  const saveChanges = useMutation(async (starValues)=> {
    console.log(starValues)
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.put(`http://localhost:8080/point/rating/}`, starValues, option);
    return response;
    }, {
      onSuccess: (response) => {
          if(response.status === 200) {
              alert("평가가 완료되었습니다.");
              modalState();
          }
      }
  });
  const saveChangeSubmitHandle = () => {
    saveChanges.mutate({
      starValues
    })
  }

  if(getAttendList.isLoading) {
    return <div>불러오는 중...</div>
  }
  if(!getAttendList.isLoading)
  return (
      <div css={modalContainer}>
        <div css={modalContent}>
        <div css={tableContainer}>
            {getAttendList.data.map(attendData => {
              const userId = attendData.userId;
              const starValue = starValues[userId] || 0;
              const isCurrentUser = currentUserId === userId;
              return (
                <div key={attendData.userId} >
                {!isCurrentUser  && (
                      <div css={member}>
                          <div css={attendInfo}>
                              <div css={infoImage}>
                                  {attendData.image ? (
                                      <img
                                          css={imgIcon}
                                          src={"http://localhost:8080/image/profile/" + attendData.image}
                                          alt="ProfileImage"
                                      />
                                  ) : (
                                      <span>{attendData.nickName}</span>
                                  )}
                              </div>
                              <div css={infoNickname}>{attendData.nickName}</div>
                          </div>
                          <div css={attendButtonContainer}>
                            <div>
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  css={star}
                                  onClick={() => handleNewStarChange(userId, rating)}
                                  style={{ color: rating <= starValue ? 'yellow' : 'gray' }}
                                >
                                  ☆
                                </button>
                              ))}
                            </div>
                            <button css={attendButton}>별점주기</button>
                          </div>
                      </div>
                    )}
                    </div>
                  );
          })}
        </div>
          <div css={buttonContainer}>
            <button css={cancelButton} onClick={modalState}>취소</button>
            <button css={confirmButton} onClick={saveChangeSubmitHandle}>확인</button>
          </div>
        </div>
      </div>
  );
};

export default MedalRatingModal;