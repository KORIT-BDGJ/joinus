/** @jsxImportSource @emotion/react */
import * as S from './style';
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
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { addMinutes } from "date-fns";
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike, GiHockey, GiArcheryTarget, GiBoxingGlove } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing, MdOutlineListAlt } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad, GrYoga } from 'react-icons/gr';

const PostRegister = () => {

    const navigate = useNavigate();

    const [ titlePost, setTitlePost ] = useState("");
    const [ textPost, setTextPost ] = useState("");
    const [ count, setCount ] = useState(2);
    const [ gender, setGender ] = useState('1');
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    
    const currentDate = new Date();
    const [ selectedDate, setSelectedDate ] = useState(null);
    const minSelectableDate = new Date();


    const [ selectedOptions, setSelectedOptions ] = useState({
        selectedLevel: null,
        selectedStates: null,
        selectedCountry: null
    });

    const [ icons, setIcons ] = useState(() => (
        <FcSportsMode 
            css={S.sportIcon}
            title="운동 선택"
        />
    ));

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/account/principal", option);
        return response.data;
    });

    const sportsIcons = [
        {id: 0, title: "전체", icon: <MdOutlineListAlt size={32} /> },
        {id: 99, title: "선호운동", icon: "⭐" },
        {id: 1, title: "헬스", icon: <CgGym size={32} /> },
        {id: 2, title: "러닝", icon: <FaRunning size={32} /> },
        {id: 3, title: "축구", icon: <GiSoccerKick size={32} /> },
        {id: 4, title: "야구", icon: <GiBaseballBat size={32} /> },
        {id: 5, title: "농구", icon: <GiBasketballBasket size={32} /> },
        {id: 6, title: "수영", icon: <FaSwimmer size={32} /> },
        {id: 7, title: "테니스", icon: <GiTennisRacket size={32} /> },
        {id: 8, title: "클라이밍", icon: <GiMountainClimbing size={32} /> },
        {id: 9, title: "자전거", icon: <IoMdBicycle size={32} /> },
        {id: 10, title: "등산", icon: <GiMountainRoad size={32} /> },
        {id: 11, title: "낚시", icon: <GiBoatFishing size={32} /> },
        {id: 12, title: "볼링", icon: <GiBowlingStrike size={32} /> },
        {id: 13, title: "탁구", icon: <FaTableTennis size={32} /> },
        {id: 14, title: "배구", icon: <FaVolleyballBall size={32} /> },
        {id: 15, title: "골프", icon: <MdGolfCourse size={32} /> },
        {id: 16, title: "스케이트", icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, title: "스쿠버", icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, title: "서핑", icon: <MdSurfing size={32} /> },
        {id: 19, title: "당구", icon: <RiBilliardsFill size={32} /> },
        {id: 20, title: "게임", icon: <GrGamepad size={32} /> },
        {id: 21, title: "요가", icon: <GrYoga size={32} />},
        {id: 22, title: "하키", icon: <GiHockey size={32} />},
        {id: 23, title: "복싱", icon: <GiBoxingGlove size={32} />}
    ]

    
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }

    const postSubmit = useMutation(async () => {

        const data = {
            writerId: principal.data.userId,
            title: titlePost,
            sportsId: selectedIcon,
            levelId: selectedOptions.selectedLevel.value,
            stateId: selectedOptions.selectedStates.value,
            regionId: selectedOptions.selectedCountry.value,
            deadLine: selectedDate.toLocaleString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}),
            recruitsCount: count,
            genderId: gender,
            text: textPost
        }

        try {
            const response = await axios.post("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/post/register", data, option);
            
            navigate("/main");
            return response;
        } catch(error) {
            return error;
        }
    
    });

    const getSports = useQuery(["getSports"], async () => {

        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/option/sports", option);
        return response.data;
    });

    const getLevels = useQuery(["getLevels"], async () => {

        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/option/levels", option);
        return response.data;
    });

    const getStates = useQuery(["getStates"], async () => {

        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/option/states", option);
        return response.data;
    });

    const getRegions = useQuery(["getRegions"], async () => {

        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/option/regions", option);
        return response.data;
    });

    const getGenders = useQuery(["getGenders"], async () => {

        const response = await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/option/genders", option);
        return response.data;
    });

    if(principal.isLoading || getSports.isLoading ||getLevels.isLoading|| getStates.isLoading ||getRegions.isLoading ||getGenders.isLoading) {
        return <></>;
    }

    const titleHandleChange = (e) => {
        setTitlePost(e.target.value);
    }

    const textHandleChange = (e) => {
        setTextPost(e.target.value);
    }

    const createClickHandle = () => {
        const requiredFields = [
            { field: titlePost, message: "제목을 입력하세요." },
            { field: selectedDate, message: "모집 날짜를 선택하세요." },
            { field: selectedIcon, message: "운동 종목을 선택하세요." },
            { field: selectedOptions.selectedLevel, message: "레벨을 선택하세요." },
            { field: selectedOptions.selectedStates, message: "상태를 선택하세요." },
            { field: selectedOptions.selectedCountry, message: "모집 지역을 선택하세요." },
            { field: count, message: "모집 인원을 선택하세요." },
            { field: gender, message: "모집 성별을 선택하세요." },
            { field: textPost, message: "소개글을 입력하세요." }
        ];

        for (const { field, message } of requiredFields) {
            if(!field) {
                alert(message);
                return;
            }
        }
        postSubmit.mutate();
    }

    const handleIconSelect = (IconComponent) => {
        setSelectedIcon(IconComponent.id);
    }

    const selectedIconClickHandle = () => {
        const selectedSportsIcon = sportsIcons.find((icon) => icon.id === selectedIcon);
        setIcons(selectedSportsIcon ? selectedSportsIcon.icon : null);
        

    }
        
    const handleOptionChange = (optionName) => (selectedOption) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [optionName]: selectedOption
        }))
    }

    const handleClick = (value) => () => {
        if(count + value >= 2) {
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
        <div css={S.mainContainer}>
            <Sidebar></Sidebar>
            <h1 css={S.logoTitle}>
                <div css={S.logoStyle}></div>
            </h1>
            <main css={S.postInfo}>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>제목</p>
                    </div>
                    <div css={S.postInputBox}>
                        <input 
                            css={S.postInput} type="text" placeholder="제목을 입력하세요" value={titlePost} onChange={titleHandleChange}
                        />
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>운동 종목</p>
                    </div>
                    <div css={S.postCategorysBox}>
                        <div onClick={() => setSportsModalIsOpen(true)}>
                            {icons}
                        </div>
                        {getSports.isLoading ? ""
                            : <SelectSportsModal 
                                isOpen={sportsModalIsOpen} 
                                setIsOpen={setSportsModalIsOpen} 
                                onSelect={handleIconSelect} 
                                onClick={selectedIconClickHandle}
                                hiddenIcons={[0, 99]}
                            />}
                        <div css={S.selectLevelBox}>
                            {getLevels.isLoading ? "" 
                                : <Select
                                    css={S.selectLevel}
                                    value={selectedOptions.selectedLevel}
                                    onChange={handleOptionChange('selectedLevel')}
                                    options={getLevels.data.map(level => ({
                                        "value": level.levelId, "label": level.levelName
                                    }))}
                                    placeholder="레벨 선택"
                                />}
                        </div>
                        <div css={S.selectLevelBox}>
                            {getStates.isLoading ? ""
                                : <Select
                                    css={S.selectUserStatus}
                                    value={selectedOptions.selectedStates}
                                    onChange={handleOptionChange('selectedStates')}
                                    options={getStates.data.map(state => ({
                                        "value": state.stateId, "label": state.stateName
                                    }))}
                                    placeholder="운동 방식 선택"
                                />}
                        </div>
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>지역 선택</p>
                    </div>
                    <div css={S.postSelesctsBox}>
                        {getRegions.isLoading ? ""
                            : <Select
                                css={S.selectCountry}
                                value={selectedOptions.selectedCountry}
                                onChange={handleOptionChange('selectedCountry')}
                                options={getRegions.data.map(region => ({
                                    "value": region.regionId, "label": region.regionName
                                }))}
                                placeholder="지역을 고르시오"
                            />}
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>날짜 선택</p>

                    </div>
                    <div css={S.postSelesctsBox}>
                        <div>
                            <DatePicker 
                                locale={ko} 
                                selected={selectedDate}
                                css={S.postSelectDate}
                                onChange={date => setSelectedDate(date)}
                                showTimeSelect
                                minDate={new Date()}
                                dateFormat="yyyy년 MM월 dd일 HH시 mm분"
                                placeholderText="날짜를 선택하시오 "
                            />
                        </div>
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>인원 선택</p>
                    </div>
                    <div css={S.postSelesctsBox}>
                        <div css={S.selectCount}>
                            <button css={S.countButtons} onClick={handleClick(-5)}>&#60;&#60;</button>
                            <button css={S.countButtons} onClick={handleClick(-1)}>&#60;</button>
                            <div css={S.countBox}>{count}</div>
                            <button css={S.countButtons} onClick={handleClick(1)}>&#62;</button>
                            <button css={S.countButtons} onClick={handleClick(+5)}>&#62;&#62;</button>
                        </div>
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>모집 성별 선택</p>
                    </div>
                    <div css={S.postSelesctsBox}>
                        <div css={S.buttonContainer}>
                            {getGenders.isLoading ? ""
                                : getGenders.data.map((genderOption) => (
                                <label css={S.buttonRadioBox} key={genderOption.genderId}>
                                    <input
                                        css={S.buttonRadio}
                                        type="radio"
                                        name="gender"
                                        value={genderOption.genderId}
                                        checked={gender === `${genderOption.genderId}`}
                                        onChange={genderHandleChange}
                                    />
                                    {genderOption.genderId === 1 && <i className="fas fa-male" ><BiMale /></i>}
                                    {genderOption.genderId === 2 && <i className="fas fa-female" ><BiFemale /></i>}
                                    {genderOption.genderId === 3 && <i className="fas fa-maleFemale" ><BiMaleFemale /></i>}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div css={S.postContainer}>
                    <div css={S.postTitleBox}>
                        <p css={S.postTitle}>모집 소개글</p>
                    </div>
                    <div css={S.postInputBox}>
                        <textarea 
                            css={S.postWriteInput} 
                            type="text" 
                            value={textPost} 
                            onChange={textHandleChange} 
                        />
                    </div>
                </div>
            </main>
            <div css={S.buttonBox}>
                <button 
                    css={S.modifyButton} 
                    onClick={createClickHandle} 
                >
                    작성
                </button>
                <button 
                    css={S.cancelButton} 
                    onClick={cancelClickHandle}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default PostRegister;