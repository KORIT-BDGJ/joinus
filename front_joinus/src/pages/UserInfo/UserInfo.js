/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import PwChangeModal from '../../components/Modal/PwChangeModal';
import SportsIconModal from '../../components/Modal/SportsIconModal';
import NicknameChangeModal from '../../components/Modal/NicknameChangeModal';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiBowlingStrike, GiMountainClimbing, GiMountainRoad, GiSoccerKick, GiTennisRacket } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AddressChangeModal from '../../components/Modal/AddressChangeModal';
import { MdGolfCourse, MdOutlineScubaDiving, MdOutlineSkateboarding, MdSurfing } from 'react-icons/md';
import { FaRunning, FaSwimmer, FaTableTennis, FaVolleyballBall } from 'react-icons/fa';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';

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
  width: 320px;
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
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
  overflow-wrap: break-word;
  padding: 10px;
`;

const changeButton = css`
  background-color: #2ecc71;
  color: white;
  margin-left: auto;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
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
  height: 350px;
  border: 1px solid #333;
  border-radius: 10px;
`;

const footerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modifyButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px ;
  border: 1px solid #dbdbdb;
  border-radius: 7px;
  width: 200PX;
  height: 50px;
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
  margin: 20px 0;
`;


const circle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #333;
`;

const plusButton = css`
  font-size: 25px;
  font-weight: 600;
  color: #00B894;
  cursor: pointer;
`;




const UserInfo = () => {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isNicknameChangeModalOpen, setIsNicknameChangeModalOpen] = useState(false);
  const [isPwChangeModalOpen, setIsPwChangeModalOpen] = useState(false);
  const [isAddressChangeModalOpen, setIsAddressChangeModalOpen] = useState(false);
  const [isSportsIconModalOpen, setIsSportsIconModalOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState(Array(3).fill(null));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [plusVisible, setPlusVisible] = useState([true, true, true]);
  const [nickname, setNickname] = useState('헬창남');
  const [password , setPassword] = useState("1q2w3e4r5t");
  const [address, setAddress] = useState("부산시 동래구 @@동");

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

  const onChangeHandle = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onClickHandle = () => {
    fileInput.current.click();
  };


  const handleCircleClick = (e) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"));
    setIsSportsIconModalOpen(true);
    setSelectedIndex(index);
  };

  const handleModifyClick = () => {
    navigate('/main');
  };

  const updatePassword = (newPw) => {
    setPassword(newPw);
  };

  const updateNickname = (newNickname) => {
    setNickname(newNickname);
  };
  
  const updateAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const renderSportIcon = (sport, size) => {
    // 운동 아이콘 추가 시 확장 
    if (sport === "soccer") return <GiSoccerKick size={size} />;
    if (sport === "baseball") return <GiBaseballBat size={size} />;
    if (sport === "basketball") return <GiBasketballBasket size={size} />;
    if (sport === "health") return <CgGym size={size} />;
    if (sport === "climbing") return <GiMountainClimbing size={size} />;
    if (sport === "riding") return <IoMdBicycle size={size} />;
    if (sport === "golf") return <MdGolfCourse size={size} />;
    if (sport === "fishing") return <GiBoatFishing size={size} />;
    if (sport === "tennis") return <GiTennisRacket size={size} />;
    if (sport === "mountain") return <GiMountainRoad size={size} />;
    if (sport === "bowling") return <GiBowlingStrike size={size} />;
    if (sport === "tabletennis") return <FaTableTennis size={size} />;
    if (sport === "volleyball") return <FaVolleyballBall size={size} />;
    if (sport === "running") return <FaRunning size={size} />;
    if (sport === "swimming") return <FaSwimmer size={size} />;
    if (sport === "surfing") return <MdSurfing size={size} />;
    if (sport === "scubadiving") return <MdOutlineScubaDiving size={size} />;
    if (sport === "skateboarding") return <MdOutlineSkateboarding size={size} />;
    if (sport === "billiard") return <RiBilliardsFill size={size} />;
    if (sport === "game") return <GrGamepad size={size} />;
  };

  return (
    <div css={container}>
        <header css={headerContainer}>
            <h1 css={title}>
              <div css={logoStyle}>

              </div>
            </h1>
        </header>
        <main css={mainContainer}>
            <div css={userContainer}>
                <div css={imageBox} onClick={onClickHandle}>
                
                {previewUrl ? (
                    <img css={imagePreview} src={previewUrl} alt="profile" />
                ) : (
                    <span>이미지를 업로드해주세요</span>
                )}
                </div>
                
                <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={onChangeHandle} />
                <div css={userInfo}>
                    
                  <h1 css={subTitle}>유저정보 </h1>
                  
                  <div css={userDetail}>
                    닉네임 : {nickname}
                    <button css={changeButton} onClick={closeNicknameChangeModal}>변경</button>
                  </div>
                  <div css={userDetail}>
                    비밀번호 : {password}
                    <button css={changeButton} onClick={closePwChangeModal}>변경</button>
                  </div>
                  <div css={userDetail}>
                    주소 : {address}
                    <button css={changeButton} onClick={closeAddressChangeModal}>변경</button>
                  </div>
                  <div css={userDetail}>
                    획득 메달 : 🥇
                  </div>
                </div>
            </div>
            <div css={detailContainer}>
              <h1 css={dcTitle}>선호 운동</h1>
              <div css={circleContainer}>
                <div css={circle} data-index={0} onClick={handleCircleClick}>
                  {renderSportIcon(selectedSports[0] ,30)}
                  {plusVisible[0] && <div css={plusButton}>+</div>}
                </div>
                <div css={circle} data-index={1} onClick={handleCircleClick}>
                  {renderSportIcon(selectedSports[1], 30)}
                  {plusVisible[1] && <div css={plusButton}>+</div>}
                </div>
                <div css={circle} data-index={2} onClick={handleCircleClick}>
                  {renderSportIcon(selectedSports[2], 30)}
                  {plusVisible[2] && <div css={plusButton}>+</div>}
                </div>
              </div>
            </div>
        </main>
        <footer>
          <div css={footerContainer}>
            <button css={modifyButton} onClick={handleModifyClick}>수정</button>
          </div>
        </footer>
        {isAddressChangeModalOpen && <AddressChangeModal closeModal={closeAddressChangeModal} updateAddress={updateAddress} />}
        {isNicknameChangeModalOpen && <NicknameChangeModal closeModal={closeNicknameChangeModal} updateNickname={updateNickname} />}
        {isPwChangeModalOpen && <PwChangeModal closeModal ={closePwChangeModal} updatePassword={updatePassword} />}
        {isSportsIconModalOpen && <SportsIconModal closeModal ={closeSportsIconModal} selectedIndex={selectedIndex} setSelectedSports={setSelectedSports} plusVisible={plusVisible}
    setPlusVisible={setPlusVisible} />}
    </div>
  );
};

export default UserInfo;
