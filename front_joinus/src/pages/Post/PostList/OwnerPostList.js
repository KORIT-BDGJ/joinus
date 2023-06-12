/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AlertModal from "./../../../components/Modal/AlertModal";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 10px 10px 10px;
`;

const logoStyle= css`
  width: 724px; 
  height: 125px;
  background-image: url('/images/title_5.png');
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
  height: 100px;
  font-size: 34px;
  font-weight: 600;
`;

const list = css`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  border: 2px solid #C8E8E5;
  border-radius: 7px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 700px;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 2px solid #C8E8E5;

  &:last-child {
    border-bottom: none;
  }
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const buttons = css`
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  width: 70px;
  height: 30px;
  font-weight: bold;
  background-color: #C8E8E5;
  cursor: pointer;

  &:hover {
    background-color:  #A7DED9;
  }
`;

const noPost = css`
  font-size: 25px;
`;


const OwnerPostList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userId } = useParams();

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });

  const getOwnerPostList = useQuery(["getOwnerPostList"], async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const response = await axios.get(`http://localhost:8080/post/${userId}/owner`, option);
      return response.data;
  });

  const deletePost = useMutation(async ({ postId }) => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    return await axios.delete(`http://localhost:8080/post/${postId}/delete`, option);
  }, {
      onSuccess: () => {
        queryClient.fetchQuery("getOwnerPostList"); 
        window.location.replace(`/post/${userId}/owner`);
        alert("해당 게시글이 삭제되었습니다.");
      }  
  });


  const movePost = (postId) => {
    navigate(`/post/${postId}`);
  };



  const handleDeleteClick = (postId) => {
    const result = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (result) {
      deletePostHandle(postId);
    } else {
        // 취소 버튼을 클릭한 경우 아무 작업도 수행하지 않기.
    }
  };

  const deletePostHandle = (postId) => {
    deletePost.mutate({ postId });
  }

  if(principal.isLoading ||getOwnerPostList.isLoading) {
    return <div>불러오는 중...</div>
  }



  return (
    <div css={container}>
      <Sidebar />
      <h1 css={logoTitle}>
        <div css={logoStyle}>
          {/* 내가 올린 글 */}
        </div>
      </h1>
      {getOwnerPostList.data.length === 0 ? (
        <div css={noPost}>게시물이 없습니다.</div>
      ) : (
        <ul css={list}>
          {getOwnerPostList.data.map((post) => (
            <li key={post.postId} css={listItem}>
              <h2 css={postTitle} onClick={() => movePost(post.postId)}>
                {post.title}
              </h2>
              <div>
                <button css={buttons} onClick={() => movePost(post.postId)}>수정하기</button>
                <button css={buttons} onClick={() => handleDeleteClick(post.postId)}>삭제하기</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerPostList;
