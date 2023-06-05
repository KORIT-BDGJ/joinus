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
  font-size: 30px;
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
  overflow-x: hidden;
  overflow-y: auto;
`;
const sportsIcon = css`
  
  margin: 10px;
  cursor: pointer;
  padding: 10px;
  border: 2px solid transparent;
  width: 50px;  // or other appropriate value
  height: 50px; // or other appropriate value

    &:hover {
    background-color: #93b0ad;
    }
  
    &:active {
    border: 2px solid #93b0ad;
    
    }
`;


const modalButtonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const modalConfirmButton = css`
  background-color: #C8E8E5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #555;
  }
`;

const modalCancelButton = css`
  
  background-color: #C8E8E5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #555;
  }
`;



const SportsIconModal = ({
  selectedSports,
  closeModal,
  selectedIndex,
  setSelectedSports,
  plusVisible,
  setPlusVisible,
  iconTitle,
}) => {
  const [selectedSport, setSelectedSport] = useState(null);

  const handleSportSelect = (e) => {
    const selectedSport = e.currentTarget.getAttribute('data-sport');
    setSelectedSport(parseInt(selectedSport));
  };

  const handleConfirm = () => {
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
          background-color: #93b0ad;
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
            selectedSports={selectedSports}
          />
        </div>
        <div css={modalButtonContainer}>
          <button onClick={handleConfirm} css={modalConfirmButton}>
            확인
          </button>
          <button onClick={closeModal} css={modalCancelButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportsIconModal;