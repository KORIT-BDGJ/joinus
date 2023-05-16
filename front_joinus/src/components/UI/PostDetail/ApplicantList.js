/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FaUserCircle } from 'react-icons/fa';

const applicantHeader = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
`;

const applicantCount = css`
    display: flex;
    flex-direction: row;
    height: 30px;
`;

const applicantList = (applicantShow) => css`
    display: ${applicantShow ? "flex" : "none"};
    flex-direction: column;
`;

const member = css`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const applicantButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
`;

const ApplicantList = ({ postId }) => {
    const queryClient = useQueryClient();
    const [ applicantShow, setApplicantShow ] = useState(false);

    const applicantClickHandle = (e) => {
        setApplicantShow(!applicantShow);
    };


    const getApplicantList= useQuery(["getApplicantList"], async () => {

        return await axios.get(`http://localhost:8080/post/${postId}/applicant/list`);
    });

    console.log(getApplicantList)

    if(getApplicantList.isLoading) {
        return <div>불러오는 중...</div>
    }
    if(!getApplicantList.isLoading)
    return (
        <div>
            <div css={applicantList(applicantShow)}>
                <div css={member}>
                    <div>
                        <FaUserCircle /> 신청자1
                    </div>
                    <div>
                        <button css={applicantButton}>수락</button>
                        <button css={applicantButton}>거절</button>
                    </div>
                </div>
                <div css={member}>
                    <div>
                        <FaUserCircle /> 신청자2
                    </div>
                    <div>
                        <button css={applicantButton}>수락</button>
                        <button css={applicantButton}>거절</button>
                    </div>
                </div>
                <div css={member}>
                    <div>
                        <FaUserCircle /> 신청자3
                    </div>
                    <div>
                        <button css={applicantButton}>수락</button>
                        <button css={applicantButton}>거절</button>
                    </div>
                </div>
                <div css={member}>
                    <div>
                        <FaUserCircle /> 신청자4
                    </div>
                    <div>
                        <button css={applicantButton}>수락</button>
                        <button css={applicantButton}>거절</button>
                    </div>
                </div>
                
            </div>
            <div css={applicantHeader}>
                <div css={applicantCount}>신청인원 정보 : (4/10)</div>
                <button css={applicantButton} onClick={applicantClickHandle}>신청자 보기</button>
            </div>
        </div>
    );
};

export default ApplicantList;