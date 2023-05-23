/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AlertModal from "./../../../components/Modal/AlertModal";

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
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #dbdbdb;

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
  display: flex;
  gap: 10px;
  height: 30px;
`;

const buttonLabel = css`
  white-space: nowrap;
  overflow: hidden;
`;

const OwnerPostList = () => {
  const [modal, setModal] = useState({ type: "", isOpen: false, postId: null });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentUser = useQuery(["currentUser"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.get("http://localhost:8080/auth/principal", option);
    return response.data;
  });

  const { userId } = useParams();

  const getOwnerPostList = useQuery(
    ["getOwnerPostList", userId],
    async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/post/${userId}/owner`,
        option
      );

      console.log("getOwnerPostList response:", response.data);

      return response.data;
    },
    {
      enabled: Boolean(currentUser.data),
      refetchOnWindowFocus: false,
    }
  );

  const editMutation = useMutation(
    async (postId) => {
      await axios.put(
        `http://localhost:8080/post/${postId}`,
        {
          // your edit data here
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("editMutation successful");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getOwnerPostList", userId]);
      },
    }
  );

  const deleteMutation = useMutation(
    async (postId) => {
      const response = await axios.delete(`http://localhost:8080/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("deleteMutation response:", response.data);

      return response;
    },
    {
      onSuccess: (data) => {
        if (data && data.data) {
          queryClient.invalidateQueries(["getOwnerPostList", userId]);
        }
      },
    }
  );

  const movePost = (postId) => {
    navigate(`/post/${postId}`);
  };
  
  const handleButtonClick = (type, postId) => {
    setModal({ type, isOpen: true, postId });
  };

  const cancelAction = () => {
    setModal({ type: "", isOpen: false, postId: null });
  };

  const confirmAction = async () => {
    if (modal.type === "delete") {
      await deleteMutation.mutateAsync(modal.postId);
    } else if (modal.type === "edit") {
      await editMutation.mutateAsync(modal.postId);
    }
    setModal({ type: "", isOpen: false, postId: null });
  };

  if (currentUser.isLoading || getOwnerPostList.isLoading) {
    return <div>로딩중...</div>;
  }

  if (currentUser.isError || getOwnerPostList.isError) { // 에러 발생 시
    return <div>데이터를 가져오는 중에 오류가 발생했습니다.</div>;
  }


  // 로그인한 사용자가 게시물 작성자와 일치하는 게시물만 필터링
  const ownerPosts = getOwnerPostList.data.filter(post => post.userId === currentUser.data.userId);

  return (
    <div css={container}>
      <Sidebar />
      <h1 css={title}>내가 올린 글</h1>
      {ownerPosts.length === 0 ? (
        <div>게시물이 없습니다.</div>
      ) : (
        <ul css={list}>
          {ownerPosts.map((post) => (
            <li key={post.postId} css={listItem}>
              <div>
                <h2 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h2>
              </div>
              <div css={buttons}>
                <button onClick={() => handleButtonClick("edit", post.postId)}>
                  <span css={buttonLabel}>수정하기</span>
                </button>
                <button onClick={() => handleButtonClick("delete", post.postId)}>
                  <span css={buttonLabel}>삭제하기</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {modal.isOpen && (
        <AlertModal
          isModalOpen={modal.isOpen}
          confirmRemove={confirmAction}
          cancelRemove={cancelAction}
          message={
            modal.type === "delete" ? "삭제하시겠습니까?" : "수정하시겠습니까?"
          }
        />
      )}
    </div>
  );
};

export default OwnerPostList;
