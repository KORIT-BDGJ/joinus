/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from "./ListButton";
import { BiHome, BiLogOut } from 'react-icons/bi';

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
            left: -230px;
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
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
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

    return (
        <div css={sidebar(isOpen)} onClick={sidebarOpenClickHandle}>
            <header css={header}>
                <div css={userIcon}>
                </div>
                <div css={userInfo}>
                </div>
                <div css={closeButton} onClick={sidebarCloseClickHandle}><GrFormClose /></div>
            </header>
            <main css={main}>
                <ListButton title="DashBoard"><BiHome /></ListButton>
                <ListButton title="create"></ListButton>
                <ListButton title="detail"></ListButton>
            </main>
            <footer css={footer}>
                <ListButton title="Logout"><BiLogOut/></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;