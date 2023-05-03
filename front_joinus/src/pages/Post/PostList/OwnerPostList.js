/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px;
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
  margin-top: 50px;
  border: 1px solid #dbdbdb;
  padding: 30px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const buttons = css`
  display: flex;
  gap: 10px;
`;

const OwnerPostList = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '글 제목 1', body: '글 내용 1', editButton: true, deleteButton: true },
    { id: 2, title: '글 제목 2', body: '글 내용 2', editButton: true, deleteButton: true },
    { id: 3, title: '글 제목 3', body: '글 내용 3', editButton: true, deleteButton: true },
  ]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/api/posts')
  //     .then((res) => {
  //       setPosts(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const Edit = (id) => { 
    // TODO: 삭제 버튼 클릭 시 처리할 로직 구현
    
  };

  const Delete = (id) => { 
    // TODO: 수정 버튼 클릭 시 처리할 로직 구현
  };

  return (
    <div css={container}> 
      <h1 css={title}>내가 올린 글</h1>
      <ul css={list}>
        {posts.map((post) => (
          <li key={post.id} css={listItem}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div css={buttons}>
              {post.editButton && (
                <button onClick={() => Edit(post.id)}>수정하기</button>
              )}
              {post.deleteButton && (
                <button onClick={() => Delete(post.id)}>삭제하기</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerPostList;
