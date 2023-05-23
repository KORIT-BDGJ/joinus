/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FaUserCircle } from 'react-icons/fa';
const commentBody = css`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100px;
    overflow-y: auto;
`;

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

const commentBottom = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0px;
    width: 100%;
    
`;
const commentInput = css`
    width: 91%;
    height: 30px;
`;

const commentButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    margin-left: 10px;
`;

const Comment = ({ postId }) => {
    const [ comment, setComment ] = useState("");
    

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

    const commentSubmit = useMutation(async (postId) => {

        const option = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.post(`http://localhost:8080/post/${postId}/comment/submit`, JSON.stringify({
            userId: queryClient.getQueryData("principal").data.userId,
            comment: comment
        }), option);
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries("getComment");
          setComment("");
        },
      });

    const commentHandleChange = (e) => {
        setComment(e.target.value);
    }

    const sendComment = () => {
        commentSubmit.mutate(postId);
    };

    if(getComment.isLoading) {
        return <div>불러오는 중...</div>
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendComment();
        }
      };

    return (
        <>
            <div css={commentBody}>
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
            </div>
            <div css={commentBottom}>
                <input css={commentInput} type="text" placeholder="댓글을 입력하세요" value={comment} onChange={commentHandleChange} onKeyUp={handleKeyUp}/>
                <button css={commentButton } onClick={sendComment}>작성</button>
            </div>
        </>
    );
};

export default Comment;