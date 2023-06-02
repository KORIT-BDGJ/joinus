/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from "./ListButton";
import { BiHome, BiLogOut } from 'react-icons/bi';
import { GrUserSettings } from 'react-icons/gr';
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { TfiWrite, TfiClipboard,TfiPencil } from "react-icons/tfi";


const sidebar = (isOpen) => css`
    position: absolute;
    display: flex;
    left: ${isOpen ? "10px" : "-240px"};
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 250px;
    height: 800px;
    z-index: 999;
    box-shadow: -1px 0px 5px #dbdbdb;
    transition: left 0.5s ease;
    background-color: white;
    background-color: white;
    overflow: hidden;
    
    ${isOpen ? "" : `
    &:hover { 
      left: -200px;
    }
  `}
`;

const header = css`
    display: flex;
    align-items: center;
    padding: 10px;
    height: 20%;
`;

const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #dbdbdb;
    width: 60px;
    height: 60px;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const imgIcon = css`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    word-break: break-all;
    margin: 5px;
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    color: #2ecc71;
`;


const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    background-color: transparent;
    font-size: 16px; 
    color: #2ecc71; 
    cursor: pointer;
    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const main = css`
    padding: 10px 50px 10px 10px;
    border-bottom: 1px solid #dbdbdb;
    height: 570px;
`;

const footer = css`
    padding: 10px;
`;

const Sidebar = () => {
    
    const queryClient = useQueryClient(); // 쿼리를 무효화시키기 위해 사용합니다.

    const principal = useQuery(
        ["principal"],
        async () => {
          const option = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          };
        const response = await axios.get("http://localhost:8080/account/principal", option);
        return response.data;
    },
    {
      onError: (error) => {
        // 인증에 실패했을 때의 처리를 추가합니다.
        if (error.response?.status === 401) {
          
          console.error('Error fetching principal:', error);
        }
      },
      // 토큰이 존재할 때만 쿼리를 활성화합니다.
    //   enabled: !!localStorage.getItem("accessToken"),
    });

    const [ isOpen, setIsOpen ] = useState(false);

    const sidebarOpenClickHandle = () => {
        if(!isOpen) {
            setIsOpen(true);
        }
    }

    const sidebarCloseClickHandle = () => {
        setIsOpen(false);
    }

    const logoutClickHandle = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            window.location.replace("/auth/login");
        }
    }
    
    if(principal.isLoading || principal.isError) {
        return <></>;
    }

    // setResponseData(principal.data.data ? principal.data.data : principal.data);
    

    return (
        <div css={sidebar(isOpen)} onClick={sidebarOpenClickHandle}>
            <header css={header}>
                <div css={userIcon}>
                {principal.data.image ? (
                    <img
                    css={imgIcon}
                    src={"http://localhost:8080/image/profile/" + principal.data.image}
                    alt={principal.data.nickName}
                    />
                ) : (
                    <span>{principal.data.nickName.split('@')[0]}</span>
                )}
                </div>
                <div css={userInfo}>
                    {principal.data.nickName.split('@')[0]}
                </div>
                <div css={closeButton} onClick={sidebarCloseClickHandle}><GrFormClose /></div>
            </header>
            <main css={main}>
                <div>
                <Link to={`/user/${principal.data.userId}/modification`}><ListButton title="내 정보 변경"><GrUserSettings /></ListButton></Link>
                </div>
                <Link to="/main"><ListButton title="운동 찾기"><BiHome /></ListButton></Link>
                <Link to="/post/register"><ListButton title="운동 모집글 작성"><TfiWrite/></ListButton></Link>
                <Link to={`/post/${principal.data.userId}/owner`}><ListButton title="내 모집글 보기"><TfiClipboard/></ListButton></Link>
                <Link to={`/post/${principal.data.userId}/host`}><ListButton title="내 신청 보기"><TfiPencil/></ListButton></Link>
                <Link to={`/post/${principal.data.userId}/finish`}><ListButton title="참여 완료한 글"><TfiPencil/></ListButton></Link>
            </main>
            <footer css={footer}>
                <ListButton title="Logout" onClick={logoutClickHandle}><BiLogOut/></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;