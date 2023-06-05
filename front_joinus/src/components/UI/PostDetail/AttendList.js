/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const tableContainer = css`
    width: 100%;
`;

const member = css`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
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
    border: none;
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
    background-color:  #C8E8E5;
    border: none;
    border-radius: 5px;
    height: 30px;
    font-weight: bold;

    cursor: pointer;

    &:hover {
    background-color:  #A7DED9;
    }
`;



const AttendList = ({ postId, isCurrentUserAuthor, updateTotalAttendCount }) => {
    const [ attendUserId, setAttendUserId ] = useState("");
    const queryClient = useQueryClient();

    const getAttendList= useQuery(["getAttendList"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get(`http://localhost:8080/post/${postId}/attend/list`, option);
        return response.data;
    }, {
        onSuccess: (response) => {
            updateTotalAttendCount(response.length);
        }
    });

    const attendDelete = useMutation(async ({ postId, attendUserId }) => {
        const option = {
            params: {
                userId: attendUserId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`http://localhost:8080/post/${postId}/attend/delete`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAttendList");
        }
        
    });

    const deleteAttendUser = (userId) => {
        attendDelete.mutate({ postId, attendUserId: userId });
    };

    if(getAttendList.isLoading) {
        return <div>불러오는 중...</div>
    }
    if(!getAttendList.isLoading)
    return (
        <div css={tableContainer}>
            {getAttendList.data.map(attendData => {
                return (
                    <div key={attendData.userId} >
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
                                <div css={infoOption}>레벨: {attendData.levelName}</div>
                                <div css={infoOption}>상태: {attendData.stateName}</div>
                            </div>
                            <div css={attendButtonContainer}>
                                {isCurrentUserAuthor && (
                                    <>
                                        <button css={attendButton} onClick={() => deleteAttendUser(attendData.userId)}>내보내기</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      );      
};

export default AttendList;