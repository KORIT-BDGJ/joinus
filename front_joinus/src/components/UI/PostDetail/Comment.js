/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    white-space: nowrap;
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
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    &:hover > button {
        visibility: visible;
    }
`;

const commentDeleteButton = css`
    visibility: hidden;
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
    transform: translateY(-50%);
    border: 1px solid black;
  }
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

const commentSendButton = css`
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

const Comment = ({ postId }) => {
    const [ comment, setComment ] = useState("");
    const [ deleteCommentId, setDeleteCommentId ] = useState("");
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
            userId: queryClient.getQueryData("principal").userId,
            comment: comment
        }), option);
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries("getComment");
          setComment("");
        },
    });

    

    const commentDelete = useMutation(async ({ postId, deleteCommentId }) => {
        const option = {
            params: {
                commentId: deleteCommentId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.delete(`http://localhost:8080/post/${postId}/comment/delete`, option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getComment");
        }
        
    });



    const commentHandleChange = (e) => {
        setComment(e.target.value);
    }

    const sendComment = () => {
        commentSubmit.mutate(postId);
    };

    const sendCommentHandle = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sendComment();
        }
    };
    
    const deleteComment = (commentId) => {
        commentDelete.mutate({ postId, deleteCommentId: commentId });
    };

    if(getComment.isLoading) {
        return <div>불러오는 중...</div>
    }

    const userId = queryClient.getQueryData("principal").userId;


    


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
                                {commentData.userId === userId ? (
                                    <div css={chattingBody}>{commentData.comment}
                                        <button css={commentDeleteButton} onClick={() => deleteComment(commentData.commentId)}>삭제하기</button>
                                    </div>
                                ) : (
                                    <div css={chattingBody}>{commentData.comment}</div>
                                )}
                        </div>
                    );
                })}
            </div>
            <div css={commentBottom}>
                <input css={commentInput} type="text" placeholder="댓글을 입력하세요" value={comment} onChange={commentHandleChange} onKeyUp={sendCommentHandle}/>
                <button css={commentSendButton } onClick={sendComment}>작성</button>
            </div>
        </>
    );
};

export default Comment;