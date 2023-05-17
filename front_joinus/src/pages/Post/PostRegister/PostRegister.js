/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { BiMale, BiMaleFemale } from 'react-icons/bi';
import { BiFemale } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from "react-icons/fc";
import Select from 'react-select';
import Sidebar from "../../../components/Sidebar/Sidebar";
import SelectSportsModal from "../../../components/Modal/SelectModal/SelectSportsModal";
import SelectModifyModal from "../../../components/Modal/SelectModal/SelectModifyModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

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

const selectLevelBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
`;

const selectLevel = css`
    width: 130px;
    height: 40px;
`;

const selectUserStatus = css`
    border-radius: 7px;
    width: 180px;
    height: 40px;
`;

const selectCountry = css`
    width: 200px;
    height: 40px;
`;

const sportIcon = css`
    width: 60px;
    height: 35px;
    cursor: pointer;
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
    cursor: pointer;
`;

const postWrite = css`
    display: flex;
    flex-direction: column;
    height: 160px;
`;

const writeText = css`
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
    cursor: pointer;
`;

const cancelButton = css`
    width: 150px;
    height: 35px;
    margin-left: 40px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;

const PostRegister = () => {

    const navigate = useNavigate();

    const [ titlePost, setTitlePost ] = useState("");
    const [ textPost, setTextPost ] = useState("");
    const [ count, setCount ] = useState(0);
    const [ gender, setGender ] = useState('1');
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(new Date());

    const [ selectedOptions, setSelectedOptions ] = useState({
        selectedLevel: null,
        selectedStates: null,
        selectedCountry: null
    });

    const [ icons, setIcons ] = useState(() => (<FcSportsMode css={sportIcon}/>));
    
    const getLevels = useQuery(["getLevels"], async () => {

        const response = await axios.get("http://localhost:8080/auth/option/levels");
        return response;
    });

    const getStates = useQuery(["getStates"], async () => {

        const response = await axios.get("http://localhost:8080/auth/option/states");
        return response;
    });

    const getRegions = useQuery(["getRegions"], async () => {

        const response = await axios.get("http://localhost:8080/auth/option/regions");
        return response;
    });

    const getGenders = useQuery(["getGenders"], async () => {

        const response = await axios.get("http://localhost:8080/auth/option/genders");
        return response;
    });

    // 작성버튼 확인 모달창
    // const [ submitModalIsOpen, setSubmitModalIsOpen ] = useState(false); 

    // const queryClient = useQueryClient();
    // if(queryClient.getQueryState("principal").status === "loading") {
    //     return <div>로딩중...</div>
    // }

    // const principalData = queryClient.getQueryData("principal").data;
    // const roles = principalData.authorities.split(",");

    const sendPost = async () => {
        const data = {
            writerId: 1,
            title: titlePost,
            sportsId: selectedIcon.icons,
            levelId: selectedOptions.selectedLevel.value,
            stateId: selectedOptions.selectedStates.value,
            regionId: selectedOptions.selectedCountry.value,
            deadLine: selectedDate,
            recruitsCount: count,
            genderId: gender,
            text: textPost
        }

        console.log(data)

        const option = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        try {
            const response = await axios.post("http://localhost:8080/auth/post/register", JSON.stringify(data), option);
            return response;
        } catch(error) {
            console.log(error);
        }
    };


    const titleHandleChange = (e) => {
        setTitlePost(e.target.value);
    }

    const textHandleChange = (e) => {
        setTextPost(e.target.value);
    }

    const createClickHandle = () => {
       
        sendPost();
        navigate('/main');
    }

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

    const handleClick = (value) => () => {
        if(count + value >= 0) {
            setCount((prev) => prev + value);
        }
    }

    const genderHandleChange = (e) => {
        setGender(e.target.value);
    }

    const cancelClickHandle = () => {
        navigate("/main");
    }

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <h1 css={title}>게시글 작성하기</h1>
            </header>
            <main css={postInfo}>
                <div css={postContainer}>
                    <p css={postTitle}>제목</p>
                    <input css={postInput} type="text" placeholder="제목을 입력하세요" value={titlePost} onChange={titleHandleChange}/>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>운동 종목</p>
                    <div onClick={() => setSportsModalIsOpen(true)}>
                        {icons}
                    </div>
                    {<SelectSportsModal 
                        isOpen={sportsModalIsOpen} 
                        setIsOpen={setSportsModalIsOpen} 
                        onSelect={handleIconSelect} 
                        onConfirm={onConfirm}
                        onClick={selectedIconClickHandle}
                    />}
                    <div css={selectLevelBox}>
                        {getLevels.isLoading ? "" 
                            : <Select
                                css={selectLevel}
                                value={selectedOptions.selectedLevel}
                                onChange={handleOptionChange('selectedLevel')}
                                options={getLevels.data.data.map(level => ({"value": level.levelId, "label": level.levelName}))}
                                placeholder="레벨 선택"
                            />}
                        
                    </div>
                    <div css={selectLevelBox}>
                        {getStates.isLoading ? ""
                            : <Select
                                css={selectUserStatus}
                                value={selectedOptions.selectedStates}
                                onChange={handleOptionChange('selectedStates')}
                                options={getStates.data.data.map(state => ({"value": state.stateId, "label": state.stateName}))}
                                placeholder="운동 방식 선택!"
                            />}
                    </div>
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>지역 선택</p>
                    {getRegions.isLoading ? ""
                        : <Select
                            css={selectCountry}
                            value={selectedOptions.selectedCountry}
                            onChange={handleOptionChange('selectedCountry')}
                            options={getRegions.data.data.map(region => ({"value": region.regionId, "label": region.regionName}))}
                            placeholder="지역을 고르시오."
                        />}
                </div>
                <div css={postContainer}>
                    <p css={postTitle}>날짜 선택</p>
                    <div>
                        <DatePicker 
                            locale={ko} 
                            selected={selectedDate} 
                            onChange={date => setSelectedDate(date)}
                            showTimeSelect
                            dateFormat="yyyy년 MM월 dd일 HH시 mm분"
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
                        {getGenders.isLoading ? "" : getGenders.data.data.map((genderOption) => (
                            <label css={buttonRadioBox} key={genderOption.genderId}>
                                <input
                                    css={buttonRadio}
                                    type="radio"
                                    name="gender"
                                    value={genderOption.genderId}
                                    checked={gender === `${genderOption.genderId}`}
                                    onChange={genderHandleChange}
                                />
                                {genderOption.genderId === 1 && <i className="fas fa-male"><BiMale /></i>}
                                {genderOption.genderId === 2 && <i className="fas fa-female"><BiFemale /></i>}
                                {genderOption.genderId === 3 && <i className="fas fa-maleFemale"><BiMaleFemale /></i>}
                            </label>
                        ))}
                    </div>
                </div>
                <div css={postWrite}>
                    <p css={writeText}>모집 소개글</p>
                    <input css={writeBox} type="text" value={textPost} onChange={textHandleChange} />
                </div>
            </main>
                <div css={buttonBox}>
                    <button css={modifyButton} onClick={createClickHandle} >작성</button>
                    {/* <SelectModifyModal isOpen={submitModalIsOpen} setIsOpen={setSubmitModalIsOpen}/> */}
                    <button css={cancelButton} onClick={cancelClickHandle}>취소</button>
                </div>
                
        </div>
    );
};

export default PostRegister;