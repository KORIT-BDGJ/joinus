/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import React from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';

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
	const [posts, setPosts] = useState([]);
	const { userId } = useParams();
    const queryClient = useQueryClient();



    const getOwnerPostList = useQuery(["getOwnerPostList"], async () => {
		const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        
        const response = await axios.get(`http://localhost:8080/post/${userId}/owner`, option);
        return response;
    });

	if(OwnerPostList.isLoading) {
        return <div>불러오는 중...</div>
    }

	console.log(getOwnerPostList);



	//   const movePost = (id) => {
	// 	console.log(`해당 상세페이지로 이동 ${id}`);
	// 	// 상세 페이지로 이동하는 코드 작성
	//   };
	  
    
// 	  const handleButtonClick = (type, id) => {
// 		setModal({ type, isOpen: true });
// 		if (type === 'edit') {
// 		  // 수정하기 버튼 클릭 시 실행할 코드 작성
// 		  console.log(`Editing post: ${id}`);
// 		} else if (type === 'delete') {
// 		  // 삭제하기 버튼 클릭 시 실행할 코드 작성
// 		  console.log(`Deleting post: ${id}`);
// 		}
// 	  };
	  
	  

// 	const [modal, setModal] = useState({ type: '', isOpen: false });

//     const cancelAction = () => {
// 	setModal({ type: '', isOpen: false });
// };
	
// const confirmAction = () => {
// 	if (modal.type === 'delete') {
// 	  // 게시물을 삭제하기 위해 API 요청을 합니다
// 	  // 다음 행을 적절한 API 요청으로 바꿉니다
// 	  console.log('Deleting post');
// 	} else if (modal.type === 'edit') {
// 	  // 게시물 편집을 위한 API 요청 만들기
// 	  // 다음 행을 적절한 API 요청으로 바꿉니다
// 	  console.log('Editing post');
// 	}
// 	setModal({ type: '', isOpen: false });
//   };
  

    return (
		<div css={container}>
			<Sidebar></Sidebar>
			<h1 css={title}>내가 올린 글</h1>
			{/* <ul css={list}>
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
			  
			)} */}
		</div>
	);
};

export default OwnerPostList;
