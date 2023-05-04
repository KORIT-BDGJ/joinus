/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 650px;
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

const buttons = css`
  display: flex;
  gap: 10px;
  height: 30px;
`;

const buttonLabel = css`
  white-space: nowrap;
  overflow: hidden;
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

const dialogOverlay = css`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
`;

const dialog = css`
background-color: white;
border-radius: 4px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
padding: 20px;
`;

const modalOverlay = css`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
`;

const modal = css`
background-color: white;
border-radius: 4px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
padding: 20px;
`;

const modalButtons = css`
display: flex;
justify-content: space-between;
margin-top: 20px;
`;

const OwnerPostList = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '오늘은 초여름…내일은 남쪽부터 비구름 올라온다', editButton: true, deleteButton: true },
    { id: 2, title: '글 제목 2', editButton: true, deleteButton: true },
  ]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/posts')
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림/닫힘 상태
    
    const goPost = (id) => {
      console.log(`해당 상세페이지로 이동 ${id}`);
    };
    
    const modifyPost = (id) => {};

    const removePost = (id) => {
      setIsModalOpen(true); // 모달 창 열기
    };

    const confirmRemove = () => {
      console.log('게시글 삭제');
      setIsModalOpen(false); // 모달창 닫기
    };
  
    const cancelRemove = () => {
      setIsModalOpen(false); // 모달창 닫기
    };

    


    return (
      <div css={container}>
        <h1 css={title}>내가 올린 글</h1>
        <ul css={list}>
          {posts.map((post) => (
            <li key={post.id} css={listItem}>
              <div>
                <h2 css={postTitle} onClick={() => goPost(post.id)}>
                  {post.title}
                </h2>
              </div>
              <div css={buttons}>
                {post.editButton && (
                  <button onClick={() => modifyPost(post.id)}>
                    <span css={buttonLabel}>수정하기</span>
                  </button>
                )}
                {post.deleteButton && (
                  <button onClick={() => removePost(post.id)}>
                    <span css={buttonLabel}>삭제하기</span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <div css={modalOverlay}>
            <div css={modal}>
              <p>삭제하시겠습니까?</p>
              <div css={modalButtons}>
                <button onClick={confirmRemove}>확인</button>
                <button onClick={cancelRemove}>취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default OwnerPostList;
    
