/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';


const sportsIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    margin: 10px;
    padding: 10px;

    &:hover {
    background-color: rgba(0, 255, 0, 0.2);
    }
  
    &:active {
    border: 2px solid green;
    
    }
`;

const IconsModal = ({ onIconClick }) => {
    return (
        <>
            <GiSoccerKick css={sportsIcon} 
                onClick={() => onIconClick(GiSoccerKick)}/>
            <GiBaseballBat css={sportsIcon} 
                onClick={() => onIconClick(GiBaseballBat)} />
            <GiBasketballBasket css={sportsIcon} 
                onClick={() => onIconClick(GiBasketballBasket)} />
            <GiBoatFishing css={sportsIcon} 
                onClick={() => onIconClick(GiBoatFishing)} />
            <GiMountainClimbing css={sportsIcon} 
                onClick={() => onIconClick(GiMountainClimbing)} />
            <GiBowlingStrike css={sportsIcon} 
                onClick={() => onIconClick(GiBowlingStrike)} />
            <GiTennisRacket css={sportsIcon} 
                onClick={() => onIconClick(GiTennisRacket)} />
            <GiMountainRoad css={sportsIcon} 
                onClick={() => onIconClick(GiMountainRoad)} />
            <FaTableTennis css={sportsIcon} 
                onClick={() => onIconClick(FaTableTennis)} />
            <FaVolleyballBall css={sportsIcon} 
                onClick={() => onIconClick(FaVolleyballBall)} />
            <FaRunning css={sportsIcon} 
                onClick={() => onIconClick(FaRunning)} />
            <FaSwimmer css={sportsIcon} 
                onClick={() => onIconClick(FaSwimmer)} />
            <CgGym css={sportsIcon} 
                onClick={() => onIconClick(CgGym)} />
            <IoMdBicycle css={sportsIcon} 
                onClick={() => onIconClick(IoMdBicycle)} />
            <MdGolfCourse css={sportsIcon} 
                onClick={() => onIconClick(MdGolfCourse)} />
            <MdOutlineSkateboarding css={sportsIcon} 
                onClick={() => onIconClick(MdOutlineSkateboarding)} />
            <MdOutlineScubaDiving css={sportsIcon} 
                onClick={() => onIconClick(MdOutlineScubaDiving)} />
            <MdSurfing css={sportsIcon} 
                onClick={() => onIconClick(MdSurfing)} />
            <RiBilliardsFill css={sportsIcon} 
                onClick={() => onIconClick(RiBilliardsFill)} />
            <GrGamepad css={sportsIcon} 
                onClick={() => onIconClick(GrGamepad)} />
        </>
    );
};

export default IconsModal;