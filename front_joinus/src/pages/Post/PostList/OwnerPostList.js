/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
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
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const getOwnerPostList = useQuery(['getOwnerPostList'], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    const response = await axios.get(`http://localhost:8080/post/${userId}/owner`, option);
    return response.data;
  });

  if (getOwnerPostList.isLoading) {
    return <div>불러오는 중...</div>;
  }

  console.log(getOwnerPostList);

  return (
    <div css={container}>
      <Sidebar />
      <h1 css={title}>내가 올린 글</h1>
      <ul css={list}>
        {getOwnerPostList.data.map((post) => (
          <li key={post.id} css={listItem}>
            <div>
              <h2 css={postTitle}>{post.title}</h2>
            </div>
            <div css={buttons}>
              {post.editButton && (
                <button>
                  <span css={buttonLabel}>수정하기</span>
                </button>
              )}
              {post.deleteButton && (
                <button>
                  <span css={buttonLabel}>삭제하기</span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerPostList;
