/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {  useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import { FcSportsMode } from 'react-icons/fc';
import { MdOutlineSportsTennis } from 'react-icons/md';
import Sidebar from './../../../components/Sidebar/Sidebar';

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

const postInfo = css` // 글 정보
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px; 
`;

const userInfo = css` // 유저 정보
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
`;

const iconWrapper = css` // 리스트 스포츠 아이콘
    font-size: 50px; 
    &:hover {
        cursor: pointer;
        filter: invert(1);
    }
`;

const postOwnerNickName = css` // 방장(작성자) 닉네임
    font-size: 30px;
    font-weight: 600;
    margin: 0;
    display: inline;
`;

const postDate = css` // 글 작성 날짜
    font-size: 24px;
    margin-left: 10px;
    color: #8e8e8e;
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
  margin-bottom: 10px; 
`;


const userName = css`
    font-size: 26px;
    margin-right: 10px;
`;

const medalButton = css`
  cursor: pointer;
`;



const Review = () => {

    const [posts, setPosts] = useState([
        {
            postId: 1,
            sportsIcon: <FcSportsMode />,
            ownerNickname: '방장1',
            date: '2021-05-06',
            editButton: true,
            deleteButton: true,
            users: [
                { userId: 1, username: '유저1', medalCount: 2 },
                { userId: 2, username: '유저2', medalCount: 3 },
            ],
        },
        {
            postId: 2, 
            sportsIcon: <MdOutlineSportsTennis />,
            ownerNickname: '방장2',
            date: '2021-05-08',
            editButton: true,
            deleteButton: true,
            users: [
                { userId: 3, username: '유저3', medalCount: 4 },
                { userId: 4, username: '유저4', medalCount: 1 },
            ],
        },
    ]);
    

    const [userType, setUserType] = useState(""); // 방장인지 일반 유저인지 구분하기 위한 상태
    
    const handleIconClick = () => { // 방장 또는 일반 유저 가 아이콘을 누를 시 OwnerHostDetail 또는 HostPostDetail로 이동하도록 한다.
        if (userType === 'owner') {
            // 방장인 경우
            // ownerPostDetail로 이동하는 코드를 여기에 작성합니다.
            console.log("Move to ownerPostDetail");
        } else {
            // 일반 사용자인 경우
            // HostPostDetail로 이동하는 코드를 여기에 작성합니다.
            console.log("Move to HostPostDetail");
        }
    };

    const [modal, setModal] = useState({ type: '', isOpen: false }); // 모달 상태

    const [hoveredStar, setHoveredStar] = useState({ postId: null, userId: null, starCount: 0 }); // 별점 상태

    const handleButtonClick = (type, id) => { // 버튼 클릭 시 모달 열기
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

    const handleStarMouseOver = (postId, userId, starCount) => {  // 별점 마우스 오버 시
        setHoveredStar({ postId, userId, starCount });
    };

    const handleStarMouseOut = () => {
        setHoveredStar({ postId: null, userId: null, starCount: 0 });
    };

    const handleStarClick = (postId, userId, newMedalCount) => { // 별점 클릭 시
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        users: post.users.map((user) => {
                            if (user.userId === userId) {
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
        <Sidebar></Sidebar>
            <h1 css={title}>평가하기</h1>
            <ul css={list}>
            {posts.map((post) => (
                <li key={post.postId} css={listItem}>
                    <div css={postInfo}>
                        <div css={iconWrapper} onClick={handleIconClick}> {post.sportsIcon}</div> 
                        <span css={postOwnerNickName}>{post.ownerNickname}</span>
                        <span css={postDate}>{post.date}</span>
                        <div css={buttons}>
                            {post.editButton && (
                            <button onClick={() => handleButtonClick('evaluate', post.postId)}> 
                                <span css={buttonLabel}>평가하기</span>
                            </button>
                            )}
                            {post.deleteButton && (
                            <button onClick={() => handleButtonClick('skip', post.postId)}>
                                <span css={buttonLabel}>하지않기</span>
                            </button>
                            )}
                        </div>
                    </div>
                    <div css={userInfo}>
                    {post.users.map((user) => (
                        <div key={user.userId} css={userContainer}>
                            <span css={userName}>{user.username}</span>
                            <div>
                                {starOptions.map((starCount) => (
                                    <button
                                        key={starCount}
                                        css={medalButton}
                                        onMouseOver={() =>
                                            handleStarMouseOver(post.id, user.userId, starCount)
                                        }
                                        onMouseOut={handleStarMouseOut}
                                        onClick={() =>
                                            handleStarClick(post.id, user.userId, starCount)
                                        }
                                    >
                                        {starCount <=
                                        (hoveredStar.postId === post.id &&
                                        hoveredStar.userId === user.userId
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