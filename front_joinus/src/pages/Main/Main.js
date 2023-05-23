/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FcSportsMode } from 'react-icons/fc';
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from 'react-select';
import { GiSoccerBall } from 'react-icons/gi';
import SelectSportsModal from "../../components/Modal/SelectModal/SelectSportsModal";
import axios from "axios";
import { useQuery } from "react-query";
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';

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
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid #999; */
    /* border-radius: 50%; */
    margin: 10px;
    width: 60px;
    height: 60px;
`;

const postContent = css`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 90%;
    height: 100%;
`;

const postListHeader = css`
    display: flex;
    justify-content: space-between;
    height: 19px;
`;

const headerNickName = css`
    width: 100px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const headerDateLabel = css`
    margin-left: 10px;
    font-weight: 600;
    cursor: pointer;
`;

const headerDate = css`
    width: 160px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const postMain = css`
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 28px;
`;

const informationLabel =css`
    font-weight: 600;
    cursor: pointer;
`;

const informationTextName = css`
    width: 80px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const informationDate = css`
    width: 150px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const informationCount = css`
    width: 60px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const pageButton = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

const goToPageButton = css`
    border: none;
    border-radius: 50%;
    margin: 0 1px;
    width: 35px;
    height: 35px;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: #96ffff;
    }
    &:active {
        background-color: #1eddff;
    }
`;

const nowPageButton = css`
    background-color: #1eddff;
`;

const createButton = css`
    position: absolute;
    border-radius: 6px;
    bottom: 20px;
    right: 20px;
    width: 100px;
    height: 40px;
`;

