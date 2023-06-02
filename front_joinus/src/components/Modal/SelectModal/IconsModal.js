/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike, GiHockey, GiArcheryTarget, GiBoxingGlove } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing, MdOutlineListAlt } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad, GrYoga } from 'react-icons/gr';

const sportsIcon = (isSelected, isLiked) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    background-color: ${isSelected ? "rgba(0, 255, 0, 0.2);" : "white"};
    border: 2px solid ${isLiked ? "green" : "transparent"};

    &:hover {
        background-color: ${isSelected ? "#5EC75E" : "#63cc63"};
    }

    &:active {
        background-color: rgba(0, 255, 0, 0.2);
    
    }
`;


const starIcon = css`
    position: absolute;
    top: -8px;
    right: -12px;
    font-size: 15px;  // adjust size as needed
    color: #FFD700;  // adjust color as needed
`;


const iconTitle = css`
    margin-top: 10px;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
`;

const IconsModal = ({ onIconClick, selectedIcon, setSelectedIcon, sportsLikes, userId, hiddenIcons }) => {

    const sportsIcons = [
        {id: 0, title: "전체", icon: <MdOutlineListAlt size={32} /> },
        {id: 99, title: "선호운동", icon: "⭐" },
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
        {id: 16, title: "스케이트", icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, title: "스쿠버", icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, title: "서핑", icon: <MdSurfing size={32} /> },
        {id: 19, title: "당구", icon: <RiBilliardsFill size={32} /> },
        {id: 20, title: "게임", icon: <GrGamepad size={32} /> },
        {id: 21, title: "요가", icon: <GrYoga size={32} />},
        {id: 22, title: "하키", icon: <GiHockey size={32} />},
        {id: 23, title: "복싱", icon: <GiBoxingGlove size={32} />}
    ]

    const filteredSportsIcons = sportsIcons.filter(icon => icon.id !== 0 && icon.id !== 99);

    const isIconSelected = (iconId) => {
        return sportsLikes?.some(item => item.userId === userId && item.sportsIds.includes(iconId)) || false;
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
                const isHidden = hiddenIcons && hiddenIcons.includes(icon.id); // 아이콘을 숨기는지 여부 체크

                if (isHidden) {
                    return null; // 아이콘이 숨겨진 경우 렌더링하지 않음
                }

                return (
                    <div
                    key={icon.id}
                    css={sportsIcon(isSelected, isLiked)}
                    onClick={() => handleIconClick(icon)}

                    style={{ position: 'relative' }}  // add this line
                    >
                        {icon.icon}
                        {isLiked && <div css={starIcon}>⭐</div>}
                        <span css={iconTitle}>{icon.title}</span>
                    </div>
                )
            })}
        </>
    );
};

export default IconsModal;