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
    transition: left 1s ease;
    background-color: white;
    
    ${isOpen ? "" : `
        cursor: pointer;
    `}
    
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
    width: 60px;
    height: 60px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    margin: 5px;
    font-size: 20px;
    font-weight: 600;
`;

const userNickName = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    border: 1px solid #999;
`;

const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    &:active {
        background-color: #fafafa;
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
        }
    }
    
    // if(queryClient.getQueryState("principal").status === "loading") {
    //     return <div>로딩중...</div>
    // }

    // const principalData = queryClient.getQueryData("principal").data;
    // const roles = principalData.authorities.split(",");

    return (
        <div css={sidebar(isOpen)} onClick={sidebarOpenClickHandle}>
            <header css={header}>
                <div css={userIcon}>
                </div>
                <div css={userInfo}>
                    진정한헬창
                </div>
                <div css={closeButton} onClick={sidebarCloseClickHandle}><GrFormClose /></div>
            </header>
            <main css={main}>
                <div>
                <Link to="/userinfo"><ListButton title="내 정보 변경"><GrUserSettings /></ListButton></Link>
                </div>
                <Link to="/main"><ListButton title="운동 찾기"><BiHome /></ListButton></Link>
                <Link to="/postregister"><ListButton title="운동 모집글 작성"></ListButton></Link>
                <Link to="/ownerpostlist"><ListButton title="내 모집글 보기"></ListButton></Link>
                <Link to="/hostpostlist"><ListButton title="내 신청 보기"></ListButton></Link>
            </main>
            <footer css={footer}>
                <ListButton title="Logout" onClick={logoutClickHandle}><BiLogOut/></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;