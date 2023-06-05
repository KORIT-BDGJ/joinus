/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import IconsModal from './IconsModal';

const modalContainer = (isOpen) => css`
    display: ${isOpen ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: #00000088;
`;

const modalMainContainer = css`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 450px;
    height: 600px;
    background-color: white;
`;

const modalMainHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const modalMainTitle = css`
    font-size: 24px;
    font-weight: 600;
`;

const modalMain = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 100%;

`;

const modalMainButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    height: 40px;
`;

const okButton = css`
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    width: 100px;
    height: 30px;
    font-weight: 600;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: #C8E8E5;
    }

    &:active {
        background-color: #93b0ad;
    }
`;

const cancelButton = css`
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    width: 100px;
    height: 30px;
    font-weight: 600;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: #C8E8E5;
    }

    &:active {
        background-color: #93b0ad;
    }
`;



const SelectSportsModal = ({ isOpen, setIsOpen, onSelect, onClick, sportsLikes, userId, hiddenIcons }) => {
    
    const [selectedIcon, setSelectedIcon] = useState(null);


    const handleIconClick = (icon) => {
        onSelect(icon);
    }


    return (
        <div css={modalContainer(isOpen)}>
            <div css={modalMainContainer}>
                <header css={modalMainHeader}>
                    <h1 css={modalMainTitle}>운동 종목 선택</h1>
                </header>
                <main css={modalMain}>
                    <IconsModal 
                        onIconClick={handleIconClick} 
                        selectedIcon={selectedIcon} 
                        setSelectedIcon={setSelectedIcon}
                        sportsLikes={sportsLikes}
                        userId={userId}
                        hiddenIcons={hiddenIcons}
                    />
                </main>
                <footer css={modalMainButton}>
                    <button css={okButton} onClick={()=> {
                        setIsOpen(false);
                        onClick();
                        setSelectedIcon(null);
                    }}>확인</button>
                    <button css={cancelButton} onClick={()=> {
                        setIsOpen(false);
                        setSelectedIcon(null);
                    }}>취소</button>
                </footer>
            </div>
        </div>
    );
};

export default SelectSportsModal;