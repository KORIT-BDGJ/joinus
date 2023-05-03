/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 50px;
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
    margin: 10px;
`;

const detailBody = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
const ownerInfo = css`
    padding: 10px;
`;

const ownerPicture = css`
    padding: 10px;
`;
const ownerNickname = css`
    padding: 10px;
`;
const detailButton = css`
    padding: 10px;
`;

const infoDetail = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const ownerLevel = css`
    padding: 10px;`;
const ownerState = css`
    padding: 10px;`;
const ownerMedal = css`
    padding: 10px;`;

const recruitInfo = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const recruitInfoTitle = css``;
const recruitSports = css``;
const recruitRegion = css``;
const recruitTime = css``;
const recruitGender = css``;

const member = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const memberHeader = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const attendPeople = css``;
const applicantButton = css``;


const memberList = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const applicant = css``;

const detailFoot = css``;
const footTop = css``;
const footMiddle = css``;
const footBottom = css`
    display: flex;
    justify-content: space-between;
`;

const HostPostDetail = () => {
    return (
        <div css={container}>
            <div css={detailHeader}>
                <div css={headerTitle}>헬스 삼분할 하체 조지실분</div>
                <button css={attendButton}>참여버튼</button>
            </div>
            <div css={detailBody}>
                <div css={infoBasic}>
                    <div css={ownerInfo}>방장정보 :</div>
                    <div css={ownerPicture}>방장사진</div>
                    <div css={ownerNickname}>방장닉네임</div>
                    <button css={detailButton}>상세정보 버튼</button>
                </div>
                <div css={infoDetail}>
                    <div css={ownerLevel}>고급</div>
                    <div css={ownerState}>가르쳐주고 싶어요</div>
                    <div css={ownerMedal}>금메달</div>
                </div>
                <div css={recruitInfo}>
                    <div css={recruitInfoTitle}>모집정보</div>
                    <div css={recruitSports}>종목</div>
                    <div css={recruitRegion}>지역</div>
                    <div css={recruitTime}>시간</div>
                    <div css={recruitGender}>성별</div>
                </div>
                <div css={member}>
                    <div css={memberHeader}>
                        <div css={attendPeople}>참여인원 정보 : (4/10)</div>
                        <button css={applicantButton}>참여자 보기</button>
                        <div css={applicant}>신청자1</div>
                        <div css={applicant}>신청자2</div>
                        <div css={applicant}>신청자3</div>
                        <div css={applicant}>신청자4</div>
                    </div>
                    <div css={memberList}>
                        <div css={attendPeople}>신청인원 정보 : (4/10)</div>
                        <button css={applicantButton}>신청자 보기</button>
                        <div css={applicant}>신청자1</div>
                        <div css={applicant}>신청자2</div>
                        <div css={applicant}>신청자3</div>
                        <div css={applicant}>신청자4</div>
                    </div>
                </div>
            </div>
            <div css={detailFoot}>
                <div css={footTop}>댓글</div>
                <div css={footMiddle}>진정한헬창 : 수요일은 하체</div>
                <div css={footBottom}>
                    <p><input placeholder="댓글을 입력하세요"/></p>
                    <button>작성</button>
                </div>
            </div>
        </div>
    );
};

export default HostPostDetail;