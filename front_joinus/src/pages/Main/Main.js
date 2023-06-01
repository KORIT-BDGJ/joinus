/** @jsxImportSource @emotion/react */
import * as S from './style';
import React, { useState } from 'react';
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

const Main = () => {

    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useState({
        page: 1, 
        regionId: 0,
        sportsId: 0,
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
            css={S.sportIcon}
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

    const sportsLikes = useQuery(["sportsLikes"], async () => {
        const options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
    
        const response = await axios.get("http://localhost:8080/account/check/sportslikes", options);
        return response.data;
    });

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

    if(principal.isLoading || getSports.isLoading || getRegions.isLoading || getSearchs.isLoading || getPostList.isLoading) {
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
    }

    const selectedIconClickHandle = () => {
        const selectedSportsIcon = sportsIcons.find((icon) => icon.id === selectedIcon);
        setIcons(selectedSportsIcon ? selectedSportsIcon.icon : null);
        setSearchParams((prevState) => ({
            ...prevState,
            sportsId: selectedIcon,
            page: 1
        }));
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
        setIcons(<FcSportsMode css={S.sportIcon} />);
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
                        css={S.goToPageButton} 
                        disabled={startIndex <= 1} 
                        onClick={beforeFirstSetPage}
                    >
                        &#60;&#60;
                    </button>
                )}

                {beforePage && (
                    <button 
                        css={S.goToPageButton} 
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
                        css={[S.goToPageButton, page === nowPage && S.nowPageButton]} 
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
                        css={S.goToPageButton} 
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
                        css={S.goToPageButton} 
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
        <div css={S.mainContainer}>
            <Sidebar></Sidebar>
            <header css={S.header}>
                <div css={S.inputBox}>
                    {getSearchs.isLoading ? (
                        ""
                        ) : (
                            <Select
                                css={S.selectSearch}
                                value={selectedOptions.searchType}
                                onChange={handleOptionChange("searchType")}
                                options={getSearchs.data.map((search) => ({
                                    value: search.searchId,
                                    label: search.searchName,
                                }))}
                                placeholder="항목"
                            />
                    )}
                    <input
                        css={S.searchInput}
                        type="text"
                        placeholder="검색"
                        value={searchInputValue}
                        onChange={searchValueOnChangeHandle}
                    />
                    <button css={S.detailsSearchBox} onClick={expandHeader}>
                        상세검색
                    </button>
                </div>
                <div css={S.expandedButtonsContainer(isExpanded)}>
                    <div css={S.expandedOptions}>
                        <div css={S.buttonsBox}>
                            <label css={S.buttonTitles}>운동 선택</label>
                            <div css={S.buttonContents}>
                                <div onClick={() => setSportsModalIsOpen(true)}>
                                    {icons}
                                </div>
                            </div>
                        </div>
                        {getSports.isLoading ? (
                            ""
                            ) : (
                                <SelectSportsModal
                                    isOpen={sportsModalIsOpen}
                                    setIsOpen={setSportsModalIsOpen}
                                    onSelect={handleIconSelect}
                                    onClick={selectedIconClickHandle}
                                    sportsLikes={sportsLikes.data}
                                    userId={principal.isLoading ? 0  : principal.data.userId}
                                />
                        )}
                        <div css={S.buttonsBox}>
                            <label css={S.buttonTitles}>지역 선택</label>
                            <div css={S.buttonContents}>
                                {getRegions.isLoading ? (
                                    ""
                                    ) : (
                                        <Select
                                            css={S.selectCountry}
                                            value={selectedOptions.region}
                                            onChange={handleOptionChange("regionId")}
                                            options={[
                                                { value: 0, label: "전체" },
                                                ...getRegions.data.map((region) => ({
                                                    value: region.regionId,
                                                    label: region.regionName,
                                                })),
                                            ]}
                                            placeholder="지역"
                                        />
                                )}
                            </div>
                        </div>
                        <div css={S.buttonsBox}>
                            <label css={S.buttonTitles}>초기화</label>
                            <div css={S.buttonContents}>
                                <button
                                    css={S.resetButton}
                                    onClick={resetSearchClickHandle}
                                >
                                    <GrPowerReset />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div css={S.listOrder}>
                <button
                    css={[
                        S.listNewEst,
                        searchParams.sort === 0 && 
                        S.selectedSortButton
                    ]}
                    onClick={() => handleSortChange("newest")}
                >
                    최신순
                </button>
                <span>|</span>
                <button
                    css={[
                        S.listDeadLine,
                        searchParams.sort === 1 && 
                        S.selectedSortButton
                    ]}
                    onClick={() => handleSortChange("deadline")}
                >
                    마감순
                </button>
            </div>
            <div css={S.mainListBox}>
                {getPostList.isLoading ? (
                    ""
                    ) : (
                        <>
                            {getPostList.data.postList.map((post) => (
                                <div
                                    css={S.listContainer}
                                    key={post.postId}
                                    onClick={() => listClickHandle(post.postId)}
                                >
                                    <div css={S.postIconBox}>
                                        {sportsIcons.filter(
                                            (sportIcon) =>
                                            sportIcon.id ===
                                            parseInt(!!post.sportsId ? post.sportsId : 1)
                                            )[0].icon
                                        }
                                    </div>
                                    <div css={S.postContent}>
                                        <header css={S.postListHeader}>
                                            <div css={S.headerNickName} >
                                                <label css={S.informationLabel}>작성자:</label>
                                                {post.writerNickName}
                                            </div>
                                            <div css={S.registeDates}>
                                                <label css={S.headerDateLabel}>작성일:</label>
                                                {new Date(post.registeDate).toLocaleString(
                                                    "ko-KR",
                                                    {
                                                        month: "long",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}
                                            </div>
                                        </header>
                                        <main css={S.postMain}>
                                            {post.title}
                                        </main>
                                        <footer css={S.postFooter}>
                                            <div css={S.informationTextName}>
                                                <label css={S.informationLabel}>지역:</label>
                                                {post.regionName}
                                            </div>
                                            <div css={[
                                                    S.informationDate,
                                                    new Date(post.deadLine) > new Date() &&
                                                    new Date(post.deadLine) <= getNextServerTime() &&
                                                    S.finalDeadLine
                                                ]}
                                            >
                                                <label css={S.informationLabel}>날짜:</label>
                                                {new Date(post.deadLine).toLocaleString(
                                                    "ko-KR",
                                                    {
                                                        month: "long",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}   
                                            </div>
                                            <div css={S.informationTextName}>
                                                <label css={S.informationLabel}>성별:</label>
                                                {post.genderName}
                                            </div> 
                                            <div css={S.informationCount}>
                                                <label css={S.informationLabel}>인원:</label>
                                                {post.recruitsCount}
                                            </div>
                                        </footer>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
            </div>
            <div css={S.pageButton}>
                <div css={S.emptyBox}></div>
                <div css={S.pageButtons}>
                    {pagination()}
                </div>
                <button css={S.createButton} onClick={createClickHandle}>
                    작성하기
                </button>
            </div>
        </div>
    );
};

export default Main;