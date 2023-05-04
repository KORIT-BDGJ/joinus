/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    justify-content: space-between;
    padding: 40px;
    height: 100px;
`;

const selectCountry = css`
    width: 100px;
    height: 35px;
    border: 1px solid #999;
    border-radius: 5px;
    background-color: white;
`;

const searchCategory = css`
    width: 100px;
    height: 35px;
    border: 1px solid #999;
    border-radius: 5px;
`;

const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 200px;
    height: 35px;
`;

const mainListBox = css`
    display: flex;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    flex-wrap: wrap;
    height: 700px;
    overflow-y: auto;
`;

const listContainer = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 100%;
    height: 120px;
    background-color: beige;
`;

const postHeader = css`
    height: 20%;
`;
const postMain = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    font-size: 30px;
`;
const postSub = css`
    height: 20%;
`;

const pageButton = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

const createButton = css`
    position: absolute;
    border-radius: 6px;
    bottom: 20px;
    right: 20px;
    width: 100px;
    height: 40px;
`;

const Main = () => {

    const navigate = useNavigate();

    const createClickHandle = () => {
        navigate("/post/register");
    }

    return (
        <div css={mainContainer}>
            <header css={header}>
                <select css={selectCountry}>
                    <option selected>운동</option>
                </select>
                <select css={selectCountry}>
                    <option selected>지역</option>
                    <option>부산</option>
                    <option>서울</option>
                    <option>대구</option>
                </select>
                <div>
                    <select css={searchCategory}>
                        <option selected>제목</option>
                        <option>작성자</option>
                        <option>내용</option>
                    </select>
                    <input css={searchInput} type="text" placeholder="검색"/>
                </div>
            </header>
            <div css={mainListBox}>
                <div css={listContainer}>
                    <header css={postHeader}>등록 날짜</header>
                    <main css={postMain}>모집 제목</main>
                    <footer css={postSub}>모집유저이름/모집지역/모집시간/신청인원</footer>
                </div>
            </div>
            <div css={pageButton}>
                <button>pagination</button>
            </div>
                <button css={createButton} onClick={createClickHandle}>
                    작성하기
                </button>
            
        </div>
    );
};

export default Main;