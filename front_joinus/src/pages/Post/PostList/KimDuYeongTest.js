/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

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
  max-height: 730px; 
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
  margin: 10;
  line-height: 1.25;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const postDate = css`
  font-size: 24px;
  color: #8e8e8e;
  margin: 10;
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

const pagination = css`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  gap: 10px;
`;

const paginationItem = css`
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;

  &:hover {
    background-color: #dbdbdb;
  }
`;



const KimDuYeongTest = () => {
	const [posts, setPosts] = useState([
		{ id: 1, title: '1', date: '2021-05-04', editButton: true, deleteButton: true },
		{ id: 2, title: '2', date: '2023-05-04', editButton: true, deleteButton: true },
		{ id: 3, title: '3', date: '2022-05-04', editButton: true, deleteButton: true },
		{ id: 4, title: '4', date: '2021-05-04', editButton: true, deleteButton: true },
		{ id: 5, title: '5', date: '2023-05-04', editButton: true, deleteButton: true },
		{ id: 6, title: '6', date: '2022-05-04', editButton: true, deleteButton: true },
		{ id: 7, title: '7', date: '2021-05-04', editButton: true, deleteButton: true },
		{ id: 8, title: '8', date: '2023-05-04', editButton: true, deleteButton: true },
		{ id: 9, title: '9', date: '2022-05-04', editButton: true, deleteButton: true },
		{ id: 10, title: '10', date: '2021-05-04', editButton: true, deleteButton: true },
		{ id: 11, title: '11', date: '2023-05-04', editButton: true, deleteButton: true },
		{ id: 12, title: '12', date: '2022-05-04', editButton: true, deleteButton: true },
		{ id: 13, title: '13', date: '2021-05-04', editButton: true, deleteButton: true },
		{ id: 14, title: '14', date: '2023-05-04', editButton: true, deleteButton: true },
		{ id: 15, title: '15', date: '2022-05-04', editButton: true, deleteButton: true },
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;

	useEffect(() => {
		axios.get('http://localhost:8080/api/posts')
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
    
    const modifyPost = (id) => { // 게시글 수정

	}; 

    const removePost = (id) => { // 게시글 삭제
		setIsModalOpen(true); 
	};
	
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림/닫힘 상태
	
    const cancelRemove = () => { // 게시글 삭제 취소
		setIsModalOpen(false); 
    };
	
	const confirmRemove = () => { // 게시글 삭제
		console.log('게시글 삭제');
		setIsModalOpen(false); 
	};


	const handleClick = (pageNumber) => {
		setCurrentPage(pageNumber);
	  };
	
	const totalPages = Math.ceil(posts.length / postsPerPage);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	return (
		<div css={container}>
			<h1 css={title}>내가 올린 글</h1>
			<ul css={list}>
		  		{currentPosts.map((post) => (
				<li key={post.id} css={listItem}>
				<div>
					<h2 css={postTitle} onClick={() => movePost(post.id)}>
					{post.title}
					</h2>
					<p css={postDate}>{post.date}</p>
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
			<ul css={pagination}>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
				<li
					key={pageNumber}
					css={paginationItem}
					onClick={() => handleClick(pageNumber)}
					style={{ backgroundColor: pageNumber === currentPage ? "#dbdbdb" : "transparent" }} // 현재 페이지 번호 강조
				>
					{pageNumber}
				</li>
				))}
			</ul>
			{isModalOpen && (
			<div css={modalOverlay}>
				<div css={modal}>
				<p css={modalMessage}>삭제하시겠습니까?</p>
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

export default KimDuYeongTest;