const Main = () => {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useState({
        page: 1, 
        regionId: 0,
        sprotsId: 0,
        searchType: 1,
        searchValue: ""
    });
    const [ refresh, setRefresh ] = useState(true);
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState(
        {
            region: {value: 0, label: "전체"},
            searchType: {value: 1, label: "전체"}
        }
    );

    const [ icons, setIcons ] = useState(() => (<FcSportsMode css={sportIcon}/>));

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
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
      enabled: !!localStorage.getItem("accessToken"),
    });

    const sportsIcons = [
        {id: 1, name: 'gym', icon: <CgGym size={32} /> },
        {id: 2, name: 'running', icon: <FaRunning size={32} /> },
        {id: 3, name: 'soccer', icon: <GiSoccerKick size={32} /> },
        {id: 4, name: 'baseball', icon: <GiBaseballBat size={32} /> },
        {id: 5, name: 'basketball', icon: <GiBasketballBasket size={32} /> },
        {id: 6, name: 'swimmer', icon: <FaSwimmer size={32} /> },
        {id: 7, name: 'tennis', icon: <GiTennisRacket size={32} /> },
        {id: 8, name: 'climmer', icon: <GiMountainClimbing size={32} /> },
        {id: 9, name: 'cycle', icon: <IoMdBicycle size={32} /> },
        {id: 10, name: 'mountainroad', icon: <GiMountainRoad size={32} /> },
        {id: 11, name: 'fishing', icon: <GiBoatFishing size={32} /> },
        {id: 12, name: 'bowling', icon: <GiBowlingStrike size={32} /> },
        {id: 13, name: 'tabletennis', icon: <FaTableTennis size={32} /> },
        {id: 14, name: 'volleyball', icon: <FaVolleyballBall size={32} /> },
        {id: 15, name: 'golf', icon: <MdGolfCourse size={32} /> },
        {id: 16, name: 'skateboarding', icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, name: 'scubadiving', icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, name: 'surfing', icon: <MdSurfing size={32} /> },
        {id: 19, name: 'billiards', icon: <RiBilliardsFill size={32} /> },
        {id: 20, name: 'game', icon: <GrGamepad size={32} /> }
    ]

    const getSports = useQuery(["getSports"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get("http://localhost:8080/option/sports", option);
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
      enabled: !!localStorage.getItem("accessToken"),
    });

    const getRegions = useQuery(["getRegions"], async () => {
        const option = {
            params: {
                ...searchParams
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/regions", option);
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
      enabled: !!localStorage.getItem("accessToken"),
    });

    const getSearchs = useQuery(["getSearchs"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/searchs", option);
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
      enabled: !!localStorage.getItem("accessToken"),
    });

    const getPostList = useQuery(["getPostList"], async () => {
        const option = {
            params: {
                ...searchParams
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get("http://localhost:8080/post/list", option);
        return response.data;
    }, {
        enabled: refresh,
        onSuccess: () => {
            setRefresh(false);
        }
    },
    {
      onError: (error) => {
        // 인증에 실패했을 때의 처리를 추가합니다.
        if (error.response?.status === 401) {
          
          console.error('Error fetching principal:', error);
        }
      },
      // 토큰이 존재할 때만 쿼리를 활성화합니다.
      enabled: !!localStorage.getItem("accessToken"),
    });

    if(principal.isLoading) {
        return <></>;
    }

    const handleIconSelect = (IconComponent) => {
        setSelectedIcon(IconComponent.id);
        setSearchParams((prevState) => ({
            ...prevState,
            sportsId: IconComponent.id,
            page: 1
        }));
    }

    const selectedIconClickHandle = () => {
        const selectedSportsIcon = sportsIcons.find((icon) => icon.id === selectedIcon);
        setIcons(selectedSportsIcon ? selectedSportsIcon.icon : null);
        // setSearchParams((prevState) => ({
        //     ...prevState,
        //     sportsId: selectedSportsIcon,
        //     page: 1
        // }));
        setRefresh(true);
    }


    const handleOptionChange = (optionName) => (option) => {
        if(optionName === "regionId") {
            setSelectedOptions({
                ...selectedOptions,
                region: {
                    ...option
                }
            });
        }else if(optionName === "searchType") {
            setSelectedOptions({
                ...selectedOptions,
                searchType: {
                    ...option
                }
            });
        }
        setSearchParams({
            ...searchParams,
            [optionName]: option.value,
            page: 1
        });
        setRefresh(true);
    }

    const searchValueOnChangeHandle = (e) => {
        setSearchParams({
            ...searchParams,
            searchValue: e.target.value
        });
        setRefresh(true);
    }

    const listClickHandle = (postId) => {
        navigate(`/post/${postId}`);
    }

    const createClickHandle = () => {
        navigate("/post/register");
    }

    const pagination = () => {

        if(getPostList.isLoading) {
            return <></>;
        }

        const nowPage = searchParams.page;

        const lastPage = getPostList.data.totalCount % 10 === 0
            ? getPostList.data.totalCount / 10
            : Math.floor(getPostList.data.totalCount / 10) + 1;

        const startIndex = nowPage % 5 === 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;

        const pageNumbers = [];

        const beforePage = nowPage > 1;
        const afterPage = nowPage < lastPage;

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        const beforeFirstSetPage = () => {
            const firstGoToPage = startIndex - 5 <= 0 ? 1 : startIndex - 5;
            setSearchParams({ ...searchParams, page: firstGoToPage });
            setRefresh(true);
        }

        const nextSetPage = () => {
            const nextStartIndex = endIndex + 1;
            setSearchParams({ ...searchParams, page: nextStartIndex });
            setRefresh(true);
        }

        return (
            <>
                {startIndex > 1 && (
                    <button 
                        css={goToPageButton} 
                        disabled={startIndex <= 1} 
                        onClick={beforeFirstSetPage}
                    >
                        &#60;&#60;
                    </button>
                )}

                {beforePage && (
                    <button 
                        css={goToPageButton} 
                        disabled={nowPage === 1} 
                        onClick={() => {
                            setSearchParams({...searchParams, page: nowPage - 1});
                            setRefresh(true);
                        }}
                    >
                        &#60;
                    </button>
                )}

                {pageNumbers.map(page => (
                    <button 
                        css={[goToPageButton, page === nowPage && nowPageButton]} 
                        key={page} 
                        onClick={() => {
                            setSearchParams({...searchParams, page});
                            setRefresh(true);
                        }} 
                        disabled={page === nowPage}
                    >
                        {page}
                    </button>
                ))}

                {afterPage && (
                    <button 
                        css={goToPageButton} 
                        disabled={nowPage === lastPage} 
                        onClick={() => {
                            setSearchParams({...searchParams, page: nowPage + 1});
                            setRefresh(true);
                        }}
                    >
                        &#62;
                    </button>
                )}

                {afterPage && nowPage + 5 <= lastPage && (
                    <button 
                        css={goToPageButton} 
                        disabled={nowPage === lastPage} 
                        onClick={nextSetPage}
                    >
                        &#62;&#62;
                    </button>
                )}
            </>
        )
    }   

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div css={selectIconbox} onClick={() => setSportsModalIsOpen(true)}>
                    {icons}
                </div>
                {getSports.isLoading ? ""
                    : <SelectSportsModal 
                        isOpen={sportsModalIsOpen} 
                        setIsOpen={setSportsModalIsOpen} 
                        onSelect={handleIconSelect} 
                        onClick={selectedIconClickHandle}
                    />
                }
                <div css={selectIconbox}>
                    {getRegions.isLoading ? ""
                        : <Select
                            css={selectCountry}
                            value={selectedOptions.region}
                            onChange={handleOptionChange('regionId')}
                            options={[{"value": 0, "label": "전체"}, ...getRegions.data.map(region => ({"value": region.regionId, "label": region.regionName}))]}
                            placeholder="지역"
                        />}
                </div>
                <div css={inputBox}>
                    {getSearchs.isLoading ? ""
                        : <Select
                            css={selectSearch}
                            value={selectedOptions.searchType}
                            onChange={handleOptionChange('searchType')}
                            options={getSearchs.data.map(search => ({"value": search.searchId, "label": search.searchName}))}
                            placeholder="항목"
                        />}
                    <input css={searchInput} type="text" placeholder="검색" onChange={searchValueOnChangeHandle}/>
                </div>
            </header>
            <div css={mainListBox}>
            {getPostList.isLoading ? ( 
                "" 
            ) : (
                <>
                    {getPostList.data.postList.filter((post) => new Date(post.deadLine) > new Date())
                    .map((post) =>(
                        <div css={listContainer} key={post.postId} onClick={() => listClickHandle(post.postId)} >
                            <div css={postIconBox}>
                                {sportsIcons.filter(sportIcon => sportIcon.id === parseInt(!!post.sportsId ? post.sportsId : 1))[0].icon}
                            </div>
                            <div css={postContent}>
                                <header css={postListHeader}>
                                    <label css={informationLabel} >작성자:{post.writerNickName}</label>
                                    <input css={headerNickName} type="text" readOnly/>  
                                    <label css={headerDateLabel} >작성일:</label>
                                    <input 
                                        css={headerDate} 
                                        type="text" 
                                        value={new Date(post.registeDate).toLocaleString("ko-KR",{
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                        })}
                                        readOnly
                                    />  
                                </header>
                                <main css={postMain}>{post.title}</main>
                                <footer>
                                    <label css={informationLabel}>지역:</label>
                                    <input css={informationTextName} type="text" value={post.regionName} readOnly />
                                    <label css={informationLabel}>날짜:</label>
                                    <input 
                                        css={informationDate} 
                                        type="text" 
                                        value={new Date(post.deadLine).toLocaleString("ko-KR",{
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })} 
                                        readOnly 
                                    />
                                    <label css={informationLabel}>성별:</label>
                                    <input css={informationTextName} type="text" value={post.genderName} readOnly />
                                    <label css={informationLabel}>인원:</label>
                                    <input css={informationCount} type="text" value={post.recruitsCount} readOnly />
                                </footer>
                            </div>
                        </div>
                    ))}
                </>
            )}
            </div>
            <div css={pageButton}>
                {pagination()}
            </div>
                <button css={createButton} onClick={createClickHandle}>
                    작성하기
                </button>
            
        </div>
    );
};

export default Main;