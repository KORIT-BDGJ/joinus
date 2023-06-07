/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useRef } from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MedalRatingModal from "../../../components/Modal/MedalRatingModal";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 10px 10px 10px;
  //overflow-y: auto;
`;

const logoStyle= css`
  width: 724px; 
  height: 125px;
  background-image: url('/images/title_1.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const logoTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 48px;
  font-weight: 600;
`;

const list = css`
  width: 650px;
  margin: 30px auto;
  border: 1px solid #C8E8E5;
  border-radius: 5px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
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
  border-bottom: 0.5px solid #C8E8E5;
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

const postInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttons = css`
  background-color: #C8E8E5;
  border: none;
  border-radius: 5px;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  font-weight: bold;
  cursor: pointer;

  &:active {
    background-color: #A7DED9;
  }
`;

const noPost = css`
  font-size: 24px;
`;


const HostFinishList = () => {
  const { userId } = useParams();
  const [isStateLevelChangeModalOpen, setIsStateLevelChangeModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [completedPosts, setCompletedPosts] = useState({});
  const [deleteButtons, setDeleteButtons] = useState({});
  const [expiryTimes, setExpiryTimes] = useState({});
  const cancelTokenSourceRef = useRef(axios.CancelToken.source());

  const onComplete = (postId) => {
    setCompletedPosts((prevCompletedPosts) => ({
      ...prevCompletedPosts,
      [postId]: true,
    }));
  };

  const openStateLevelChangeModal = (postId) => {
    setSelectedPostId(postId);
    setIsStateLevelChangeModalOpen(true);
  };

  const principal = useQuery(["principal"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  const getHostFinishList = useQuery(["getHostFinishList"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      cancelToken: cancelTokenSourceRef.current.token,
    };
    const response = await axios.get(`http://localhost:8080/post/${userId}/finish`, option);
    return response.data;
  });

  const deletePost = useMutation(
    async ({ postId }) => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        cancelToken: cancelTokenSourceRef.current.token, 
      };
      await axios.delete(`http://localhost:8080/post/${postId}/delete`, option);
    },
    {
      onSuccess: () => {
        getHostFinishList.refetch();
        alert("해당 게시글이 삭제되었습니다.");
      },
      onError: (error) => {
        if (axios.isCancel(error)) {
          console.log('Delete Post Request cancelled');
        } else {
          alert("게시글 삭제에 실패했습니다.");
        }
      },
    }
  );

  const onDelete = useCallback((postId) => {
    deletePost.mutate({ postId });
  }, [deletePost]);

  const updateTimersAndButtons = useCallback((data) => {
    let timers = []; 

    if (data) {
      const updatedDeleteButtons = {};
      const updatedExpiryTimes = {};

      for (let post of data) {
        const postId = post.postId;
        const expiryTime = new Date(post.deadline);
        const tenMinutes =  5 * 60 * 1000;

        if (expiryTime.getTime() + tenMinutes >= Date.now()) {
          const timer = setTimeout(() => {
            setDeleteButtons((prevDeleteButtons) => ({
              ...prevDeleteButtons,
              [postId]: true,
            }));
          }, expiryTime.getTime() + tenMinutes - Date.now());

          updatedExpiryTimes[postId] = {
            expiryTime: expiryTime,
            timer: timer,
          };

          timers.push(timer);
        } else {
          updatedDeleteButtons[postId] = true;
        }
      }

      setDeleteButtons((prevDeleteButtons) => ({
        ...prevDeleteButtons,
        ...updatedDeleteButtons,
      }));

      setExpiryTimes((prevExpiryTimes) => ({
        ...prevExpiryTimes,
        ...updatedExpiryTimes,
      }));
    }

    return timers;
  }, []);

  useEffect(() => {
    const timers = updateTimersAndButtons(getHostFinishList.data);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      cancelTokenSourceRef.current.cancel();
      cancelTokenSourceRef.current = axios.CancelToken.source();
    };
  }, [updateTimersAndButtons, getHostFinishList.data]);

  const closeStateLevelChangeModal = () => {
    setIsStateLevelChangeModalOpen(false);
  };

  if (principal.isLoading || getHostFinishList.isLoading ) {
    return <div>로딩중...</div>;
  }

  return (
    <div css={container}>
      <Sidebar />
      <h1 css={logoTitle}>
        <div css={logoStyle}>{/* 참여 완료한 글 */}</div>
      </h1>
      {getHostFinishList.data.length === 0 ? (
        <div css={noPost}>게시물이 없습니다.</div>
      ) : (
        <div css={list}>
          {getHostFinishList.data.map((post) => (
            <div key={post.postId}>
              <div css={listItem}>
                <div css={postInfo}>
                  <h1 css={postTitle}>{post.title}</h1>
                  {!completedPosts[post.postId] && !deleteButtons[post.postId] ? (
                    <button css={buttons} onClick={() => openStateLevelChangeModal(post.postId)}>
                      평가하기
                    </button>
                  ) : (
                    <button css={buttons} onClick={() => onDelete(post.postId)}>
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <footer>
                {isStateLevelChangeModalOpen && selectedPostId === post.postId && (
                  <MedalRatingModal
                    modalState={closeStateLevelChangeModal}
                    postId={selectedPostId}
                    currentUserId={principal.data.userId}
                    refetchHostFinishList={getHostFinishList.refetch}
                    onComplete={() => onComplete(post.postId)}
                  />
                )}
              </footer>
            </div>
          ))}
        </div>    
      )}
    </div>
  );
};

export default HostFinishList;