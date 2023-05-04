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
  align-items: flex-start;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const buttons = css`
  display: flex;
  gap: 10px;
  width: 150px;
  height: 30px;
`;

const buttonLabel = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const postBody = css`
  font-size: 16px;
  color: #4f4f4f;
  margin: 0;
`;


const OwnerPostList = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '오늘은 초여름…내일은 남쪽부터 비구름 올라온다', body: '3일 최고기온이 27도까지 오르면서 중부지방을 중심으로 초여름 날씨를 보이는 곳이 있겠다.낮 최고기온은 18~27도로, 서울, 대전, 강릉 26도, 대구 25도, 광주 23도 등 전국이 다소 덥거나 온화한 날씨를 보이겠다. 기상청은 낮 기온이 오른 만큼 내륙을 중심으로 낮과 밤의 기온 차가 15도 내외로 크게 나타나는 곳도 있으니 건강 관리에 유의할 것을 당부했다.강원도, 경북, 대구 등 동쪽 지역에는 건조주의보가 내려 산불 등 화재 예방에 주의를 기울여야겠다. 건조주의보는 내일(4일)부터 전국에 비가 내리면서 해제될 것으로 보인다. 4일은 전국이 대체로 흐리며 남쪽 지방부터 비가 내리겠다. 전라권과 경남서부는 새벽부터, 수도권과 충청권, 경상권은 오후부터, 밤에는 강원도에도 비가 시작될 전망이다.', editButton: true, deleteButton: true },
    { id: 2, title: '글 제목 2', body: '글 내용 2', editButton: true, deleteButton: true },
    { id: 3, title: '글 제목 3', body: '글 내용 3', editButton: true, deleteButton: true },
    { id: 4, title: '글 제목 4', body: '글 내용 4', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },
    { id: 5, title: '글 제목 5', body: '글 내용 5', editButton: true, deleteButton: true },

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
   
    };
    
    const Delete = (id) => {
 
    };
    
    return (
      <div css={container}>
        <h1 css={title}>내가 올린 글</h1>
        <ul css={list}>
          {posts.map((post) => (
            <li key={post.id} css={listItem}>
              <div>
                <h2 css={postTitle}>{post.title}</h2>
                <p css={postBody}>{post.body}</p>
              </div>
              <div css={buttons}>
                {post.editButton && (
                  <button onClick={() => Edit(post.id)}>
                    <span css={buttonLabel}>수정하기</span>
                  </button>
                )}
                {post.deleteButton && (
                  <button onClick={() => Delete(post.id)}>
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
    
