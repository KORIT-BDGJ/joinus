/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';

const container = css`
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	padding: 30px 30px;
`;

const title = css` // 평가하기
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 34px;
  font-weight: 600;
`;

const list = css` 
	width: 100%;
	max-width: 800px;
	margin-top: 30px;
	border: 1px solid #dbdbdb;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	max-height: 700px;
`;

const listItem = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #dbdbdb;

    &:last-child {
        border-bottom: none;
    }
`;

const postInfo = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
`;

const postTitle = css` // 글 제목
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    &:hover {
        cursor: pointer;
        color: #0095f6;
    }
`;

const buttons = css`
    display: flex;
    gap: 10px;
    height: 30px;
`;

const buttonLabel = css`
	white-space: nowrap;
	overflow: hidden;
`;

const userContainer = css`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const userNickname = css`
  margin-right: 10px;
`;

const medalButton = css`
  cursor: pointer;
`;



const Review = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: '완료한 운동 목록 1',
            editButton: true,
            deleteButton: true,
            users: [
                { nickname: '유저1', medalCount: 2 },
                { nickname: '유저2', medalCount: 3 },
            ],
        },
        {
            id: 2,
            title: '완료한 운동 목록 2',
            editButton: true,
            deleteButton: true,
            users: [
                { nickname: '유저3', medalCount: 4 },
                { nickname: '유저4', medalCount: 1 },
            ],
        },
    ]);
    
    const [modal, setModal] = useState({ type: '', isOpen: false }); 

    const [hoveredStar, setHoveredStar] = useState({ postId: null, userNickname: null, starCount: 0 });

    const handleButtonClick = (type, id) => { 
		setModal({ type, isOpen: true });
	};

    const cancelAction = () => {
        setModal({ type: '', isOpen: false });
    };

    const confirmAction = () => {
		if (modal.type === 'evaluate') { 
			console.log('평가하기');
		} else if (modal.type === 'skip') {
			console.log('하지않기');
		}
		setModal({ type: '', isOpen: false });
	};

    const handleStarMouseOver = (postId, userNickname, starCount) => {
        setHoveredStar({ postId, userNickname, starCount });
    };

    const handleStarMouseOut = () => {
        setHoveredStar({ postId: null, userNickname: null, starCount: 0 });
    };

    const handleStarClick = (postId, userNickname, newMedalCount) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        users: post.users.map((user) => {
                            if (user.nickname === userNickname) {
                                return {
                                    ...user,
                                    medalCount: newMedalCount,
                                };
                            } else {
                                return user;
                            }
                        }),
                    };
                } else {
                    return post;
                }
            })
        );
    };
    
    const starOptions = [1, 2, 3, 4, 5]; // 별점 옵션
    const inactiveStar = '🔘'; // 빈 별 모양
    const activeStar = '⭐'; // 채워진 별 모양

    return (
        <div css={container}> 
            <h1 css={title}>평가하기</h1>
            <ul css={list}>
                {posts.map((post) => (
                    <li key={post.id} css={listItem}>
                    <div css={postInfo}>
                        <h2 css={postTitle}>{post.title}</h2>
                        <div css={buttons}>
                            {post.editButton && (
                            <button onClick={() => handleButtonClick('evaluate', post.id)}> 
                                <span css={buttonLabel}>평가하기</span>
                            </button>
                            )}
                            {post.deleteButton && (
                            <button onClick={() => handleButtonClick('skip', post.id)}>
                                <span css={buttonLabel}>하지않기</span>
                            </button>
                            )}
                        </div>
                    </div>
                    <div css={userInfo}>
                    {post.users.map((user) => (
                        <div key={user.nickname} css={userContainer}>
                            <span css={userNickname}>{user.nickname}</span>
                            <div>
                            {starOptions.map((starCount) => (
                                <button
                                    key={starCount}
                                    css={medalButton}
                                    onMouseOver={() =>
                                        handleStarMouseOver(post.id, user.nickname, starCount)
                                    }
                                    onMouseOut={handleStarMouseOut}
                                    onClick={() =>
                                        handleStarClick(post.id, user.nickname, starCount)
                                    }
                                >
                                    {starCount <=
                                    (hoveredStar.postId === post.id &&
                                    hoveredStar.userNickname === user.nickname
                                        ? hoveredStar.starCount
                                        : user.medalCount)
                                        ? activeStar
                                        : inactiveStar}
                                </button>
                            ))}
                            </div>
                        </div>
                    ))}
                    </div>
                    </li>
                ))}
            </ul>
            {modal.isOpen && (
                <AlertModal
                    isModalOpen={modal.isOpen}
                    confirmRemove={confirmAction}
                    cancelRemove={cancelAction}
                    message={modal.type === 'evaluate' ? '평가하시겠습니까?' : '평가를 하지 않으시겠습니까?'}
                />
            )}
        </div>
      );
};

export default Review;