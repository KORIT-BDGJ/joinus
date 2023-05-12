/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
import Sidebar from '../../../components/Sidebar/Sidebar';


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
    padding: 10px;
    font-size: 40px;
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
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border: 1px solid #dbdbdb;
`;
const recruitInfoTitle = css`
    margin: 0px 10px;
    font-size: 20px;
    font-weight: 600;
`;
const recruitSports = css`
    margin: 0px 10px;
    font-size: 30px;
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
const applicantHeader = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
`;
const applicantCount = css`
    display: flex;
    flex-direction: row;
    height: 30px;
`;
const applicantButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
`;

const attendList = (attendShow) => css`
    display: ${attendShow ? "flex" : "none"};
    flex-direction: column;
`;

const applicantList = (applicantShow) => css`
    display: ${applicantShow ? "flex" : "none"};
    flex-direction: column;
`;

const member = css`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
const chatting = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
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

const OwnerPostDetail = () => {
    const [ detailShow, setDetailShow ] = useState(false);
    const [ attendShow, setAttendShow ] = useState(false);
    const [ applicantShow, setApplicantShow ] = useState(false);

    const detailClickHandle = (e) => {
        setDetailShow(!detailShow);
    };
    const attendClickHandle = (e) => {
        setAttendShow(!attendShow);
    };
    const applicantClickHandle = (e) => {
        setApplicantShow(!applicantShow);
    };



    return (
        <div css={container}>
            <Sidebar></Sidebar>
            <div css={detailHeader}>
                <div css={headerTitle}>헬스 삼분할 하체 조지실분</div>
                <div>
                    <button css={attendButton}>수정하기</button>
                    <button css={attendButton}>삭제하기</button>
                </div>
            </div>
            <div css={detailBody}>
                <div css={infoBasic}>
                    <div css={infoBox}>
                        <div css={ownerInfo}>방장정보 :</div>
                        <div css={ownerPicture}><FaUserCircle /></div>
                        <div css={ownerNickname}>진정한헬창</div>
                    </div>
                    <button css={detailButton} onClick={detailClickHandle}>상세정보 버튼</button>
                </div>
                <div css={infoDetail(detailShow)}>
                    <div css={ownerLevel}>레벨: 고급</div>
                    <div css={ownerState}>상태: 가르쳐주고 싶어요</div>
                    <div css={ownerMedal}>메달: 금메달</div>
                </div>
                <div css={recruitInfo}>
                    <div css={recruitInfoTitle}>모집정보</div>
                    <div css={recruitSports}><CgGym /></div>
                    <div css={recruitRegion}>지역: 부산</div>
                    <div css={recruitTime}>5월5일 19:00시</div>
                    <div css={recruitGender}>남성만</div>
                </div>
                <div css={recruitText}>
                    <div css={recruitTextHeader}>
                        모집글 소개
                    </div>
                    <div css={recruitTextBody}>
                        내용
                    </div>

                </div>
                <div css={applicant}>
                    <div css={applicantHeader}>
                        <div css={applicantCount}>참여인원 정보 : (4/10)</div>
                        <button css={applicantButton} onClick={attendClickHandle}>참여자 보기</button>
                    </div>
                    <div css={attendList(attendShow)}>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자1
                            </div>
                            <button css={applicantButton}>내보내기</button>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자2
                            </div>
                            <button css={applicantButton}>내보내기</button>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자3
                            </div>
                            <button css={applicantButton}>내보내기</button>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자4
                            </div>
                            <button css={applicantButton}>내보내기</button>
                        </div>
                    </div>
                    <div css={applicantHeader}>
                        <div css={applicantCount}>신청인원 정보 : (4/10)</div>
                        <button css={applicantButton} onClick={applicantClickHandle}>신청자 보기</button>
                    </div>
                    <div css={applicantList(applicantShow)}>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자1
                            </div>
                            <div>
                                <button css={applicantButton}>수락</button>
                                <button css={applicantButton}>거절</button>
                            </div>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자2
                            </div>
                            <div>
                                <button css={applicantButton}>수락</button>
                                <button css={applicantButton}>거절</button>
                            </div>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자3
                            </div>
                            <div>
                                <button css={applicantButton}>수락</button>
                                <button css={applicantButton}>거절</button>
                            </div>
                        </div>
                        <div css={member}>
                            <div>
                                <FaUserCircle /> 신청자4
                            </div>
                            <div>
                                <button css={applicantButton}>수락</button>
                                <button css={applicantButton}>거절</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div css={detailFoot}>
                <div css={footTop}>댓글</div>
                <div css={footMiddle}>
                    <div css={chatting}>
                        <FaUserCircle /> 진정한헬창 : 수요일은 하체
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 헬린이 : 3대 200 참여 가능한가요?
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 김종국 : 오운완
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 진정한헬창 : 수요일은 하체
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 헬린이 : 3대 200 참여 가능한가요?
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 김종국 : 오운완
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 진정한헬창 : 수요일은 하체
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 헬린이 : 3대 200 참여 가능한가요?
                    </div>
                    <div css={chatting}>
                        <FaUserCircle /> 김종국 : 오운완
                    </div>
                </div>
                <div css={footBottom}>
                    <input css={footInput} placeholder="댓글을 입력하세요"/>
                    <button css={footButton}>작성</button>
                </div>
            </div>
        </div>
    );
};

export default OwnerPostDetail;