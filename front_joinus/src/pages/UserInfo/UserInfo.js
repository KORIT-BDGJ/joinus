/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { CgGym } from 'react-icons/cg';
import { FaRunning, FaSwimmer, FaTableTennis, FaVolleyballBall } from 'react-icons/fa';
import { GiArcheryTarget, GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiBowlingStrike, GiBoxingGlove, GiHockey, GiMountainClimbing, GiMountainRoad, GiSoccerKick, GiTennisRacket } from 'react-icons/gi';
import { GrGamepad, GrYoga } from 'react-icons/gr';
import { IoMdBicycle } from 'react-icons/io';
import { MdGolfCourse, MdOutlineScubaDiving, MdOutlineSkateboarding, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import AddressChangeModal from '../../components/Modal/AddressChangeModal';
import NicknameChangeModal from '../../components/Modal/NicknameChangeModal';
import PwChangeModal from '../../components/Modal/PwChangeModal';
import SportsIconModal from '../../components/Modal/SportsIconModal';
import Sidebar from '../../components/Sidebar/Sidebar';


const container = css`
  max-width: 1200px;
  margin: 0px auto;
  
`;

const headerContainer = css`
  height :125px ;
  display: flex;
  align-content: flex-start;
  justify-content: center;
`;

const logoStyle= css`
  width: 724px; 
  height: 125px;
  background-image: url('/images/12_plus.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;



const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
    
`;

const userContainer = css`
  width: 100%;
  display: flex;
  
  //justify-content: center;
  //align-items: center;
  //flex-direction: row;
`;


const userInfo = css`
  width: 380px;
  margin-top: 20px;
  font-size: 24px;
`;

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 48px;
  font-weight: 600;
`;

const subTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px 20px;
  font-size: 30px;
  font-weight: 600;
`;

const userDetail = css`
  display: flex;
  justify-content: space-between;  /* add this line */
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
  overflow-wrap: break-word;
  padding: 10px;

  span {
    flex-grow: 1;
    white-space: normal;
  }
`;

const spanStyle = css`
  font-weight: 600;
`;

const changeButton = css`
  background-color: #2ecc71;
  color: white;
  margin-left: auto;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const imageBox = css`
  width: 300px;
  height: 300px;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 15px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const imagePreview = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const detailContainer = css`
  width: 680px;
  height: 400px;
  border: 1px solid #333;
  border-radius: 10px;
  display: flex;        
  flex-direction: column;  
  justify-content: space-between; 
  align-items: center;   
  
`;

const footerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modifyButton = css`
  margin-top: auto;    /* add this line */
  margin-bottom: 20px;  /* modify this line */
  border: 1px solid #dbdbdb;
  border-radius: 7px;
  width: 200PX;
  height: 60px;
  background-color: #2ecc71;
  color: white;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    border: 1px solid #000000;
  }
  &:active {
    background-color: #27ae60;
  }
`;
const dcTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 5px 20px;
    font-size: 30px;
    color: #00B894;
    font-weight: 600;
`;

const circleContainer = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px;
`;


const circle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 2px solid #333;
`;

const plusButton = css`
  font-size: 25px;
  font-weight: 600;
  color: #00B894;
  cursor: pointer;
`;

const minusButton = css`
  position: absolute;
  top: 10px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 20px;
  border: 2px solid #e74c3c;
  border-radius: 5px ;
  background-color: white;
  color: green;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const animationStyles = (start, end) => ({
  '@keyframes slide': {
    '0%': { transform: `translateX(${start}px)` },
    '100%': { transform: `translateX(${end}px)` },
  },
  animationName: 'slide',
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationDirection: 'alternate',
});


const emojiContainer = css`
  position: absolute;
  bottom: 60px;
  right: 15px;
  transform: translateY(-50%);
  font-size: 11px;
  opacity: 0.7;
  display: flex; 
  align-items: center; 
  justify-content: center;
`;

const emoji = css`
  ${animationStyles(-70, -50)}
  display: inline-block;
  
`;

const spanLocation = css`
  position: relative;
  left: -40px;  // adjust this value to move the text further to the left
`;


const UserInfo = () => {
  
  
  const [ imgFile, setImgFile ] = useState();
  const fileRef = useRef();
  const [ profileImgURL, setProfileImgURL ] = useState();
  const navigate = useNavigate();
  const [isNicknameChangeModalOpen, setIsNicknameChangeModalOpen] = useState(false);
  const [isPwChangeModalOpen, setIsPwChangeModalOpen] = useState(false);
  const [isAddressChangeModalOpen, setIsAddressChangeModalOpen] = useState(false);
  const [isSportsIconModalOpen, setIsSportsIconModalOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState([null, null, null]);
  const [plusVisible, setPlusVisible] = useState([true, false, false]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState(""); 
  const [password , setPassword] = useState();
  const [point, setPoint] = useState();
  const [maskedPassword, setMaskedPassword] = useState("⁕⁕⁕⁕⁕⁕⁕⁕");

  const principal = useQuery(["principal"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response.data;
  });
  
  useEffect(() => {
    
    if (principal.data) {
      setAddress(principal.data.address);
      setNickname(principal.data.nickName);
      setPoint(principal.data.point);
      setProfileImgURL("http://localhost:8080/image/profile/" + principal.data.image);
    }
  }, [principal.data]);  

  const sportsLikes = useQuery(["sportsLikes"], async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.get("http://localhost:8080/account/check/sportslikes", options);
    return response.data;
  });

  
  useEffect(() => {
    if (sportsLikes.data) {
      const sportsArray = sportsLikes.data.flatMap(sport => sport.sportsIds);
      setSelectedSports(sportsArray);
    }
  }, [sportsLikes.data]);   





  
  const profileImgSubmit = useMutation(async(selectedFile) => {
    
    const formData = new FormData();
    formData.append("profileImgFile", selectedFile);
    
    const option = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "multipart/form-data",
      },
    };
    
    const response = await axios.post("http://localhost:8080/account/profile/img", formData, option);
    return response;
    
  },{
    onSuccess: () => {
      principal.refetch();
      alert('프로필 이미지가 성공적으로 변경되었습니다.');
    }
  });
  


  const closeAddressChangeModal = () => {
    setIsAddressChangeModalOpen(!isAddressChangeModalOpen);
  }
  const closeNicknameChangeModal = () => {
    setIsNicknameChangeModalOpen(!isNicknameChangeModalOpen);
  }

  const closePwChangeModal = () => {
    setIsPwChangeModalOpen(!isPwChangeModalOpen);
  }

  const closeSportsIconModal  = () => {
    setIsSportsIconModalOpen(!isSportsIconModalOpen);
  }

  const profileImgFileChangeHandle = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImgURL(reader.result);
        setImgFile(selectedFile);  // 이미지 파일을 상태에 설정
        profileImgSubmit.mutate(selectedFile);  // 이미지 파일 업로드를 시작
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const profileImgChangeHandle = () => {
    fileRef.current.click();
  };


  const handleCircleClick = (e) => {
    const index = Number(e.currentTarget.getAttribute('data-index'));
    if(!!selectedSports[index - 1] || index === 0){
      setSelectedIndex(index);
      setIsSportsIconModalOpen(true);
    }
  };

  const handleSportIconSelect = (selectedIcon) => {
    setSelectedSports(prev => {
      const newSports = [...prev];
      newSports[selectedIndex] = selectedIcon;
      return newSports;
    });
  
    setPlusVisible(prev => {
      const newPlusVisible = [...prev];
      if (selectedIndex < 2) {
        newPlusVisible[selectedIndex + 1] = true;
      }
      return newPlusVisible;
    });
  
    setIsSportsIconModalOpen(false);
  };

 
  const handleMinusClick = (e, index) => {
    e.stopPropagation();
    setSelectedSports(prev => {
      const newSports = [...prev];
      newSports.splice(index, 1);
      newSports.push(null);
      return newSports;
    });
  
    setPlusVisible(prev => {
      const newPlusVisible = [...prev];
      newPlusVisible[index] = false;
      if (index > 0) {
        newPlusVisible[index - 1] = true;
      }
      return newPlusVisible;
    });
  };
  const handleModifyClick = async () => {
    // Get the selected sports
    const selectedSportsToSend = selectedSports.filter(sport => sport != null);
    const options = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    };
  
    try {
        const response = await axios.put("http://localhost:8080/account/change/sportslikes", 
            {
                userId: principal.data.userId,
                sportsIds: selectedSportsToSend
            }, 
            options
        );
          
        if (response.status === 200 ) {
            alert("스포츠가 성공적으로 등록되었습니다.");
            // navigate('/main');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
          // alert창
        } else {
          alert("스포츠 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }
  };

  const updatePassword = (newPw) => {
    setPassword(newPw);
    setMaskedPassword("⁕⁕⁕⁕⁕⁕⁕⁕");
  };

  const updateNickname = (newNickname) => {
    setNickname(newNickname);
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
  };

  if(principal.isLoading || sportsLikes.isLoading){
    return <></>;
  }
  


  const renderSportIcon = (sport, size, index) => {
    
    if (sport === 3) return <GiSoccerKick size={size} />;
    if (sport === 1) return <CgGym size={size} />;
    if (sport === 4) return <GiBaseballBat size={size} />;
    if (sport === 5) return <GiBasketballBasket size={size} />;
    if (sport === 8) return <GiMountainClimbing size={size} />;
    if (sport === 9) return <IoMdBicycle size={size} />;
    if (sport === 15) return <MdGolfCourse size={size} />;
    if (sport === 11) return <GiBoatFishing size={size} />;
    if (sport === 7) return <GiTennisRacket size={size} />;
    if (sport === 10) return <GiMountainRoad size={size} />;
    if (sport === 12) return <GiBowlingStrike size={size} />;
    if (sport === 13) return <FaTableTennis size={size} />;
    if (sport === 14) return <FaVolleyballBall size={size} />;
    if (sport === 2) return <FaRunning size={size} />;
    if (sport === 6) return <FaSwimmer size={size} />;
    if (sport === 18) return <MdSurfing size={size} />;
    if (sport === 17) return <MdOutlineScubaDiving size={size} />;
    if (sport === 16) return <MdOutlineSkateboarding size={size} />;
    if (sport === 19) return <RiBilliardsFill size={size} />;
    if (sport === 20) return <GrGamepad size={size} />;
    if (sport === 21) return <GrYoga size={size} />;
    if (sport === 22) return <GiHockey size={size} />;
    if (sport === 23) return <GiArcheryTarget size={size} />;
    if (sport === 24) return <GiBoxingGlove size={size} />;
  };
  
 const convertedSports = selectedSports.map(sport => parseInt(sport));
 //console.log(convertedSports)

  return (
    <div css={container}>
      <Sidebar />
      <header css={headerContainer}>
        <h1 css={title}>
          <div css={logoStyle}></div>
        </h1>
      </header>
      <main css={mainContainer}>
        <div css={userContainer}>
          <div css={imageBox} onClick={profileImgChangeHandle}>
            {profileImgURL ? (
              <img css={imagePreview} src={profileImgURL} alt="" />
            ) : (
              <span>이미지를 업로드해주세요</span>
            )}
          </div>
          <input 
            type="file" 
            ref={fileRef} 
            style={{ display: 'none' }} 
            onChange={profileImgFileChangeHandle} 
          />
          <div css={userInfo}>
            <h1 css={subTitle}>유저정보 </h1>
            <div css={userDetail}>
              <span css={spanStyle}>닉네임 : {nickname}</span>
              <button css={changeButton} onClick={closeNicknameChangeModal}>변경</button>
            </div>
            <div css={userDetail}>
              <span css={spanStyle}>비밀번호 : {maskedPassword}</span>
              <button css={changeButton} onClick={closePwChangeModal}>변경</button>
            </div>
            <div css={userDetail}>
              <span css={spanStyle}>주소 : {address}</span>
              <button css={changeButton} onClick={closeAddressChangeModal}>변경</button>
            </div>
            <div css={userDetail}>
              <span css={spanStyle}>획득 점수 : {point}</span> 
            </div>
          </div>
        </div>
        <div css={detailContainer}>
          <h1 css={dcTitle}>선호 운동</h1>
          <div css={circleContainer}>
            {selectedSports.concat(new Array(3 - selectedSports.length).fill(null)).map((sport, index) => (
              <div key={index} css={circle} data-index={index} onClick={handleCircleClick}>
                {sport !== null && (
                  <div css={minusButton} onClick={(e) => handleMinusClick(e, index)}>－</div>
                )}
                {sport !== null ? renderSportIcon(sport ,80) : null}
                {(!sport && (!!selectedSports[index - 1] || index === 0)) && (
                  <div css={plusButton}>+</div>
                )}
              </div>
            ))}
          </div>
          <button css={modifyButton} onClick={handleModifyClick}>수정</button>
          <div css={emojiContainer}>
            <span css={emoji}>👈🏻</span> 
            <span css={spanLocation}>수정 버튼을 눌러서 등록해주세요.</span>
          </div>
        </div>
      </main>
      {isAddressChangeModalOpen && <AddressChangeModal closeModal={closeAddressChangeModal} updateAddress={updateAddress} />}
      {isNicknameChangeModalOpen && <NicknameChangeModal closeModal={closeNicknameChangeModal} updateNickname={updateNickname} />}
      {isPwChangeModalOpen && <PwChangeModal closeModal ={closePwChangeModal} updatePassword={updatePassword} />}
      {isSportsIconModalOpen && <SportsIconModal selectedSports={selectedSports} closeModal={closeSportsIconModal} handleSportIconSelect={handleSportIconSelect} selectedIndex={selectedIndex} setSelectedSports={setSelectedSports} plusVisible={plusVisible} setPlusVisible={setPlusVisible} />}
    </div>
  );
  
};

export default UserInfo;
