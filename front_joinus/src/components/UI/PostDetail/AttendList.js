/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const tableContainer = css`
    width: 100%;
`




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
`;



const AttendList = ({ postId }) => {
    const queryClient = useQueryClient();



    const getAttendList= useQuery(["getAttendList"], async () => {

        const response = await axios.get(`http://localhost:8080/post/${postId}/attend/list`);
        return response;
    });

    if(getAttendList.isLoading) {
        return <div>불러오는 중...</div>
    }
    if(!getAttendList.isLoading)
    return (
        <div css={tableContainer}>
            {getAttendList.data.data.map(attendData => {
                return (
                    <div key={attendData.userId}>
                        <div css={member}>
                            <div css={attendInfo}>
                                <div css={infoImage}>{attendData.image}</div>
                                <div css={infoNickname}>{attendData.nickName}</div>
                            </div>
                            <div css={attendButtonContainer}>
                                <button css={attendButton}>내보내기</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      );      
};

export default AttendList;