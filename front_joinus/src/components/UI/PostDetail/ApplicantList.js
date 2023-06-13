/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

const imgIcon = css`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const applicantButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const applicantButton = css`
    background-color: #C8E8E5;
    border: none;
    border-radius: 5px;
    height: 30px;
    margin-right: 5px;
    font-weight: bold;
    cursor: pointer;

    &:active {
        background-color: #A7DED9;
    }
`;

const rejectButton = css`
    background-color: #dbdbdb;
    border: none;
    border-radius: 5px;
    height: 30px;
    margin-right: 5px;
    font-weight: bold;
    cursor: pointer;

    &:active {
        background-color: #b5b5b5;
    }



`;




const ApplicantList = ({ postId, isCurrentUserAuthor, updateTotalApplicantCount, totalAttendCount, recruitsCount }) => {
    const queryClient = useQueryClient();


    const getApplicantList= useQuery(["getApplicantList"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get(`https://port-0-joinus-koh2xlitnedv8.sel4.cloudtype.app/post/${postId}/applicant/list`, option);
        return response.data;
    }, {
        onSuccess: (response) => {
            updateTotalApplicantCount(response.length);
        }
    });

    const applicantAccept = useMutation(async ({ postId, applicantUserId, applicantStateId, applicantLevelId }) => {
        
        const option = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.post(`https://port-0-joinus-koh2xlitnedv8.sel4.cloudtype.app/post/${postId}/applicant/accept`, JSON.stringify({
            userId: applicantUserId,
            stateId: applicantStateId,
            levelId: applicantLevelId
        }), option);
    }, {
        onSuccess: () => {
            queryClient.fetchQuery("getAttendList");
            queryClient.fetchQuery("getApplicantList");
        },
    });

    const applicantDelete = useMutation(async ({ postId, applicantUserId }) => {
        const option = {
            params: {
                userId: applicantUserId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`https://port-0-joinus-koh2xlitnedv8.sel4.cloudtype.app/post/${postId}/applicant/delete`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getApplicantList");
        }
        
    });

    const deleteApplicantUser = (userId) => {
        applicantDelete.mutate({ postId, applicantUserId: userId });
    };

    const acceptApplicantUser = (userId, stateId, levelId) => {
        if (totalAttendCount === recruitsCount) {
            // 수락 버튼을 누를 수 없는 경우 요청 취소 및 실패 알림
            alert("참여인원이 가득 찼습니다.");
            return;
        }
        applicantAccept.mutate({ postId, applicantUserId: userId, applicantStateId: stateId, applicantLevelId: levelId });
    };
    
    if(getApplicantList.isLoading) {
        return <div>불러오는 중...</div>
    }

    if(!getApplicantList.isLoading)
    return (
        <div css={tableContainer}>
            {getApplicantList.data.map(applicantData => {
                return (
                    <div key={applicantData.userId}>
                        <div css={member}>
                            <div css={applicantInfo}>
                                <div css={infoImage}>
                                {applicantData.image ? (
                                    <img
                                        css={imgIcon}
                                        src={"https://port-0-joinus-koh2xlitnedv8.sel4.cloudtype.app/image/profile/" + applicantData.image}
                                        alt="ProfileImage"
                                    />
                                ) : (
                                    <span>{applicantData.nickName}</span>
                                )}
                                </div>
                                <div css={infoNickname}>{applicantData.nickName}</div>
                                <div css={infoOption}>레벨: {applicantData.levelName}</div>
                                <div css={infoOption}>상태: {applicantData.stateName}</div>
                            </div>
                            <div css={applicantButtonContainer}>
                                {isCurrentUserAuthor && (
                                    <>
                                        <button
                                        css={applicantButton}
                                        onClick={() => acceptApplicantUser(applicantData.userId, applicantData.stateId, applicantData.levelId)}>
                                        수락
                                        </button>
                                        <button css={rejectButton} onClick={() => deleteApplicantUser(applicantData.userId)}>거절</button>
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

export default ApplicantList;