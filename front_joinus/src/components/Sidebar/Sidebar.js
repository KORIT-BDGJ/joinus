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
    color: #C8E8E5; 
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

const button_1= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_1.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const button_2= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_2.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const button_3= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_3.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const button_4= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_4.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const button_5= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_5.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const button_6= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_6.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const button_7= css`
  width: 120px; 
  height: 50px;
  background-image: url('/images/button_7.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;



const Sidebar = () => {
    
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
                <Link to={`/user/${principal.data.userId}/modification`}><div css={button_1}></div></Link>
                </div>
                <Link to="/main"><div css={button_2}></div></Link>
                <Link to="/post/register"><div css={button_3}></div></Link>
                <Link to={`/post/${principal.data.userId}/owner`}><div css={button_4}></div></Link>
                <Link to={`/post/${principal.data.userId}/host`}><div css={button_5}></div></Link>
                <Link to={`/post/${principal.data.userId}/finish`}><div css={button_6}></div></Link>
            </main>
            <footer css={footer}>
                <div css={button_7} onClick={logoutClickHandle}></div>
            </footer>
        </div>
    );
};

export default Sidebar;