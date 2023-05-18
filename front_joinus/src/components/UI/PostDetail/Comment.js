/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FaUserCircle } from 'react-icons/fa';

const chatting = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
`;

const chattingHeader = css`
    display: flex;
    flex-direction: row;
`;

const infoImage = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #dbdbdb;
    border-radius:  50%;
    font-size: 5px;
`;

const infoNickname = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    padding: 0px 10px;
`;

const chattingBody = css`
    display: flex;
    flex-direction: row;
`;

const Comment = ({ postId }) => {

    const queryClient = useQueryClient();

    const getComment= useQuery(["getComment"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get(`http://localhost:8080/post/${postId}/comment`, option);
        return response;
    });

    if(getComment.isLoading) {
        return <div>불러오는 중...</div>
    }

    return (
        <>
            {getComment.data.data.map(commentData => {
                return (
                    <div css={chatting} key={commentData.commentId}>
                        <div css={chattingHeader}>
                            <div css={infoImage}>{commentData.image}</div>
                            <div css={infoNickname}>{commentData.nickName} :</div>
                        </div>
                        <div css={chattingBody}>{commentData.comment}</div>
                    </div>
                );
            })}
        </>
    );
};

export default Comment;