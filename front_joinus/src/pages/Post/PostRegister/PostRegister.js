/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { BiMale, BiMaleFemale } from 'react-icons/bi';
import { BiFemale } from 'react-icons/bi';
import { FaUserCog } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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

    border: 1px solid #dbdbdb;
    padding: 10px;
    height: 700px;
`;

const postContainer = css`
    display: flex;
    align-items: center;
    padding: 10px;
    height: 80px;
`;

const postTitle = css`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    width: 30%;
`;

const postInput = css`
    width: 50%;
    height: 50px;
    border: none;
    border-bottom: 1px solid #eee;
`;

const userStatus = css`
    width: 35px;
    height: 35px;
    margin-left: 60px;
    cursor: pointer;
`;

const selectStatus = css`
    width: 20%;
    height: 35px;
    margin-left: 40px;
    border-radius:7px;
    background-color: white;
`;

const selectCount = css`
    display: flex;
    height: 25px;
`;

const countBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #999;
    width: 50px;
    text-align: end;
`;

const selectDateBox = css`
    margin-left: 30px;
`;

const buttonContainer = css`
    display: flex;
    justify-content: center;
    margin-left: 40px;
`;

const buttonRadioBox = css`
    font-size: 30px;
`;

const buttonRadio = css`
    width: 30px;
    height: 30px;
`;

const postWrite = css`
    display: flex;
    flex-direction: column;
    height: 160px;
`;

const writeTitle = css`
    padding: 7px;
    font-size: 22px;
    font-weight: 600;
`;

const writeBox = css`
    width: 100%;
    height: 120px;
    border: 1px solid #999;
`;

const buttonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const modifyButton = css`
    width: 150px;
    height: 35px;
    margin-right: 40px;
    border: none;
    border-radius: 20px;
`;

const cancelButton = css`
    width: 150px;
    height: 35px;
    margin-left: 40px;
    border: none;
    border-radius: 20px;
`;

const PostRegister = () => {
    const [ count, setCount ] = useState(0);
    const [ gender, setGender ] = useState('');

    const [ selectedDate, setSelectedDate ] = useState(new Date());

    const handleClick = (value) => () => {
        if(count + value >= 0) {
            setCount((prev) => prev + value);
        }
    }

    const handleChange = (e) => {
        setGender(e.target.value);
    }

    return (
        <div css={mainContainer}>
            <header css={header}>
                <h1 css={title}>게시글 작성하기</h1>
            </header>
            <main css={postInfo}>
                <div css={postContainer}>
                    <p css={postTitle}>제목</p>
                    <input css={postInput} type="text" placeholder="제목을 입력하세요"/>
                    <FaUserCog css={userStatus}/>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>운동 종목</p>
                    <select css={selectStatus}>
                        <option selected>종목</option>
                    </select>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>지역 선택</p>
                    <select css={selectStatus}>
                        <option selected>지역</option>
                        <option>부산</option>
                        <option>서울</option>
                        <option>대구</option>
                    </select>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>날짜 선택</p>
                    <div css={selectDateBox}>
                        <DatePicker 
                            locale={ko} 
                            selected={selectedDate} 
                            onChange={date => setSelectedDate(date)}
                            showTimeSelect
                            dateFormat="yyyy년 MM월 dd일 HH시 MM분"
                        />
                    </div>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>인원 선택</p>
                    <div css={selectCount}>
                        <button onClick={handleClick(-5)}>&#60;&#60;</button>
                        <button onClick={handleClick(-1)}>&#60;</button>
                        <div css={countBox}>{count}</div>
                        <button onClick={handleClick(1)}>&#62;</button>
                        <button onClick={handleClick(+5)}>&#62;&#62;</button>
                    </div>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>모집 성별 선택</p>
                    <div css={buttonContainer}>
                        <label css={buttonRadioBox}>
                            <input css={buttonRadio} type="radio" name="gender" value="male" cehcked={gender === 'male'} onChange={handleChange}/>
                            <BiMale />
                        </label>
                        <label css={buttonRadioBox}>
                            <input css={buttonRadio} type="radio" name="gender" value="female" cehcked={gender === 'female'} onChange={handleChange}/>
                            <BiFemale />
                        </label>
                        <label css={buttonRadioBox}>
                            <input css={buttonRadio} type="radio" name="gender" value="none" cehcked={gender === 'none'} onChange={handleChange}/>
                            <BiMaleFemale />
                        </label>
                    </div>
                </div>
                <div css={postWrite}>
                    <p css={writeTitle}>모집 소개글</p>
                    <input css={writeBox} type="text"/>
                </div>
            </main>
                <div css={buttonBox}>
                    <button css={modifyButton}>작성</button>
                    <button css={cancelButton}>취소</button>
                </div>
        </div>
    );
};

export default PostRegister;