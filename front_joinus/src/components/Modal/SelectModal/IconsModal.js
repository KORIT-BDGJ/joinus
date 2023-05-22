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

const iconContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    margin: 5px;
    padding: 10px;
    background-color: rgba(0, 255, 0, 0.2);
`;

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

    const sportsIcons = [
        {id: 1, name: 'gym', icon: <CgGym size={32} /> },
        {id: 2, name: 'running', icon: <FaRunning size={32} /> },
        {id: 3, name: 'soccer', icon: <GiSoccerKick size={32} /> },
        {id: 4, name: 'baseball', icon: <GiBaseballBat size={32} /> },
        {id: 5, name: 'basketball', icon: <GiBasketballBasket size={32} /> },
        {id: 6, name: 'swimmer', icon: <FaSwimmer size={32} /> },
        {id: 7, name: 'tennis', icon: <GiTennisRacket size={32} /> },
        {id: 8, name: 'climmer', icon: <GiMountainClimbing size={32} /> },
        {id: 9, name: 'cycle', icon: <IoMdBicycle size={32} /> },
        {id: 10, name: 'mountainroad', icon: <GiMountainRoad size={32} /> },
        {id: 11, name: 'fishing', icon: <GiBoatFishing size={32} /> },
        {id: 12, name: 'bowling', icon: <GiBowlingStrike size={32} /> },
        {id: 13, name: 'tabletennis', icon: <FaTableTennis size={32} /> },
        {id: 14, name: 'volleyball', icon: <FaVolleyballBall size={32} /> },
        {id: 15, name: 'golf', icon: <MdGolfCourse size={32} /> },
        {id: 16, name: 'skateboarding', icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, name: 'scubadiving', icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, name: 'surfing', icon: <MdSurfing size={32} /> },
        {id: 19, name: 'billiards', icon: <RiBilliardsFill size={32} /> },
        {id: 20, name: 'game', icon: <GrGamepad size={32} /> }
    ]

    const handleIconClick = (icon) => {
        onIconClick(icon);

    }

    return (
        <>
            {sportsIcons.map((icon) => (
                <div
                    key={icon.id}
                    css={sportsIcon}
                    onClick={() => handleIconClick(icon)}
                >
                    {icon.icon}
                </div>
            ))}
            {/* <GiSoccerKick css={sportsIcon} 
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
                onClick={() => onIconClick(GrGamepad)} /> */}
        </>
    );
};

export default IconsModal;