/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from 'react-icons/fc';
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from 'react-select';
import { GiSoccerBall } from 'react-icons/gi';
import SelectSportsModal from "../../components/Modal/SelectModal/SelectSportsModal";

const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
`;

const selectIconbox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
`;

const sportIcon = css`
    width: 45px;
    height: 35px;
    cursor: pointer;
`;

const selectCountry = css`
    z-index: 99;
    width: 100px;
    height: 35px;
`;

const selectSearch = css`
    width: 30%;
    height: 35px;
    font-size: 14px;
`;

const inputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 100%;
`;

const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    height: 38px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 3px;
    width: 100%;
    height: 120px;
    background-color: beige;
    cursor: pointer;
`;

const postIconBox = css`
    border: 1px solid #999;
    border-radius: 50%;
    margin: 10px;
    width: 60px;
    height: 60px;
`;

const postIcon = css`
    width: 100%;
    height: 100%;
`;

const postContent = css`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 90%;
    height: 100%;
`;

const postMain = css`
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 28px;
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

const options = {
    countries: [
        { value: 'busan', label: '부산' },
        { value: 'seoul', label: '서울' },
        { value: 'daegu', label: '대구' },
        { value: 'daejeon', label: '대전' }
      ],
    searchCategorys: [
        { value: 'title', label: '제목' },
        { value: 'writer', label: '작성자' },
        { value: 'story', label: '내용' }
    ]
};

const Main = () => {

    const navigate = useNavigate();
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState({
        selectedCountry: null,
        selectedSearch: null
    });

    const handleIconSelect = (IconComponent) => {
        if (!sportsModalIsOpen) {
            return;
        }

        setSelectedIcon(<IconComponent css={sportIcon}/>);
    }

    const selectedIconClickHandle = () => {
        setIcons(() => (selectedIcon))
    }

    const onConfirm = () => {
        setSportsModalIsOpen(false);
    }

    const handleOptionChange = (optionName) => (selectedOption) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: selectedOption
        }))
    }

    const listClickHandle = () => {
        navigate("/hostpostdetail");
    }

    const createClickHandle = () => {
        navigate("/postregister");
    }

    const [ icons, setIcons ] = useState(() => (<FcSportsMode css={sportIcon}/>))

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div css={selectIconbox} onClick={() => setSportsModalIsOpen(true)}>
                    {icons}
                </div>
                {<SelectSportsModal 
                    isOpen={sportsModalIsOpen} 
                    setIsOpen={setSportsModalIsOpen} 
                    onSelect={handleIconSelect} 
                    onConfirm={onConfirm}
                    onClick={selectedIconClickHandle}
                />}
                <div css={selectIconbox}>
                    <Select
                        css={selectCountry}
                        value={selectedOptions.selectedCountry}
                        onChange={handleOptionChange('selectedCountry')}
                        options={options.countries}
                        placeholder="지역"
                    />
                </div>
                <div css={inputBox}>
                    <Select
                        css={selectSearch}
                        value={selectedOptions.selectedSearch}
                        onChange={handleOptionChange('selectedSearch')}
                        options={options.searchCategorys}
                        placeholder="항목"
                    />
                    <input css={searchInput} type="text" placeholder="검색"/>
                </div>
            </header>
            <div css={mainListBox}>
                <div css={listContainer} onClick={listClickHandle}>
                    <div css={postIconBox}><GiSoccerBall css={postIcon}/></div>
                    <div css={postContent}>
                        <header>2023.05.05</header>
                        <main css={postMain}>모집 제목</main>
                        <footer>모집유저이름/모집지역/모집시간/신청인원</footer>
                    </div>
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