/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { GiBaseballBat, GiBasketballBasket, GiSoccerKick } from 'react-icons/gi';



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





const SportsIconModal = ({ closeModal }) => {

    const [selectedSport, setSelectedSport] = useState(null);


    const handleSportSelect = (e) => {
        const selectedSport = e.target.getAttribute('data-sport');
        setSelectedSport(selectedSport);
    };

    const handleConfirm = () => {
        console.log(selectedSport);
        if(selectedSport !== null) { 
            alert(`Selected sport: ${selectedSport}`);
            closeModal();
        }else{
            alert('Please select a sport');
        }
    };

    const handleCancel = () => {
        closeModal();
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
                />
                <GiBaseballBat
                data-sport="baseball"
                onClick={handleSportSelect}
                css={sportsIconActive('baseball')}
                />
                <GiBasketballBasket
                data-sport="basketball"
                onClick={handleSportSelect}
                css={sportsIconActive('basketball')}
                />
            </div>
            <div css={modalButtonContainer}>
                <button onClick={handleCancel} css={modalCancelButton}>취소</button>
                <button onClick={handleConfirm} css={modalConfirmButton}>확인</button>
            </div>
        </div>
    </div>
    );
};

export default SportsIconModal;