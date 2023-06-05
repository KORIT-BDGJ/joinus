/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
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
  overflow-y: auto;
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
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
  border: 1px solid black;
  }
`;


const HostFinishList = () => {
  const { userId } = useParams();
  const [isStateLevelChangeModalOpen, setIsStateLevelChangeModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // 추가

  const openStateLevelChangeModal = (postId) => { // 수정
    setSelectedPostId(postId); // postId 저장
    setIsStateLevelChangeModalOpen(true);
  };

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  const getHostFinishList = useQuery(["getHostFinishList"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.get(`http://localhost:8080/post/${userId}/finish`, option);
    return response.data;
  });

  if (principal.isLoading || getHostFinishList.isLoading) {
    return <div>로딩중...</div>;
  }

  const closeStateLevelChangeModal = () => {
    setIsStateLevelChangeModalOpen(false);
  };


    
  return (
    <div css={container}>
      <Sidebar />
      <h1 css={logoTitle}>
        <div css={logoStyle}>
          {/* 참여 완료한 글 */}
        </div>
      </h1>
      {getHostFinishList.data.length === 0 ? (
          <div>게시물이 없습니다.</div>
      ) : (
      <div css={list}>
        {getHostFinishList.data.map((post) => (
          <div key={post.postId} >
            <div css={listItem}>
              <div css={postInfo}>
                <h1 css={postTitle}>{post.title}</h1>
                <button css={buttons} onClick={() => openStateLevelChangeModal(post.postId)}>평가하기</button>
              </div>
            </div>
              <footer>
                {isStateLevelChangeModalOpen && selectedPostId === post.postId && (
                  <MedalRatingModal modalState={closeStateLevelChangeModal} postId={selectedPostId} currentUserId={principal.data.userId}/> // 수정
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