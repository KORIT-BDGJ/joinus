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
const ownerNickname = css`
    padding: 10px;
`;
const detailButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
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
`;

const detailFoot = css`
    border: 1px solid #dbdbdb;
    margin-bottom: 5px;
    padding: 10px;
`;
const footTop = css`
    margin-top: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 600;

`;
const footMiddle = css`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 100px;
    overflow-y: auto;
`;

const footBottom = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0px;
    width: 100%;
    
`;
const footInput = css`
    width: 91%;
    height: 30px;
`;

const footButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    margin-left: 10px;
`;

const PostDetail = () => {
    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/auth/principal", option);
        return response;
    });





    const [ detailShow, setDetailShow ] = useState(false);
    const [ attendShow, setAttendShow ] = useState(false);
    const [ applicantShow, setApplicantShow ] = useState(false);
    const [totalApplicantCount, setTotalApplicantCount] = useState(0);
    const [totalAttendCount, setTotalAttendCount] = useState(0);
    const applicantClickHandle = (e) => {
        setApplicantShow(!applicantShow);
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



    if(getPost.isLoading) {
        return <div>불러오는 중...</div>
    }

    const userId = principal.data.data.userId;
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
                <div css={headerTitle}>{getPost.data.data.title}</div>
                <div>
                    {isCurrentUserAuthor ? (
                        <>
                            <button css={attendButton}>수정하기</button>
                            <button css={attendButton}>삭제하기</button>
                        </>
                    ) : (
                        <button css={attendButton}>신청하기</button>
                    )}
                </div>
            </div>
            <div css={detailBody}>
                <div css={infoBasic}>
                    <div css={infoBox}>
                        <div css={ownerInfo}>방장정보 :</div>
                        <div css={ownerPicture}>{getPost.data.data.image}</div>
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
                <div css={footTop}>댓글</div>
                <div css={footMiddle}>
                    <Comment postId={postId}/>
                </div>
                <div css={footBottom}>
                    <input css={footInput} placeholder="댓글을 입력하세요"/>
                    <button css={footButton}>작성</button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;