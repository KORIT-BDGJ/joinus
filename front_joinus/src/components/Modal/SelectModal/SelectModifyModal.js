/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const modalMainContainer = (isOpen) => css`
    display: ${isOpen ? "block" : "none"};
    position: fixed;
    flex-direction: column;
    top: 50%;
    left: 50%;
    z-index: 99;
    border-radius: 10px;
    width: 300px;
    height: 200px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

const modalMain = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
`;

const buttonBox = css`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;

const okButton = css`
    margin-right: 7px;
    border: none;
    background-color: white;
    cursor: pointer;
`;

const cancelButton = css`
    margin-left: 7px;
    border: none;
    background-color: white;
    cursor: pointer;
`;

const SelectModifyModal = ({ isOpen, setIsOpen }) => {

    const navigate = useNavigate();

    const handleOkClick = () => {
        setIsOpen(false);
        navigate("/main");
    }

    return (
        <div css={modalMainContainer(isOpen)}>
            <div css={modalMain}>
                <h1>게시글 작성을 완료하시겠습니까?</h1>
            </div>
            <div css={buttonBox}>
                <button css={okButton} onClick={handleOkClick}>Yes</button>
                <button css={cancelButton} onClick={() => setIsOpen(false)}>No</button>
            </div>
        </div>
    );
};

export default SelectModifyModal;