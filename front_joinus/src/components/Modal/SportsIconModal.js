/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { GiBaseballBat, GiBasketballBasket, GiMountainClimbing, GiSoccerKick } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';


const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

`;

const modalContent = css`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
`;

const modalTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const sportsIconsContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const sportsIcon = css`
  font-size: 50px;
  margin: 10px;
  cursor: pointer;
  padding: 10px;

    &:hover {
    background-color: rgba(0, 255, 0, 0.2);
    }
  
    &:active {
    border: 2px solid green;
    
    }
`;

const modalButtonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const modalConfirmButton = css`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 10px;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;

const modalCancelButton = css`
  
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 10px;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;



const SportsIconModal = ({ closeModal, selectedIndex, setSelectedSports }) => {
  const [selectedSport, setSelectedSport] = useState(null);
  //const selectedSport = selectedSports[selectedIndex];

  const handleSportSelect = (e) => {
    const selectedSport = e.currentTarget.getAttribute('data-sport');
    setSelectedSport(selectedSport);
  };

  const handleConfirm = () => {
    console.log(selectedSport);
    if (selectedSport !== null) {
      setSelectedSports(prevSports => {
        const newSports = [...prevSports];
        newSports[selectedIndex] = selectedSport;
        return newSports;
      });
      alert(`선택 운동 : ${selectedSport}`);
      closeModal();
    } else {
      alert("선호 운동을 선택하세요.");
    }
  };

  

  const sportsIconActive = (sport) => {
    return selectedSport === sport ? css`
      ${sportsIcon};
      background-color: rgba(0, 255, 0, 0.2);
      border-radius: 0;
      ` : sportsIcon; 
  };
    
    

  return (
    <div css={modalOverlay}>
      <div css={modalContent}>
          <h2 css={modalTitle}>선호 운동 선택</h2>
          <div css={sportsIconsContainer}>
              
              <GiSoccerKick
              data-sport="soccer"
              onClick={handleSportSelect}
              css={sportsIconActive('soccer')}
              title="축구"
              />
              <GiBaseballBat
              data-sport="baseball"
              onClick={handleSportSelect}
              css={sportsIconActive('baseball')}
              title="야구"
              />
              <GiBasketballBasket
              data-sport="basketball"
              onClick={handleSportSelect}
              css={sportsIconActive('basketball')}
              title="농구"
              />

              <CgGym
              data-sport="health"
              onClick= {handleSportSelect}
              css={sportsIconActive('health')}
              title="헬스"
              />

              <GiMountainClimbing
              data-sport="climbing"
              onClick= {handleSportSelect}
              css={sportsIconActive('climbing')}
              title="클라이밍"
              />

              <IoMdBicycle 
              data-sport="riding"
              onClick= {handleSportSelect}
              css={sportsIconActive('riding')}
              title="라이딩"
              />


          </div>
          <div css={modalButtonContainer}>
              <button onClick={closeModal} css={modalCancelButton}>취소</button>
              <button onClick={handleConfirm} css={modalConfirmButton}>확인</button>
          </div>
      </div>
  </div>
  );
};

export default SportsIconModal;