/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import ModalsIcon from './ModalsIcon';



const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  max-height: 280px;
  overflow-y: auto;
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



const SportsIconModal = ({
  closeModal,
  selectedIndex,
  setSelectedSports,
  plusVisible,
  setPlusVisible,
}) => {
  const [selectedSport, setSelectedSport] = useState(null);
 
  

  const handleSportSelect = (e) => {
    const selectedSport = e.currentTarget.getAttribute('data-sport');
    setSelectedSport(selectedSport);
  };

  const handleConfirm = () => {
    //console.log(selectedSport);
    if (selectedSport !== null) {
      setSelectedSports((prevSports) => {
        const newSports = [...prevSports];
        newSports[selectedIndex] = selectedSport;
        return newSports;
      });
      setPlusVisible((preVisible) => {
        const newVisible = [...preVisible];
        newVisible[selectedIndex] = false;
        return newVisible;
      });
      closeModal();
    }
  };

  const sportsIconActive = (sport) => {
    return selectedSport === sport
      ? css`
          ${sportsIcon};
          background-color: rgba(0, 255, 0, 0.2);
          border-radius: 0;
        `
      : sportsIcon;
  };

 

  return (
    <div css={modalOverlay}>
      <div css={modalContent}>
        <h2 css={modalTitle}>선호 운동 선택</h2>
        <div css={sportsIconsContainer}>
          <ModalsIcon
            handleSportSelect={handleSportSelect}
            sportsIconActive={sportsIconActive}
          />
        </div>
        <div css={modalButtonContainer}>
          <button onClick={handleConfirm} css={modalCancelButton}>
            확인
          </button>
          <button onClick={closeModal} css={modalConfirmButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportsIconModal;