/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from 'react-icons/fc';
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from 'react-select';
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
import { GrPowerReset } from 'react-icons/gr';

const mainContainer = css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 100%;
`;

// const header = css`
//     position: relative;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     height: 100px;
// `;

const header = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const categoryButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 19%;
    height: 100%;
    background-color: white;
    cursor: pointer;
`;

const expandedButtonsContainer = (expandedIsOpen) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    border: ${expandedIsOpen ? "1px solid #dbdbdb" : "none"};
    border-radius: 7px;
    padding: 0px 20px;
    width: 100%;
    height: ${expandedIsOpen ? "100px" : "0px"};
    ${expandedIsOpen ? "opacity: 1;" : "overflow: hidden;opacity: 0;"}
    
    transition: all 0.5s ease;
`;

const expandedOptions = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 100%;
`;

const expandedButtons = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 25%;
    height: 100%;
`;

const resetButton = css`
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: x-large;
    background-color: white;
    cursor: pointer;
`;

const buttonTitles = css`
    position: absolute;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;

const buttonsBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
`;

const likeSports = css`
    border: 1px solid #999;
    width: 20px;
    text-align: center;
`;

const sportIcon = css`
    width: 45px;
    height: 35px;
    cursor: pointer;
`;

const selectCountry = css`
    z-index: 1;
    width: 100px;
    height: 35px;
`;

const inputBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
`;

const selectSearch = css`
    width: 19%;
    border-radius: 7px;
    font-size: 14px;
`;

const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 0;
    width: 60%;
    height: 100%;
`;

const listOrder = css`
    height: 20px;
    margin-bottom: 5px;
`;

const listNewEst = css`
    border: none;
    height: 20px;
    background-color: white;
    font-weight: 400;
    cursor: pointer;
`;

const listDeadLine = css`
    border: none;
    height: 20px;
    background-color: white;
    cursor: pointer;
`;

const selectedSortButton = css`
    font-weight: 600;
`;

const mainListBox = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    flex-grow: 1;
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

const finalDeadLine = css`
    background-color: red;
`;

const informationCount = css`
    width: 60px;
    text-align: center;
    border: none;
    background-color: beige;
    cursor: pointer;
`;

