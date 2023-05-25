/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import ApplicantList from '../../../components/UI/PostDetail/ApplicantList';
import AttendList from '../../../components/UI/PostDetail/AttendList';
import Comment from '../../../components/UI/PostDetail/Comment';
import ApplyPost from '../../../components/UI/PostDetail/ApplyPost';


const container = css`
    display: flex;
    flex-direction: column;
    padding: 10px 50px;
    height: 900px;
    overflow-y: auto;
`;

const detailHeader = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #dbdbdb;
    margin-bottom: 50px;
`;

const headerTitle = css`
    font-size: 25px;
    font-weight: 600;
`;



const attendButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
`;

const detailBody = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
`;

const infoBasic = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #dbdbdb;
    
`;
const infoBox = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ownerInfo = css`
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
`;

const ownerPicture = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid #dbdbdb;
    border-radius:  50%;
    font-size: 13px;
`;

const imgIcon = css`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ownerNickname = css`
    padding: 10px;
`;
const detailButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
`;

const infoDetail = (detailShow) => css`
    display: ${detailShow ? "flex" : "none"};
    flex-direction: row;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const ownerLevel = css`
    padding: 10px;
`;
const ownerState = css`
    padding: 10px;
`;
const ownerMedal = css`
    padding: 10px;
`;

const recruitInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const recruitInfoTitle = css`
    margin: 0px 10px 10px 10px;
    font-size: 20px;
    font-weight: 600;
`;

const recruitInfoContent = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const recruitSports = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    font-size: 20px;

`;
const recruitRegion = css`
    margin: 0px 10px;
`;
const recruitTime = css`
    margin: 0px 10px;
`;
const recruitGender = css`
    margin: 0px 10px;
`;

const recruitText = css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const recruitTextHeader = css`
    margin: 5px;
    font-size: 20px;
    font-weight: 600;
`;
const recruitTextBody = css`
    margin: 5px;
    padding-top: 10px;
`;

const applicant = css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;

const applicantList = (applicantShow) => css`
    display: ${applicantShow ? "flex" : "none"};
    flex-direction: column;
`;

const attendTitle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;
    font-size: 20px;
    font-weight: 600;
`;

const attendCount = css`
    display: flex;
    flex-direction: row;
    
    height: 30px;
`;

const attendButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const attendList = (attendShow) => css`
    display: ${attendShow ? "flex" : "none"};
    flex-direction: column;
`;

const applicantTitle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;
    font-size: 20px;
    font-weight: 600;
`;

const applicantCount = css`
    display: flex;
    flex-direction: row;
    
    height: 30px;
`;

const applicantButtonContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
        
`;

const applicantButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
    border: 1px solid black;
    }
`;

const detailFoot = css`
    border: 1px solid #dbdbdb;
    margin-bottom: 5px;
    padding: 10px;
`;
const footHeader = css`
    margin-top: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 600;

