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
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 30px 0;
  list-style: none;
`;

const OwnerPostList = () => {
  const [posts, setPosts] = useState([ //예시 데이터
    { id: 1, title: '글 제목 1', body: '글 내용 1', editable: true, deletable: true },
    { id: 2, title: '글 제목 2', body: '글 내용 2', editable: true, deletable: true },
    { id: 3, title: '글 제목 3', body: '글 내용 3', editable: false, deletable: false },
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
        {posts.map((post) => ( // TODO: posts.map()을 사용하여 게시글 목록 표시
          <li key={post.id}> 
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div>
              {post.editable && <button onClick={() => Edit(post.id)}>수정하기</button>}
              {post.deletable && <button onClick={() => Delete(post.id)}>삭제하기</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerPostList;
