/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import { FcSportsMode } from 'react-icons/fc';
import { MdOutlineSportsTennis } from 'react-icons/md';
import Sidebar from '../../../components/Sidebar/Sidebar';

const container = css`
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	padding: 30px 30px;
`;

const title = css` // 내가 참여한 글
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  font-size: 34px;
  font-weight: 600;
  
`;

const list = css`
  width: 100%;
  max-width: 900px; 
  margin: 30px auto; 
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

const iconWrapper = css` // 리스트 스포츠 아이콘
    font-size: 50px; 
`;

const postTitle = css` // 글 제목
    font-size: 24px;
    font-weight: 600;
    width: 100%;
    margin: 0;
    &:hover {
        cursor: pointer;
        color: #0095f6;
    }
    
`;

const postDate = css`
  font-size: 18px;
  font-weight: 600;
  color: #8e8e8e;
`;

const buttons = css`
  display: flex;
  gap: 10px;
  height: 30px;
  width: 100px;
  justify-content: flex-end; 
`;

const HostPostList = () => {
    // 1. 상태선언
    // 1.1 신청한 글과 참여 완료한 글의 상태
    const [applicantPosts, setApplicantPosts] = useState([
        {
            postId: 1,
            sportsIcon: <FcSportsMode />,
            postTitle: '알림 관리1시간, 8시간, 1일, 3일 동안 또는 다음 주까지 스누즈합니다.',
            ownerNickname: '알림 관리1시간',
            date: '2021-05-06',
            cancelButton: true,
        },
        // 여기에 다른 신청한 글 데이터를 추가
    ]);
    
    const [attendPosts, setAttendPosts] = useState([
        {
            postId: 4,
            sportsIcon: <MdOutlineSportsTennis />,
            postTitle: '글 제목 4',
            ownerNickname: '방장4',
            date: '2021-05-12',
            users: [
                { userId: 5, username: '유저5', medalCount: 5 },
                { userId: 6, username: '유저6', medalCount: 3 },
            ],
        },
        
        // 여기에 다른 참여 완료한 글 데이터를 추가
    ]);
    const [cancelPostId, setCancelPostId] = useState(null); // 신청 취소할 글의 ID
    
    // 1.2 모달 상태
    const [cancelModalOpen, setCancelModalOpen] = useState(false); // 신청 취소 모달 상태
    const [evaluateModalOpen, setEvaluateModalOpen] = useState({ type: '', isOpen: false });
    
    // 1.3 기타 상태
    const [hoveredStar, setHoveredStar] = useState({ postId: null, userId: null, starCount: 0 }); // 별점 상태
    
    // 2. 이벤트 핸들러
    // 2.1 신청한 글 관련 핸들러

    const openCancelModal = (id) => {
        setCancelPostId(id);
        setCancelModalOpen(true);
    };
    
    const closeCancelModal = () => {
        setCancelPostId(null);
        setCancelModalOpen(false);
    };

    const cancelPost = () => { // 신청 취소
        console.log('취소가 완료되었습니다.');
    
       
        setCancelModalOpen(false);
    };
    
    const movePost = (id) => { // 글 제목 클릭 시 해당 상세페이지로 이동
		console.log(`해당 상세페이지로 이동 ${id}`);
	};

    // 2.2 참여 완료한 글 관련 핸들러

    const handleButtonClick = (type) => {
        setEvaluateModalOpen({ type, isOpen: true });
    };
    
    const confirmEvaluate = () => {
        if (evaluateModalOpen.type === 'evaluate') {
            console.log('평가하기');
            // 평가 로직을 여기에 추가합니다.
        } else if (evaluateModalOpen.type === 'skip') {
            console.log('평가하지 않기');
            // 평가하지 않는 로직을 여기에 추가합니다.
        }
        setEvaluateModalOpen({ type: '', isOpen: false });
        console.log(evaluateModalOpen); // 상태 업데이트 후 확인
    };
    
    const cancelEvaluate = () => {
        setEvaluateModalOpen({ type: '', isOpen: false });
        console.log(evaluateModalOpen); // 상태 업데이트 후 확인
    };
    

    // 2.3 별점 관련 핸들러

    const handleStarMouseOver = (postId, userId, starCount) => {  // 별점 마우스 오버 시
        setHoveredStar({ postId, userId, starCount });
    };

    const handleStarMouseOut = () => { // 별점 마우스 아웃 시
        setHoveredStar({ postId: null, userId: null, starCount: 0 });
    };

    const handleStarClick = (postId, userId, newMedalCount) => { // 별점 클릭 시
        setAttendPosts((prevPosts) =>
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

    // 3. 렌더링

    return (
        <div css={container}>
            <Sidebar></Sidebar>
            {/* 3.1 신청한 글 */}
            <div>
                <h1 css={title}>내가 신청한 글</h1>
                <ul css={list}>
                {applicantPosts.map((post) => (
                    <li key={post.postId} css={listItem}>
                    <div css={postInfo}>
                        <div css={iconWrapper}>
                        {post.sportsIcon}
                        </div>
                        <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                        {post.postTitle}
                        </h1>
                        <div css={postDate}>{post.date}</div>
                        <div css={buttons}>
                        {post.cancelButton && (
                        <button onClick={() => openCancelModal(post.postId)}>
                            취소하기
                        </button>
                        )}
                    </div>
                    </div>
                    
                    </li>
                ))}
                </ul>
            </div>
    
            {/* 3.2 참여 완료한 글 */}
            <div>
                <h1 css={title}>참여 완료한 글</h1>
                <ul css={list}>
                {attendPosts.map((post, index) => (
                    <div key={index}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <button onClick={() => handleButtonClick('edit', post.id)}>평가하기</button>
                        <button onClick={() => handleButtonClick('delete', post.id)}>하지않기</button>
                        <div>
                            {starOptions.map((starCount, index) => (
                                <span
                                    key={index}
                                    onMouseOver={() => handleStarMouseOver(post.id, post.userId, starCount)}
                                    onMouseOut={handleStarMouseOut}
                                    onClick={() => handleStarClick(post.id, post.userId, starCount)}
                                >
                                    {hoveredStar.postId === post.id && hoveredStar.userId === post.userId && hoveredStar.starCount >= starCount ? activeStar : inactiveStar}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                </ul>
            </div>
    
            {/* 3.3 모달 */}
            {cancelModalOpen && (
                <AlertModal
                    isModalOpen={cancelModalOpen}
                    confirmRemove={cancelPost} 
                    cancelRemove={closeCancelModal} 
                    message="취소하시겠습니까?"
                />
            )}
           {evaluateModalOpen.isOpen && (
                <AlertModal
                    isModalOpen={evaluateModalOpen.isOpen}
                    confirmRemove={confirmEvaluate}
                    cancelRemove={cancelEvaluate}
                    onClose={() => setEvaluateModalOpen({ type: '', isOpen: false })}
                    message={evaluateModalOpen.type === 'evaluate' ? '평가하시겠습니까?' : '평가를 하지 않으시겠습니까?'}
                />
            )}
        </div>
    );
    
};

export default HostPostList;