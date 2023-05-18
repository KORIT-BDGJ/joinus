/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FaUserCircle } from 'react-icons/fa';

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

const applicantInfo = css`
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

const applicantButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const applicantButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    margin-right: 5px;
    cursor: pointer;
`;



const ApplicantList = ({ postId }) => {
    const queryClient = useQueryClient();




    const getApplicantList= useQuery(["getApplicantList"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        const response = await axios.get(`http://localhost:8080/auth/post/${postId}/applicant/list`, option);
        return response;
    });

    if(getApplicantList.isLoading) {
        return <div>불러오는 중...</div>
    }
    if(!getApplicantList.isLoading)
    return (
        <div css={tableContainer}>
            {getApplicantList.data.data.map(applicantData => {
                return (
                    <div key={applicantData.userId}>
                        <div css={member}>
                            <div css={applicantInfo}>
                                <div css={infoImage}>{applicantData.image}</div>
                                <div css={infoNickname}>{applicantData.nickName}</div>
                            </div>
                            <div css={applicantButtonContainer}>
                                <button css={applicantButton}>수락</button>
                                <button css={applicantButton}>거절</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );      
};

export default ApplicantList;