/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';

const container = css`
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	padding: 30px 30px;
`;

const title = css` // 내가 올린 글
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

const buttonLabel = css`
	white-space: nowrap;
	overflow: hidden;
`;

const OwnerPostList = () => {
	const [posts, setPosts] = useState([
		// { id: 1, title: '첫번째 글', editButton: true, deleteButton: true },
		// { id: 2, title: '첫번째 글', editButton: true, deleteButton: true },
		// { id: 3, title: '첫번째 글', editButton: true, deleteButton: true },

	]);

	useEffect(() => {
		axios.get('http://localhost:8080/api/posts') // 주소변경
		  .then((res) => {
			setPosts(res.data);
		  })
		  .catch((error) => {
			console.error(error);
		  });
	  }, []);
	  
    const movePost = (id) => { // 상세페이지로 이동
		console.log(`해당 상세페이지로 이동 ${id}`);
	};
    
    const handleButtonClick = (type, id) => {
		setModal({ type, isOpen: true });
		if (type === 'edit') {
		  // API 요청을 하여 지정된 ID의 게시물을 편집합니다
		  // 다음 행을 적절한 API 요청으로 바꿉니다
		  console.log(`Editing post: ${id}`);
		} else if (type === 'delete') {
		  // 지정된 ID의 게시물을 삭제하도록 API를 요청합니다
		  // 다음 행을 적절한 API 요청으로 바꿉니다
		  console.log(`Deleting post: ${id}`);
		}
	  };
	  

	const [modal, setModal] = useState({ type: '', isOpen: false });

    const cancelAction = () => {
	setModal({ type: '', isOpen: false });
};
	
const confirmAction = () => {
	if (modal.type === 'delete') {
	  // 게시물을 삭제하기 위해 API 요청을 합니다
	  // 다음 행을 적절한 API 요청으로 바꿉니다
	  console.log('Deleting post');
	} else if (modal.type === 'edit') {
	  // 게시물 편집을 위한 API 요청 만들기
	  // 다음 행을 적절한 API 요청으로 바꿉니다
	  console.log('Editing post');
	}
	setModal({ type: '', isOpen: false });
  };
  

    return (
		<div css={container}>
			<Sidebar></Sidebar>
			<h1 css={title}>내가 올린 글</h1>
			<ul css={list}>
			{posts.map((post) => (
				<li key={post.id} css={listItem}>
				<div>
					<h2 css={postTitle} onClick={() => movePost(post.id)}>
					{post.title}
					</h2>
				</div>
				<div css={buttons}>
					{post.editButton && (
					<button onClick={() => handleButtonClick('edit', post.id)}>
						<span css={buttonLabel}>수정하기</span>
					</button>
					)}
					{post.deleteButton && (
					<button onClick={() => handleButtonClick('delete', post.id)}>
						<span css={buttonLabel}>삭제하기</span>
					</button>
					)}
				</div>
				</li>
			))}
			</ul>
			{modal.isOpen && (
				<AlertModal
					isModalOpen={modal.isOpen}
					confirmRemove={confirmAction}
					cancelRemove={cancelAction}
					message={modal.type === 'delete' ? '삭제하시겠습니까?' : '수정하시겠습니까?'}
				/>
			  
			)}
		</div>
	);
};

export default OwnerPostList;