const pageButton = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    height: 80px;
`;

const pageButtons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const emptyBox = css`
    width: 100px;
    height: 100%;
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
    border-radius: 6px;
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
        searchValue: "",
        sort: 0
    });
    const [ refresh, setRefresh ] = useState(true);
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState(
        {
            region: {value: 0, label: "전체"},
            searchType: {value: 1, label: "전체"}
        }
    );

    const [ searchInputValue, setSearchInputValue ] = useState("");

    const [ icons, setIcons ] = useState(() => (
        <FcSportsMode 
            css={sportIcon}
            title="운동 선택"
        />
    ));

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get("http://localhost:8080/account/principal", option);
        return response.data;
    });

    // const sportsLikes = useQuery(["sportsLikes"], async () => {
    //     const options = {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     };
    
    //     const response = await axios.get("http://localhost:8080/account/check/sportslikes", options);
    //     return response.data;
    // });
    
      
    //   useEffect(() => {
    //     if (sportsLikes.data) {
    //       const sportsArray = sportsLikes.data.flatMap(sport => sport.sportsIds);
    //       setSelectedSports(sportsArray);
    //     }
    //   }, [sportsLikes.data]);   

    const sportsIcons = [
        {id: 1, name: "헬스", icon: <CgGym size={32} /> },
        {id: 2, name: "러닝", icon: <FaRunning size={32} /> },
        {id: 3, name: "축구", icon: <GiSoccerKick size={32} /> },
        {id: 4, name: "야구", icon: <GiBaseballBat size={32} /> },
        {id: 5, name: "농구", icon: <GiBasketballBasket size={32} /> },
        {id: 6, name: "수영", icon: <FaSwimmer size={32} /> },
        {id: 7, name: "테니스", icon: <GiTennisRacket size={32} /> },
        {id: 8, name: "클라이밍", icon: <GiMountainClimbing size={32} /> },
        {id: 9, name: "자전거", icon: <IoMdBicycle size={32} /> },
        {id: 10, name: "등산", icon: <GiMountainRoad size={32} /> },
        {id: 11, name: "낚시", icon: <GiBoatFishing size={32} /> },
        {id: 12, name: "볼링", icon: <GiBowlingStrike size={32} /> },
        {id: 13, name: "탁구", icon: <FaTableTennis size={32} /> },
        {id: 14, name: "배구", icon: <FaVolleyballBall size={32} /> },
        {id: 15, name: "골프", icon: <MdGolfCourse size={32} /> },
        {id: 16, name: "스케이트보드", icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, name: "스쿠버다이빙", icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, name: "서핑", icon: <MdSurfing size={32} /> },
        {id: 19, name: "당구", icon: <RiBilliardsFill size={32} /> },
        {id: 20, name: "게임", icon: <GrGamepad size={32} /> }
    ]

    const getSports = useQuery(["getSports"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const response = await axios.get("http://localhost:8080/option/sports", option);
        return response.data;
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
    });

    const getSearchs = useQuery(["getSearchs"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/searchs", option);
        return response.data;
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
    },{
        enabled: refresh,
        onSuccess: () => {
            setRefresh(false);
        }
    });

    if(principal.isLoading) {
        return <></>;
    }

    const getNextServerTime = () => {
        const currentDate = new Date();
        const nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        let nextServerTime;

        if (currentDate.getHours() < 12) {
          // 현재 시간이 오전인 경우
            nextServerTime = new Date(nextDay.setHours(12, 0, 0, 0));
        } else {
          // 현재 시간이 오후인 경우
            nextServerTime = new Date(nextDay.setHours(23, 30, 0, 0));
        }
        return nextServerTime;
    }

    const expandHeader = () => {
        setIsExpanded(!isExpanded);
    };

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

        const value = e.target.value;
        setSearchInputValue(value);
        setSearchParams({
            ...searchParams,
            searchValue: value
        });
        setRefresh(true);
    }

    const resetSearchClickHandle = () => {
        setIcons(<FcSportsMode css={sportIcon} />);
        setSearchInputValue("");
        setSelectedOptions({
            region: {value: 0, label: "전체"},
            searchType: {value: 1, label: "전체"}
        });
        setSearchParams({
            ...searchParams,
            page: 1, 
            regionId: 0,
            sportsId: 0,
            searchType: 1,
            searchValue: ""
        });
        setRefresh(true);
    }

    const handleSortChange = (sortType) => {
        if(sortType === "newest") {
            setSearchParams({...searchParams, sort: 0});
        }else {
            setSearchParams({...searchParams, sort: 1});
        }
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
                <div css={inputBox}>
                    {getSearchs.isLoading ? ""
                        : <Select
                            css={selectSearch}
                            value={selectedOptions.searchType}
                            onChange={handleOptionChange('searchType')}
                            options={getSearchs.data.map(search => ({"value": search.searchId, "label": search.searchName}))}
                            placeholder="항목"
                        />}
                    <input 
                        css={searchInput} 
                        type="text" 
                        placeholder="검색"
                        value={searchInputValue}
                        onChange={searchValueOnChangeHandle}
                    />
                    <button css={categoryButton} onClick={expandHeader}>상세검색</button>
                </div>
                {(
                    <div css={expandedButtonsContainer(isExpanded)}>
                        <div css={expandedOptions}>
                            <div css={buttonsBox}>
                                <label css={buttonTitles}>선호 운동</label>
                                <button css={likeSports}>
                                    1
                                </button>
                            </div>
                            <div css={buttonsBox}>
                                <label css={buttonTitles}>운동 선택</label>
                                <div onClick={() => setSportsModalIsOpen(true)}>
                                    {icons}
                                </div>
                            </div>
                            {getSports.isLoading ? ""
                                : <SelectSportsModal 
                                    isOpen={sportsModalIsOpen} 
                                    setIsOpen={setSportsModalIsOpen} 
                                    onSelect={handleIconSelect} 
                                    onClick={selectedIconClickHandle}
                                />
                            }
                            <div css={buttonsBox}>
                                <label css={buttonTitles}>지역 선택</label>
                                {getRegions.isLoading ? ""
                                    : <Select
                                        css={selectCountry}
                                        value={selectedOptions.region}
                                        onChange={handleOptionChange('regionId')}
                                        options={[{"value": 0, "label": "전체"}, ...getRegions.data.map(region => ({"value": region.regionId, "label": region.regionName}))]}
                                        placeholder="지역"
                                    />
                                }
                            </div>
                        </div>
                        <div css={expandedButtons}>
                            <button css={resetButton} 
                    onClick={resetSearchClickHandle}><GrPowerReset /></button>
                        </div>
                    </div>
                )}
            </header>
            <div css={listOrder}>
                <button css={[listNewEst, searchParams.sort === 0 && selectedSortButton]} onClick={() => handleSortChange('newest')}>최신순</button>
                <span>|</span>
                <button css={[listDeadLine, searchParams.sort === 1 && selectedSortButton]} onClick={() => handleSortChange('deadline')}>마감순</button>
            </div>
            <div css={mainListBox}>
                {getPostList.isLoading ? ( 
                    "" 
                ) : (
                <>
                    {getPostList.data.postList
                    .map((post) =>(
                        <div 
                            css={listContainer} 
                            key={post.postId} 
                            onClick={() => listClickHandle(post.postId)} 
                        >
                            <div css={postIconBox}>
                                {sportsIcons.filter(sportIcon => sportIcon.id === parseInt(!!post.sportsId ? post.sportsId : 1))[0].icon}
                            </div>
                            <div css={postContent}>
                                <header css={postListHeader}>
                                    <label css={informationLabel} >
                                        작성자:{post.writerNickName}
                                    </label>
                                    <input css={headerNickName} type="text" readOnly/>  
                                    <label css={headerDateLabel} >
                                        작성일:
                                    </label>
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
                                        css={[
                                            informationDate, 
                                            new Date(post.deadLine) > new Date() && 
                                            new Date(post.deadLine) <= getNextServerTime() && 
                                            finalDeadLine
                                        ]} 
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
                <div css={emptyBox}></div>
                <div css={pageButtons}>
                    {pagination()}
                </div>
                <button css={createButton} onClick={createClickHandle}>
                    작성하기
                </button>
            </div>
            
        </div>
    );
};

export default Main;