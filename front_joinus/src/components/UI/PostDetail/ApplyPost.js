/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import ApplicantSelectStateLevelModal from '../../Modal/ApplicantSelectStateLevelModal';

const applyPostButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
`;


const ApplyPost = ({ postId }) => {
    const queryClient = useQueryClient();
    const [ applyStateId, setApplyStateId ] = useState("");
    const [ applyLevelId, setApplyLevelId ] = useState("");
    const [isStateLevelChangeModalOpen, setIsStateLevelChangeModalOpen] = useState(false);
    
    const openStateLevelChangeModal = () => {
        setIsStateLevelChangeModalOpen(true);
    };
    
    const getApplicantList= useQuery(["getApplicantList"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get(`http://localhost:8080/post/${postId}/applicant/list`, option);
        return response.data;
    });

    const getAttendList= useQuery(["getAttendList"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get(`http://localhost:8080/post/${postId}/attend/list`, option);
        return response.data;
    });

    const applyPost = useMutation(async () => {

        const option = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.post(`http://localhost:8080/post/apply/${postId}`, JSON.stringify({
            userId: queryClient.getQueryData("principal").userId,
            stateId: applyStateId,
            levelId: applyLevelId
        }), option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getApplicantList");
        }
    });

    const cancelApplyPost = useMutation(async () => {
        const option = {
            params: {
                userId: queryClient.getQueryData("principal").userId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`http://localhost:8080/post/cancel/apply/${postId}`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getApplicantList");
        } 
    });

    const cancelAttendPost = useMutation(async () => {
        const option = {
            params: {
                userId: queryClient.getQueryData("principal").userId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`http://localhost:8080/post/cancel/attend/${postId}`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAttendList");
        } 
    });

    if(getApplicantList.isLoading) {
        return <div>불러오는 중...</div>
    }

    const updateStateId = (newStateId) => {
        setApplyStateId(newStateId);
    };
    const updateLevelId = (newLevelId) => {
        setApplyLevelId(newLevelId);
    };

    const currentUserID = queryClient.getQueryData("principal").userId;
    const isCurrentUserApplied = getApplicantList.data.map(applicantData => applicantData.userId === currentUserID);
    const isCurrentUserAttended = getAttendList.data.map(attendData => attendData.userId === currentUserID);
    
    
    const closeStateLevelChangeModal = () => {
        setIsStateLevelChangeModalOpen(false);
        applyPost.mutate();
    };

    return (
        <div>
            {isCurrentUserAttended ? (
                <button css={applyPostButton} onClick={() => { cancelAttendPost.mutate() }}>취소</button>
            ) : (
                isCurrentUserApplied ? (
                    <button css={applyPostButton} onClick={() => { cancelApplyPost.mutate() }}>취소</button>
                  ) : (
                    <button css={applyPostButton} onClick={openStateLevelChangeModal}>신청</button>
                  )
            )}
          
            <footer>
                {isStateLevelChangeModalOpen && <ApplicantSelectStateLevelModal modalState={closeStateLevelChangeModal} updateStateId={updateStateId} updateLevelId={updateLevelId} postId={postId}/>}
            </footer>
        </div>
    );
};

export default ApplyPost;