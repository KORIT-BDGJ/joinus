/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRedo } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  overflow-y: auto;
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
  width: 650px;
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
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }
  border-bottom: 1px solid #dbdbdb;
`;

const postInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const iconWrapper = css`
  font-size: 50px;
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  margin: 0;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const buttons = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  const { userId } = useParams();

  const getHostApplicantList = useQuery(["getHostApplicantList"], async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(`http://localhost:8080/post/${userId}/host/applicant`, option);
      return response.data;
  });

  const cancelApplyPost = useMutation(async (postId) => {
    const option = {
        params: {
            userId: userId
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    return await axios.delete(`http://localhost:8080/post/cancel/apply/${postId}`, option);
  }, {
      onSuccess: () => {
          queryClient.invalidateQueries("getHostApplicantList");
      } 
  });

  const getHostAttendList = useQuery(["getHostAttendList"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.get(`http://localhost:8080/post/${userId}/host/attend`, option);
    return response.data;
  });

const cancelAttendPost = useMutation(async (postId) => {
  const option = {
      params: {
          userId: userId
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
  }
  return await axios.delete(`http://localhost:8080/post/${postId}/attend/delete`, option);
}, {
    onSuccess: () => {
        queryClient.invalidateQueries("getHostAttendList");
    } 
});

  const movePost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleApplyDeleteClick = (postId) => {
    const result = window.confirm('해당 게시글 신청을 취소하시겠습니까?');
    if (result) {
      deleteApplyPostHandle(postId);
    } else {
        // 취소 버튼을 클릭한 경우 아무 작업도 수행하지 않기.
    }
  };

  const deleteApplyPostHandle = (postId) => {
    cancelApplyPost.mutate(postId);
  }

  const handleAttendDeleteClick = (postId) => {
    const result = window.confirm('해당 게시글 신청을 취소하시겠습니까?');
    if (result) {
      deleteAttendPostHandle(postId);
    } else {
        // 취소 버튼을 클릭한 경우 아무 작업도 수행하지 않기.
    }
  };

  const deleteAttendPostHandle = (postId) => {
    cancelAttendPost.mutate(postId);
  }

  if (principal.isLoading || getHostApplicantList.isLoading || getHostAttendList.isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div css={container}>
      <Sidebar />
      <div>
        <h1 css={title}>내가 신청한 글</h1>
        {getHostApplicantList.data.length === 0 ? (
        <div>게시물이 없습니다.</div>
        ) : (
        <div css={list}>
          {getHostApplicantList.data.map((post) => (
            <li key={post.postId} css={listItem}>
              <div css={postInfo}>                
                <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h1>
                <button css={buttons} onClick={() => handleApplyDeleteClick(post.postId) }>취소</button>
              </div>
            </li>
          ))}
        </div>
        )}
      </div>
      <div>
        <h1 css={title}>신청 수락된 글</h1>
        {getHostAttendList.data.length === 0 ? (
        <div>게시물이 없습니다.</div>
        ) : (
        <div css={list}>
          {getHostAttendList.data.map((post) => (
            <li key={post.postId} css={listItem}>
              <div css={postInfo}>                
                <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h1>
                <button css={buttons} onClick={() => handleAttendDeleteClick(post.postId) }>취소</button>
              </div>
            </li>
          ))}
        </div>
        )}
      </div>
      <div>
        <h1 css={title}>참여 완료한 글</h1>
        {/* <div css={list}>
          {myAttendFinishPosts.map((post) => (
            <div key={post.postId} css={listItem}>
              <div css={postInfo}>
                <div css={iconWrapper}>{post.sportsIcon}</div>
                <h1 css={postTitle} onClick={() => handlePostTitleClick(post.postId)}>
                  {post.title}
                </h1>
                <div css={buttons}>
                  <button onClick={() => handleButtonClick('evaluate', post.postId)}>
                    평가하기
                  </button>
                  <button onClick={() => handleButtonClick('skip', post.postId)}>
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
                  {post.users && post.users.map((user) => (
                    <div key={`user-${post.postId}-${user.userId}`}>
                      <span css={attendUserName}>
                        {user.username} ({attendUserNames[user.userId]})
                      </span>
                      <div>
                        {starOptions.map((starCount) => {
                          const key = `${post.postId}:${user.userId}:${starCount}`;
                          return (
                            <button
                              key={`star-${key}`}
                              css={star}
                              onMouseOver={() =>
                                handleStarMouseOver(post.postId, user.userId, starCount)
                              }
                              onMouseOut={handleStarMouseOut}
                              onClick={() =>
                                handleStarClick(post.postId, user.userId, starCount)
                              }
                            >
                              {starCount <=
                              (hoveredStar.postId === post.postId &&
                                hoveredStar.userId === user.userId
                                ? hoveredStar.starCount
                                : starCountState[`${post.postId}:${user.userId}`] ||
                                  user.medalCount ||
                                  0)
                                ? activeStar
                                : inactiveStar}
                            </button>
                          );
                        })}
                        <button
                          css={resetButton}
                          onClick={() => handleStarReset(post.postId, user.userId)}
                        >
                          <FaRedo />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div> */}
        </div>
      {/* {cancelModalOpen && (
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
          message={
            evaluateModalOpen.type === 'evaluate'
              ? '평가하시겠습니까?'
              : '평가를 하지 않으시겠습니까?'
          }
        />
      )} */}
    </div>
  );
};

export default HostPostList;
