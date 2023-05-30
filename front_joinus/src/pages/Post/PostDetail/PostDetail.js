/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import ApplicantList from '../../../components/UI/PostDetail/ApplicantList';
import AttendList from '../../../components/UI/PostDetail/AttendList';
import Comment from '../../../components/UI/PostDetail/Comment';
import ApplyPost from '../../../components/UI/PostDetail/ApplyPost';
import { FcSportsMode } from "react-icons/fc";
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';
import { BiMale, BiMaleFemale, BiFemale } from 'react-icons/bi';
import SelectSportsModal from '../../../components/Modal/SelectModal/SelectSportsModal';
import Select from 'react-select';


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

const sportIcon = css`
    width: 60px;
    height: 35px;
    cursor: pointer;
`;

const postTitle = css`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    width: 30%;
`;

const buttonRadio = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const selectCity = css`
    width: 200px;
    height: 40px;
`;

const buttonRadioBox = css`
    font-size: 30px;
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
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ detailShow, setDetailShow ] = useState(false);
    const [ attendShow, setAttendShow ] = useState(false);
    const [ applicantShow, setApplicantShow ] = useState(false);
    const [totalApplicantCount, setTotalApplicantCount] = useState(0);
    const [totalAttendCount, setTotalAttendCount] = useState(0);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateText, setUpdateText] = useState("");
    const [ selectedIcon, setSelectedIcon ] = useState(null);
    const [ sportsModalIsOpen, setSportsModalIsOpen ] = useState(false);
    const [updateRegion, setUpdateRegion] = useState("");
    const [updateRegionName, setUpdateRegionName] = useState("");
    const [updateLevel, setUpdateLevel] = useState("");
    const [updateState, setUpdateState] = useState("");
    const [updateSports, setUpdateSports] = useState("");
    const [updateGender, setUpdateGender] = useState("");
    const [ icons, setIcons ] = useState(() => (<FcSportsMode css={sportIcon}/>));

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

    const updateMode = () => {
        setIsUpdateMode(true);
        setUpdateTitle(getPost.data.data.title);
        setUpdateText(getPost.data.data.text);
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
    }, {
        onSuccess: (response) => {
            const selectedSportsIcon = sportsIcons.find((icon) => icon.id === response.data.sportsId);
            setIcons(selectedSportsIcon ? selectedSportsIcon.icon : null);

        }
    });

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

    const getGenders = useQuery(["getGenders"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/option/genders", option);
        return response.data;
    },{
        onError: (error) => {
          // 인증에 실패했을 때의 처리를 추가합니다.
          if (error.response?.status === 401) {
            
            console.error('Error fetching principal:', error);
          }
        },
        // 토큰이 존재할 때만 쿼리를 활성화합니다.
        enabled: !!localStorage.getItem("accessToken"),
      });

    const saveChanges = useMutation(async (updateData)=> {
        console.log(updateData);
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        try{
            const response = await axios.put(`http://localhost:8080/post/update/${postId}`, updateData, option);
            return response;
        } catch(error) {
            setErrorMsg(error.response.data);
            return error;
        }
    }, {
        onSuccess: (response) => {
            if(response.status === 200) {
                alert("게시글 수정 완료!");
                setIsUpdateMode(false);
            }
        }
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

    const handleIconSelect = (IconComponent) => {
        setSelectedIcon(IconComponent.id);
    }

    const selectedIconClickHandle = () => {
        const selectedSportsIcon = sportsIcons.find((icon) => icon.id === selectedIcon);
        setIcons(selectedSportsIcon ? selectedSportsIcon.icon : null);
        setUpdateSports(selectedIcon);
    }

    const genderHandleChange = (e) => {
        setUpdateGender(e.target.value);
    }

    const updateTotalApplicantCount = (count) => {
        setTotalApplicantCount(count);
    };
    
    const updateTotalAttendCount = (count) => {
        setTotalAttendCount(count);
    };

    const saveChangeSubmitHandle = () => {
        saveChanges.mutate({
            updateTitle, 
            updateText,
            updateRegion,
            updateGender,
            updateSports
        })
    }

    const cancelClickHandle = () => {
        setIsUpdateMode(false);
    }

    if(principal.isLoading) {
        return <div>불러오는 중...</div>
    }

    if(getPost.isLoading) {
        return <div>불러오는 중...</div>
    }

    return (
        
        <div css={container}>
            <Sidebar></Sidebar>
            <div css={detailHeader}>
                <div css={headerTitle}>
                    {isUpdateMode ? (
                        <>
                            <input
                            type="text"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                        </>
                        ) : (
                        <>
                            <div>{getPost.data.data.title}</div>
                        </>
                    )}
                </div>
                <div>
                    {isCurrentUserAuthor ? (
                        <>
                            {isUpdateMode ? (
                                <>
                                    <button onClick={saveChangeSubmitHandle}>저장하기</button>
                                    <button onClick={cancelClickHandle}>취소하기</button>
                                </>
                                ) : (
                                <>
                                    <button css={attendButton} onClick={updateMode}>수정하기</button>
                                    <button css={attendButton}>삭제하기</button>
                                </>
                            )}
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
                            {getPost.data.data.image ? (
                                <img
                                    css={imgIcon}
                                    src={"http://localhost:8080/image/profile/" + getPost.data.data.image}
                                    alt="Profile Image"
                                />
                            ) : (
                                <span>{getPost.data.data.writerNickName}</span>
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
                        <div css={recruitSports}>
                        {isUpdateMode ? (
                            <>
                            <div onClick={() => setSportsModalIsOpen(true)}>{icons}</div>
                            {getSports.isLoading ? (
                                ""
                            ) : (
                                <SelectSportsModal
                                isOpen={sportsModalIsOpen}
                                setIsOpen={setSportsModalIsOpen}
                                onSelect={handleIconSelect}
                                onClick={selectedIconClickHandle}
                                />
                            )}
                            </>
                        ) : (
                            <>
                            <div>{icons}</div>
                            </>
                        )}
                        </div>
                        <div css={recruitRegion}>
                            {isUpdateMode ? (
                                <>
                                {getRegions.isLoading ? ""
                                : <Select
                                    css={selectCity}
                                    value={updateRegion}
                                    onChange={(e) => setUpdateRegion(e.value) & setUpdateRegionName(e.label)}
                                    options={getRegions.data.map(region => ({"value": region.regionId, "label": region.regionName}))}
                                    placeholder={updateRegionName ? updateRegionName : getPost.data.data.regionName}
                                />}
                                </>
                            ) : (
                                <div>
                                    지역: {getPost.data.data.regionName}
                                </div>
                            )}               
                        </div>
                        <div css={recruitTime}>{deadline}</div>
                        <div css={recruitGender}>
                        {isUpdateMode ? (
                            <>
                            {getGenders.isLoading ? "" : getGenders.data.map((genderOption) => (
                                <label css={buttonRadioBox} key={genderOption.genderId}>
                                    <input
                                        css={buttonRadio}
                                        type="radio"
                                        name="gender"
                                        value={genderOption.genderId}
                                        checked={updateGender === `${genderOption.genderId}`}
                                        onChange={genderHandleChange}
                                    />
                                    {genderOption.genderId === 1 && <i className="fas fa-male"><BiMale /></i>}
                                    {genderOption.genderId === 2 && <i className="fas fa-female"><BiFemale /></i>}
                                    {genderOption.genderId === 3 && <i className="fas fa-maleFemale"><BiMaleFemale /></i>}
                                </label>
                            ))}   
                            </>
                            ) : (
                                <div>
                                    모집성별: {` `}
                                    {getPost.data.data.genderId === 1 && <i className="fas fa-male"><BiMale /></i>}
                                    {getPost.data.data.genderId === 2 && <i className="fas fa-female"><BiFemale /></i>}
                                    {getPost.data.data.genderId === 3 && <i className="fas fa-maleFemale"><BiMaleFemale /></i>}
                                </div>
                            )} 
                        </div>
                    </div>
                </div>
                <div css={recruitText}>
                    <div css={recruitTextHeader}>
                        모집글 소개
                    </div>
                    <div css={recruitTextBody}>
                        {isUpdateMode ? (
                            <>
                                <textarea
                                value={updateText}
                                onChange={(e) => setUpdateText(e.target.value)}
                                ></textarea>
                            </>
                            ) : (
                            <>
                                <div>{getPost.data.data.text}</div>
                            </>
                        )}
                        
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