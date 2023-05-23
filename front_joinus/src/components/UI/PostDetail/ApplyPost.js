import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

const ApplyPost = ({ postId }) => {
    const queryClient = useQueryClient();

    const getApplicantList= useQuery(["getApplicantList"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get(`http://localhost:8080/post/${postId}/applicant/list`, option);
        return response;
    });

    const applyPost = useMutation(async (postId) => {

        const option = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.post(`http://localhost:8080/post/apply/${postId}`, JSON.stringify({
            userId: queryClient.getQueryData("principal").userId,
            stateId: "1",
            levelId: "1"
        }), option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getApplicantList");
        }
    });

    const cancelApplyPost = useMutation(async (postId) => {
        const option = {
            params: {
                userId: queryClient.getQueryData("principal").userId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`http://localhost:8080/post/cancle/apply/${postId}`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getApplicantList");
        }
        
    });

    if(getApplicantList.isLoading) {
        return <div>불러오는 중...</div>
    }

    const currentUserID = queryClient.getQueryData("principal").userId;
    const isCurrentUserApplied = getApplicantList.data.data.some(applicantData => applicantData.userId === currentUserID);

    return (
        <div>
          {isCurrentUserApplied ? (
            <button onClick={() => { cancelApplyPost.mutate(postId) }}>취소</button>
          ) : (
            <button onClick={() => { applyPost.mutate(postId) }}>신청</button>
          )}
        </div>
    );
};

export default ApplyPost;