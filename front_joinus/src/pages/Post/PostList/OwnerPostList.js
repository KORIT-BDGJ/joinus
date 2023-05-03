/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const container = css` // TODO: 컴포넌트의 전체적인 스타일을 작성
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px;
  
`;

const title = css` // TODO: 글 목록의 제목을 보여주는 컴포넌트의 스타일을 작성
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 34px;
  font-weight: 600;
`;

const list = css` // TODO: 글 목록을 보여주는 컴포넌트의 스타일을 작성
  width: 100%;
  max-width: 800px;
  margin-top: 50px;
  border: 1px solid #dbdbdb;
  padding: 30px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const listItem = css` // TODO: 수정 버튼과 삭제 버튼을 오른쪽에 배치하기 위해 flex 속성을 사용
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const buttons = css` // TODO: 수정 버튼과 삭제 버튼 사이의 간격을 10px로 설정
  display: flex;
  gap: 10px;
`;

const OwnerPostList = () => {
  const [posts, setPosts] = useState([ //예시 데이터
    { id: 1, title: '글 제목 1', body: '글 내용 1', editable: true, deletable: true },
    { id: 2, title: '글 제목 2', body: '글 내용 2', editable: true, deletable: true },
    { id: 3, title: '글 제목 3', body: '글 내용 3', editable: true, deletable: true },
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

  const Delete = (id) => { 
    // TODO: 삭제 버튼 클릭 시 처리할 로직 구현
    setPosts(posts.filter((post) => post.id !== id));
  };

  const Edit = (id) => { 
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
            {post.editable && (
              <button onClick={() => Edit(post.id)}>수정하기</button>
            )}
            {post.deletable && (
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
