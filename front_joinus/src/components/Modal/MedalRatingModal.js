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


const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const confirmButton = css`
  background-color: #C8E8E5;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;
const cancelButton = css`
  background-color: #dbdbdb;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const closeButton = css`
  background-color: #dbdbdb;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-weight: bold;
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


const attendButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const star = css`
  font-size: 40px;
  font-weight: bold;
  vertical-align:middle;
  color: #A7DED9;
  cursor: pointer;
  background-color: white;
  border: none;
`;

const score = css`
  display: inline-block;
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  color: #333;
`;

const errormessage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
`;


const MedalRatingModal = ({ modalState, postId, currentUserId, refetchHostFinishList, onComplete }) => {
  const [starValues, setStarValues] = useState({});
  const [evaluatedUserIds, setEvaluatedUserIds] = useState([]);
  
  const getAttendList = useQuery(["getAttendList"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.get(
      `http://3.39.18.64/post/${postId}/attend/list`,
      option
    );
    return response.data;
  });

  const handleNewStarChange = (userId, selectedStarValue) => {
    setStarValues((prevStarValues) => ({
      ...prevStarValues,
      [userId]: selectedStarValue,
    }));
  };

  const saveChanges = useMutation(
    async (starValues) => {
      console.log(starValues);
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.put(
        `http://3.39.18.64/account/point/rating`,
        starValues,
        option
      );
      return response.data;
    },
    {
      onSuccess: async (data, variables) => {
        if (data) {
          alert("평가가 완료되었습니다.");
    
          // 1. 평가가 완료된 사용자의 ID를 확인합니다.
          const evaluatedUserIds = Object.keys(variables.starValues);
    
          // 2. post_attend_list_tb에서 해당 사용자의 레코드를 삭제합니다.
          await Promise.all(
            evaluatedUserIds.map((userId) =>
              axios.delete(`http://3.39.18.64/post/${postId}/attend/delete`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                  postId: postId,
                  userId: userId,
                },
              })
            )
          );
          setEvaluatedUserIds((prevIds) => [
            ...prevIds,
            ...evaluatedUserIds,
          ]);
          modalState();
          refetchHostFinishList();
          return evaluatedUserIds;
        }
      },
    }
  );
  
  const saveChangeSubmitHandle = () => {
    saveChanges.mutateAsync({ starValues })
      .then(completedUserIds => {
        // 평가가 완료된 사용자의 ID를 전달합니다.
        onComplete(postId, completedUserIds);
      });
  };

  if (getAttendList.isLoading) {
    return <div>불러오는 중...</div>;
  }

  if (!getAttendList.isLoading) {
    const filteredAttendList = getAttendList.data.filter(
      (attendData) => currentUserId !== attendData.userId
    );

    const remainingAttendList = filteredAttendList.filter(
      (attendData) => !evaluatedUserIds.includes(attendData.userId)
    );

    if (remainingAttendList.length === 0) {
      return (
        <div css={modalContainer}>
          <div css={modalContent}>
            <p css={errormessage}>평가할 항목이 없습니다.</p>
            <div css={buttonContainer}>
              <button css={closeButton} onClick={modalState}>
                닫기
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div css={modalContainer}>
        <div css={modalContent}>
          <div css={tableContainer}>
            {remainingAttendList.map((attendData) => {
              const userId = attendData.userId;
              const starValue = starValues[userId] || 0;

              return (
                <div key={attendData.userId}>
                  <div css={member}>
                    <div css={attendInfo}>
                      <div css={infoImage}>
                        {attendData.image ? (
                          <img
                            css={imgIcon}
                            src={`http://3.39.18.64/image/profile/${attendData.image}`}
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
                            style={{
                              color: rating <= starValue ? "#A7DED9" : "gray",
                            }}
                          >
                            ☆
                          </button>
                        ))}
                      </div>
                      <div css={score}>{starValue}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div css={buttonContainer}>
            <button css={cancelButton} onClick={modalState}>
              취소
            </button>
            <button css={confirmButton} onClick={saveChangeSubmitHandle}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MedalRatingModal;
