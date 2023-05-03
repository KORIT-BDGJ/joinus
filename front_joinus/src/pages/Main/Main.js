/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    justify-content: space-between;
    padding: 40px;
    height: 100px;
`;

const searchItems = css`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const categoryButton = css`
    position: relative;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    background-color: white;
    cursor: pointer;
`;

const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 200px;
    height: 30px;
`;

const main = css`
    display: flex;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    flex-wrap: wrap;
    height: 700px;
    overflow-y: auto;
`;

const post = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 100%;
    height: 120px;
`;

const postHeader = css`
    height: 20%;
`;
const postMain = css`
    display: flex;

    justify-content: center;
    align-items: center;
    height: 60%;
`;
const postInfo = css`
    height: 20%;
`;

const pageButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

const Main = () => {

    return (
        <div css={mainContainer}>
            <header css={header}>
                <div> 운동종목 설정
                    <button css={categoryButton}>
                        <AiFillCaretDown/>
                    </button>
                </div>
                <div> 지역설정
                    <button css={categoryButton}>
                        <AiFillCaretDown/>
                    </button>
                </div>
                <div>
                    <button css={categoryButton}>
                        <AiFillCaretDown/>
                    </button>
                    <input css={searchInput} type="search" placeholder="검색창"/>
                </div>
            </header>
            <main css={main}>
                <div css={post}>
                    <header css={postHeader}>작성 날짜</header>
                    <main css={postMain}> 제목 </main>
                    <footer css={postInfo}>방장정보/모집시간/인원수</footer>
                </div>
            </main>
            <button>작성하기</button>
            <div css={pageButton}>페이지 이동</div>
        </div>
    );
};

export default Main;