`;

const PostDetail = () => {
    const [ detailShow, setDetailShow ] = useState(false);
    const [ attendShow, setAttendShow ] = useState(false);
    const [ applicantShow, setApplicantShow ] = useState(false);
    const [totalApplicantCount, setTotalApplicantCount] = useState(0);
    const [totalAttendCount, setTotalAttendCount] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedLevel, setEditedLevel] = useState("");
    const [editedState, setEditedState] = useState("");
    const [editedMedal, setEditedMedal] = useState("");
    const [editedSports, setEditedSports] = useState("");
    const [editedRegion, setEditedRegion] = useState("");
    const [editedGender, setEditedGender] = useState("");

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/account/principal", option);
        return response.data;
    });


    const applicantClickHandle = (e) => {
        setApplicantShow(!applicantShow);
    };

    const enableEditMode = () => {
        setIsEditMode(true);
        setEditedTitle(getPost.data.data.title);
        setEditedLevel(getPost.data.data.levelName);
        setEditedState(getPost.data.data.stateName);
        setEditedMedal(getPost.data.data.writerNickName);
        setEditedSports(getPost.data.data.sportsName);
        setEditedRegion(getPost.data.data.regionName);
        setEditedGender(getPost.data.data.genderName);
    };

    const saveChanges = () => {
        // Perform the logic to save the edited data, such as making an API request
        // You can use the edited variables (e.g., editedTitle, editedLevel, etc.) to send the updated data
        // Once the changes are saved, you can exit the edit mode
        setIsEditMode(false);
    };


    

    const detailClickHandle = (e) => {
        setDetailShow(!detailShow);
    };
    const attendClickHandle = (e) => {
        setAttendShow(!attendShow);
    };



    
    const { postId } = useParams();
    
    const getPost = useQuery(["getPost"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get(`http://localhost:8080/post/${postId}`, option);
        return response;
    });

    if(principal.isLoading) {
        return <div>불러오는 중...</div>
    }

    if(getPost.isLoading) {
        return <div>불러오는 중...</div>
    }

    const userId = principal.data.userId;
    const writerId = getPost.data.data.writerId;
    const isCurrentUserAuthor = writerId === userId;

   
    
    const deadline = new Date(getPost.data.data.deadLine).toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    const updateTotalApplicantCount = (count) => {
        setTotalApplicantCount(count);
    };
    
    const updateTotalAttendCount = (count) => {
        setTotalAttendCount(count);
    };

    

    return (
        
        <div css={container}>
            <Sidebar></Sidebar>
            <div css={detailHeader}>
                <div css={headerTitle}>
                    {getPost.data.data.title}
                </div>
                <div>
                    {isCurrentUserAuthor ? (
                        <>
                            <button css={attendButton}>수정하기</button>
                            <button css={attendButton}>삭제하기</button>
                        </>
                    ) : (
                        <ApplyPost postId={postId}/>
                    )}
                </div>
            </div>
            <div css={detailBody}>
                <div css={infoBasic}>
                    <div css={infoBox}>
                        <div css={ownerInfo}>방장정보 :</div>
                        <div css={ownerPicture}>
                            {principal.data.image ? (
                                <img
                                    css={imgIcon}
                                    src={"http://localhost:8080/image/profile/" + principal.data.image}
                                    alt="Profile Image"
                                />
                            ) : (
                                <span>{principal.data.nickName}</span>
                            )}
                        </div>
                        <div css={ownerNickname}>{getPost.data.data.writerNickName}</div>
                    </div>
                    <button css={detailButton} onClick={detailClickHandle}>방장 상세정보</button>
                </div>
                <div css={infoDetail(detailShow)}>
                    <div css={ownerLevel}>레벨: {getPost.data.data.levelName}</div>
                    <div css={ownerState}>상태: {getPost.data.data.stateName}</div>
                    <div css={ownerMedal}>메달: {getPost.data.data.writerNickName}</div>
                </div>
                <div css={recruitInfo}>
                    <div css={recruitInfoTitle}>모집정보</div>
                    <div css={recruitInfoContent}>
                        <div css={recruitSports}>{getPost.data.data.sportsName}</div>
                        <div css={recruitRegion}>지역: {getPost.data.data.regionName}</div>
                        <div css={recruitTime}>{deadline}</div>
                        <div css={recruitGender}>모집성별: {getPost.data.data.genderName}</div>
                    </div>
                </div>
                <div css={recruitText}>
                    <div css={recruitTextHeader}>
                        모집글 소개
                    </div>
                    <div css={recruitTextBody}>
                        {getPost.data.data.text}
                    </div>

                </div>
                <div css={applicant}>
                    <div>
                        <div css={applicantTitle}>
                            <div css={applicantCount}>신청인원 정보 : {totalApplicantCount}명 신청중</div>
                            <div css={applicantButtonContainer}>
                                <button css={applicantButton} onClick={applicantClickHandle}>
                                    신청자 보기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div css={applicantList(applicantShow)}>
                        <ApplicantList postId={postId} isCurrentUserAuthor={isCurrentUserAuthor} updateTotalApplicantCount={updateTotalApplicantCount}/>
                    </div>
                    <div>
                        <div css={attendTitle}>
                            <div css={attendCount}>참석인원 정보: {getPost.data.data.recruitsCount}명 모집 / {totalAttendCount}명 참석중</div>
                            <div css={attendButtonContainer}>
                                <button css={attendButton} onClick={attendClickHandle}>
                                    참석자 보기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div css={attendList(attendShow)}>
                        <AttendList postId={postId} isCurrentUserAuthor={isCurrentUserAuthor} updateTotalAttendCount={updateTotalAttendCount}/>
                    </div>
                </div>
            </div>
            <div css={detailFoot}>
                <div css={footHeader}>댓글</div>
                <div>
                    <Comment postId={postId}/>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;