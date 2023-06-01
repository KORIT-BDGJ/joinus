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

const sportsIcon = (isSelected, isLiked) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    background-color: ${isSelected ? "#5EC75E" : "white"};
    border: ${isLiked ? "2px solid #00B894" : "none"};


    &:hover {
        background-color: ${isSelected ? "#5EC75E" : "#63cc63"};
    }

    &:active {
        background-color: #5EC75E;
    
    }
`;


const starIcon = css`
    position: absolute;
    top: -8px;
    right: -12px;
    font-size: 15px;  // adjust size as needed
    color: #FFD700;  // adjust color as needed
`;

const IconsModal = ({ onIconClick, selectedIcon, setSelectedIcon, sportsLikes, userId }) => {

    const sportsIcons = [
        {id: 1, title: "헬스", icon: <CgGym size={32} /> },
        {id: 2, title: "러닝", icon: <FaRunning size={32} /> },
        {id: 3, title: "축구", icon: <GiSoccerKick size={32} /> },
        {id: 4, title: "야구", icon: <GiBaseballBat size={32} /> },
        {id: 5, title: "농구", icon: <GiBasketballBasket size={32} /> },
        {id: 6, title: "수영", icon: <FaSwimmer size={32} /> },
        {id: 7, title: "테니스", icon: <GiTennisRacket size={32} /> },
        {id: 8, title: "클라이밍", icon: <GiMountainClimbing size={32} /> },
        {id: 9, title: "자전거", icon: <IoMdBicycle size={32} /> },
        {id: 10, title: "등산", icon: <GiMountainRoad size={32} /> },
        {id: 11, title: "낚시", icon: <GiBoatFishing size={32} /> },
        {id: 12, title: "볼링", icon: <GiBowlingStrike size={32} /> },
        {id: 13, title: "탁구", icon: <FaTableTennis size={32} /> },
        {id: 14, title: "배구", icon: <FaVolleyballBall size={32} /> },
        {id: 15, title: "골프", icon: <MdGolfCourse size={32} /> },
        {id: 16, title: "스케이트보드", icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, title: "스쿠버다이빙", icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, title: "서핑", icon: <MdSurfing size={32} /> },
        {id: 19, title: "당구", icon: <RiBilliardsFill size={32} /> },
        {id: 20, title: "게임", icon: <GrGamepad size={32} /> }
    ]

    const isIconSelected = (iconId) => {
        return sportsLikes.some(item => item.userId === userId && item.sportsIds.includes(iconId));
    }




    const handleIconClick = (icon) => {
        setSelectedIcon(icon.id);
        onIconClick(icon);
    }

    return (
        <>
            {sportsIcons.map((icon) => {
                const isSelected = selectedIcon === icon.id;
                const isLiked = isIconSelected(icon.id);
                return (
                    <div
                    key={icon.id}
                    css={sportsIcon(isSelected, isLiked)}
                    onClick={() => handleIconClick(icon)}
                    title={icon.title}
                    style={{ position: 'relative' }}  // add this line
                    >
                        {icon.icon}
                        {isLiked && <div css={starIcon}>⭐</div>}
                    </div>
                )
            })}
        </>
    );
};

export default IconsModal;