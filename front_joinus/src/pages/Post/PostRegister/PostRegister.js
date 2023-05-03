/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';

const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
`;

const title = css`
    font-size: 35px;
    font-weight: 600;
`;

const postInfo = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    height: 700px;
`;

const postHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding: 10px;
    height: 80px;
`;

const postTitle = css`
    width: 80%;
    height: 60px;
`;

const postMain = css`
    border: 1px solid #dbdbdb;
    height: 500px;
`;

const postStory = css`
    border: 1px solid #dbdbdb;
`;

const postWrite = css`
    border: 1px solid #dbdbdb;
    height: 70px;
`;

const postButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PostRegister = () => {
    return (
        <div css={mainContainer}>
            <header css={header}>
                <h1 css={title}>게시글 작성하기</h1>
            </header>
            <div css={postInfo}>
                <header css={postHeader}>
                    <input css={postTitle} type="text" placeholder="제목 입력"/>
                </header>
                <main css={postMain}>
                    작성
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </main>
                <footer css={postStory}>모집 글 소개
                    <div css={postWrite}></div>
                </footer>
            </div>
            <div css={postButton}>
                <button>작성</button>
                <button>취소</button>
            </div>
        </div>
    );
};

export default PostRegister;