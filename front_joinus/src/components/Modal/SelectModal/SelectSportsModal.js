/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import IconsModal from './IconsModal';
import { useQuery } from 'react-query';
import axios from 'axios';

const modalMainContainer = (isOpen) => css`
    display: ${isOpen ? "block" : "none"};
    position: fixed;
    flex-direction: column;
    top: 50%;
    left: 50%;
    z-index: 99;
    border-radius: 10px;
    width: 450px;
    height: 500px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

const modalMainHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
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
    margin: 10px 20px;
    height: 70%;
`;

const modalMainButton = css`
    display: flex;
    justify-content: center;
    margin: 10px;
`;

const okButton = css`
    margin-right: 5px;
    width: 80px;
    height: 30px;
`;

const cancelButton = css`
    margin-left: 5px;
    width: 80px;
    height: 30px;
`;


const SelectSportsModal = ({ isOpen, setIsOpen, onSelect, onClick }) => {

    const handleIconClick = (IconComponent) => {
        onSelect(IconComponent);
    }

    // const getSports = useQuery(["getSports"], async () => {

    //     const response = await axios.get("http://localhost:8080/auth/option/sports");
    //     return response;
    // });

    return (
        <div css={modalMainContainer(isOpen)}>
            <header css={modalMainHeader}>
                <h1 css={modalMainTitle}>운동 종목 선택</h1>
            </header>
            <main css={modalMain}>
                {/* <IconsModal onIconClick={handleIconClick}/> */}
                <IconsModal onSelect={handleIconClick}/>
            </main>
            <footer css={modalMainButton}>
                <button css={okButton} onClick={()=> {
                    setIsOpen(false);
                    onClick();
                }}>확인</button>
                <button css={cancelButton} onClick={()=> setIsOpen(false)}>취소</button>
            </footer>
        </div>
    );
};

export default SelectSportsModal;