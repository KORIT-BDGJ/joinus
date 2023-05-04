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

const title = css` // 내가 참여한 글
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

const postTitle = css` // 글 제목
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

const modalOverlay = css` // 모달창 배경
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
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const modalMessage = css`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const modalButtons = css` // 모달창 버튼들
  display: flex;
  gap: 20px;
  height: 30px;
  margin-top: 20px;
`;

const HostPostList = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '글 제목 1', cancelButton: true },
    { id: 2, title: '글 제목 2', cancelButton: true },
    { id: 3, title: '글 제목 3', cancelButton: true },
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

    const movePost = (id) => { // 글 제목 클릭 시 해당 상세페이지로 이동
		console.log(`해당 상세페이지로 이동 ${id}`);
	};

    const cancelPost = (id) => { // 취소하기 버튼 클릭 시 모달창 띄우기
        setIsModalOpen(true); 
    };

    const [isModalOpen, setIsModalOpen] = useState(false); 
	
    const cancelRemove = () => {
		setIsModalOpen(false); 
    };
	
	const confirmRemove = () => {
		console.log('게시글 삭제');
		setIsModalOpen(false); 
	};

    return (
        <div css={container}> 
            <h1 css={title}>내가 참여한 글</h1>
            <ul css={list}>
                {posts.map((post) => (
                    <li key={post.id} css={listItem}>
                        <div>
                            <h2 css={postTitle} onClick={() => movePost(post.id)}>
                            {post.title}
                            </h2>
                            <p>{post.body}</p>
                        </div>
                        <div css={buttons}>
                            {post.cancelButton && (
                                <button onClick={() => cancelPost(post.id)}>취소하기</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
			<div css={modalOverlay}>
				<div css={modal}>
				<p css={modalMessage}>취소하시겠습니까?</p>
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

export default HostPostList;