/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import { FcSportsMode } from 'react-icons/fc';
import { MdOutlineSportsTennis } from 'react-icons/md';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRedo } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px;
`;

const title = css`
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
  max-height: 300px;
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

const iconWrapper = css`
  font-size: 50px;
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const buttons = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  height: 60px;
  width: 100px;
`;

const attendUserListTitle = css`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`;

const postDate = css`
  font-size: 20px;
  font-weight: 600;
  color: #8e8e8e;
`;

const attendUserName = css`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const titleAndDateContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const star = css`
  font-size: 20px;
  color: #ffd700;
  cursor: pointer;
`;

const resetButton = css`
  font-size: 20px;
  color: #000;
  cursor: pointer;
`;

const HostPostList = () => {
    // 신청 글 상태
    const [applicantPosts, setApplicantPosts] = useState([
        {
            postId: 1,
            sportsIcon: <FcSportsMode />,
            postTitle: '알림 관리1시간, 8시간, 1일, 3일 동안 또는 다음 주까지 스누즈합니다.',
            ownerNickname: '알림 관리1시간',
            // date: '2021-05-06',
            cancelButton: true,
        },
    ]);
    // 참여 완료한 글 상태
    const [attendPosts, setAttendPosts] = useState([
        {
            postId: 4,
            sportsIcon: <MdOutlineSportsTennis />,
            postTitle: '알림 관리1시간, 8시간, 1일, 3일 동안 또는 다음 주까지 스누즈합니다.',
            ownerNickname: '방장4',
            date: '2021-05-11',
            users: [
                { userId: 5, username: '유저5', medalCount: 0 },
                { userId: 6, username: '유저6', medalCount: 0 },
            ],
        },
        {
            postId: 5,
            sportsIcon: <MdOutlineSportsTennis />,
            postTitle: '알림 관리1시간, 8시간, 1일, 3일 동안 또는 다음 주까지 스누즈합니다.',
            ownerNickname: '방장4',
            date: '2021-05-12',
            users: [
                { userId: 7, username: '유저5', medalCount: 0 },
                { userId: 8, username: '유저6', medalCount: 0 },
            ],
        },
    ]);

    // 모달 상태
    const [cancelModalOpen, setCancelModalOpen] = useState(false); // 신청 취소 모달 상태
    const [evaluateModalOpen, setEvaluateModalOpen]= useState({
        type: "",
        isOpen: false,
        postId: null, // 평가할 글의 ID 추가
      });
    
    // 기타 상태
    const [selectedPosts, setSelectedPosts] = useState([]); // 선택한 글의 ID를 저장하는 배열
    const [cancelPostId, setCancelPostId] = useState(null); // 신청 취소할 글의 ID
    const [evaluateUsers, setEvaluateUsers] = useState([]); // 평가할 유저 정보 배열 추가
    const [hoveredStar, setHoveredStar] = useState({
        postId: null,
        userId: null,
        starCount: 0,
      }); 

    // 별점 상태
    const [starCount, setStarCount] = useState({});
    const [starCountState, setStarCountState] = useState({}); // 별점 개수 상태
    
    // 신청 취소 모달 열기/닫기

    const openCancelModal = (id) => {
        setCancelPostId(id);
        setCancelModalOpen(true);
    };
    
    const closeCancelModal = () => {
        setCancelPostId(null);
        setCancelModalOpen(false);
    };

    // 신청 취소
    const cancelPost = () => { // 신청 취소
        console.log('취소가 완료되었습니다.');
        setCancelModalOpen(false);
    };

    // 신청 글 제목 클릭 시 상세페이지 이동
    const movePost = (id) => { // 글 제목 클릭 시 해당 상세페이지로 이동
		console.log(`해당 상세페이지로 이동 ${id}`);
	};

    

    // 참여 완료한 글 이벤트 핸들러

    const handleButtonClick = (type, postId) => {
        const selectedPost = attendPosts.find((post) => post.postId === postId);
        setEvaluateUsers(selectedPost.users); // 평가할 유저 정보 설정
        setEvaluateModalOpen({ type, isOpen: true, postId }); // 평가 모달 상태 업데이트
    };
 

    const confirmEvaluate = () => {
        if (evaluateModalOpen.type === 'evaluate') {
          console.log('평가하기');
          evaluateUsers.forEach((user) => {
            console.log(`평가한 유저: ${user.username}, 평가 점수: ${starCount[`${evaluateModalOpen.postId}:${user.userId}`]}`);
          });
          // 평가 정보를 전송하는 로직을 추가하세요.
        } else if (evaluateModalOpen.type === 'skip') {
          console.log('평가하지 않기');
          // 평가를 하지 않는 로직을 추가하세요.
        }
        setEvaluateModalOpen({ type: '', isOpen: false });
      };
    
    const cancelEvaluate = () => {
        setEvaluateModalOpen({ type: '', isOpen: false });
        console.log(evaluateModalOpen); // 상태 업데이트 후 확인
    };
    // 참여 완료한 글의 제목을 클릭하면, 선택한 글의 ID를 저장하는 배열에 추가하거나 제거
    const handlePostTitleClick = (postId) => {
        if (selectedPosts.includes(postId)) {
            setSelectedPosts(selectedPosts.filter(id => id !== postId)); // 이미 선택되어 있으면 배열에서 제거
        } else {
            setSelectedPosts([...selectedPosts, postId]); // 선택되어 있지 않으면 배열에 추가
        }
    };
    

    // 2.3 별점 이벤트 핸들러

     const handleStarMouseOver = (postId, userId, starCount) => {
    setHoveredStar({ postId, userId, starCount });
  };

    const handleStarMouseOut = () => {
        setHoveredStar({ postId: null, userId: null, starCount: 0 });
      };
      

      const handleStarClick = (postId, userId, newMedalCount) => {
        const key = `${postId}:${userId}`; 
    
        setStarCount({
            ...starCount,
            [key]: newMedalCount,
        });
    
        setStarCountState({
            ...starCountState,
            [key]: newMedalCount,
        });
    
        setEvaluateUsers((prevUsers) =>
            prevUsers.map((user) => {
            if (user.userId === userId) {
                return {
                ...user,
                medalCount: newMedalCount,
                };
            } else {
                return user;
            }
            })
        );
    };
    
    
    const handleStarReset = (postId, userId) => {
      const key = `${postId}:${userId}`; // Composite key
  
      setStarCount({
          ...starCount,
          [key]: 0,
      });
  
      // starCountState 상태 업데이트
      setStarCountState({
          ...starCountState,
          [key]: 0,
      });
  
      setAttendPosts((prevPosts) =>
          prevPosts.map((post) => {
              if (post.postId === postId) {
                  return {
                      ...post,
                      users: post.users.map((user) => {
                          if (user.userId === userId) {
                              return {
                                  ...user,
                                  medalCount: 0,
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
    const inactiveStar = <AiOutlineStar />; // 비활성화된 별 아이콘
    const activeStar = <AiFillStar />;

   
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
                    <div css={iconWrapper}>{post.sportsIcon}</div>
                    <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                      {post.postTitle}
                    </h1>
                    {/* <div css={postDate}>{post.date}</div> */}
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
                <div key={index} css={listItem}>
                  <div css={postInfo}>
                    <div css={iconWrapper}>{post.sportsIcon}</div>
                    <h1
                      css={postTitle}
                      onClick={() => handlePostTitleClick(post.postId)}
                    >
                      {post.postTitle}
                    </h1>
      
                    <div css={buttons}>
                      <button
                        onClick={() => handleButtonClick("evaluate", post.postId)}
                      >
                        평가하기
                      </button>
                      <button
                        onClick={() => handleButtonClick("skip", post.postId)}
                      >
                        하지않기
                      </button>
                    </div>
                  </div>
                  {selectedPosts.includes(post.postId) && (
                    <div>
                      <div css={titleAndDateContainer}>
                        <h2 css={attendUserListTitle}>참여 유저 목록</h2>
                        <div css={postDate}>{post.date}</div>
                      </div>
                      {post.users.map((user) => (
                        <div key={user.userId}>
                          <span css={attendUserName}>{user.username}</span>
                          <div>
                          {starOptions.map((starCount) => {
                              const key = `${post.postId}:${user.userId}`; // Composite key
                              return (
                                  <button
                                      key={starCount}
                                      css={star}
                                      onMouseOver={() => handleStarMouseOver(post.postId, user.userId, starCount)}
                                      onMouseOut={handleStarMouseOut}
                                      onClick={() => handleStarClick(post.postId, user.userId, starCount)}
                                      >
                                      {starCount <=
                                      (hoveredStar.postId === post.postId &&
                                      hoveredStar.userId === user.userId
                                          ? hoveredStar.starCount
                                          : starCountState[`${post.postId}:${user.userId}`] || user.medalCount || 0)
                                      ? activeStar
                                      : inactiveStar}
                                  </button>
                              );
                          })}
                                        <button css={resetButton} onClick={() => handleStarReset(post.postId, user.userId)}>
                                            <FaRedo />
                                        </button>

                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
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