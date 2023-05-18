/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FcSportsMode } from 'react-icons/fc';
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from 'react-select';
import { GiSoccerBall } from 'react-icons/gi';
import SelectSportsModal from "../../components/Modal/SelectModal/SelectSportsModal";
import axios from "axios";
import { useQuery } from "react-query";

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

    const getRegions = useQuery(["getRegions"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/regions", option);
        return response;
    });

    const getSearchs = useQuery(["getSearchs"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/searchs", option);
        return response;
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

        return await axios.get("http://localhost:8080/post/list", option);
    }, {
        enabled: refresh,
        onSuccess: () => {
            setRefresh(false);
        }
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
            [optionName]: option.value
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

    const listClickHandle = () => {
        // if (currentUser.id == post.writer_id) {
        //     navigate("/ownerpostdetail");
        // } else {
        //     navigate("/hostpostdetail");
        // }
        navigate("/hostpostdetail");
    }

    const createClickHandle = () => {
        navigate("/post/register");
    }

    const [ icons, setIcons ] = useState(() => (<FcSportsMode css={sportIcon}/>))

    const pagination = () => {

        if(getPostList.isLoading) {
            return <></>;
        }

        const nowPage = searchParams.page;

        const lastPage = getPostList.data.data.totalCount % 10 === 0
            ? getPostList.data.data.totalCount / 10
            : Math.floor(getPostList.data.data.totalCount / 10) + 1;

        const startIndex = nowPage % 5 === 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;

        const pageNumbers = [];

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                <button disabled={nowPage === 1} onClick={() => {
                    setSearchParams({...searchParams, page: 1});
                    setRefresh(true);
                }}>&#60;&#60;</button>

                <button disabled={nowPage === 1} onClick={() => {
                    setSearchParams({...searchParams, page: nowPage - 1});
                    setRefresh(true);
                }}>&#60;</button>
                {pageNumbers.map(page => (<button key={page} onClick={() => {
                    setSearchParams({...searchParams, page});
                    setRefresh(true);
                }} disabled={page === nowPage}>{page}</button>))}
                <button disabled={nowPage === lastPage} onClick={() => {
                    setSearchParams({...searchParams, page: nowPage + 1});
                    setRefresh(true);
                }}>&#62;</button>

                <button disabled={nowPage === lastPage} onClick={() => {
                    setSearchParams({...searchParams, page: lastPage});
                    setRefresh(true);
                }}>&#62;&#62;</button>
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
                {<SelectSportsModal 
                    isOpen={sportsModalIsOpen} 
                    setIsOpen={setSportsModalIsOpen} 
                    onSelect={handleIconSelect} 
                    onConfirm={onConfirm}
                    onClick={selectedIconClickHandle}
                />}
                <div css={selectIconbox}>
                    {getRegions.isLoading ? ""
                        : <Select
                            css={selectCountry}
                            value={selectedOptions.region}
                            onChange={handleOptionChange('regionId')}
                            options={[{"value": 0, "label": "전체"}, ...getRegions.data.data.map(region => ({"value": region.regionId, "label": region.regionName}))]}
                            placeholder="지역"
                        />}
                </div>
                <div css={inputBox}>
                    {getSearchs.isLoading ? ""
                        : <Select
                            css={selectSearch}
                            value={selectedOptions.searchType}
                            onChange={handleOptionChange('searchType')}
                            options={getSearchs.data.data.map(search => ({"value": search.searchId, "label": search.searchName}))}
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
                    {getPostList.data.data.postList.map((post) =>(
                        <div css={listContainer} onClick={listClickHandle}>
                            <div css={postIconBox}><GiSoccerBall css={postIcon}/></div>
                            <div css={postContent}>
                                <header>방장: {post.writer}등록날짜</header>
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
                                    {/* <input css={informationCount} type="text" value={`${post.applicants}/${post.recruitsCount}`} readOnly /> */}
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