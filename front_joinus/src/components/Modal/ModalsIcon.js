
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike, GiHockey, GiArcheryTarget, GiBoxingGlove } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';
import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad, GrYoga } from 'react-icons/gr';

const iconTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
`;


const ModalsIcon = ({ sportsIconActive, handleSportSelect, selectedSports}) => {
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
        {id: 16, title: "스케이트", icon: <MdOutlineSkateboarding size={32} /> },
        {id: 17, title: "스쿠버", icon: <MdOutlineScubaDiving size={32} /> },
        {id: 18, title: "서핑", icon: <MdSurfing size={32} /> },
        {id: 19, title: "당구", icon: <RiBilliardsFill size={32} /> },
        {id: 20, title: "게임", icon: <GrGamepad size={32} /> },
        {id: 21, title: "요가", icon: <GrYoga size={32} />},
        {id: 22, title: "하키", icon: <GiHockey size={32} />},
        {id: 23, title: "복싱", icon: <GiBoxingGlove size={32} />}
    ]
   
    return (
        <>
            {sportsIcons.filter(icon => !selectedSports.includes(icon.id)).map((icon) => (
                <div
                    key={icon.id}
                    data-sport={icon.id}
                    css={sportsIconActive(icon.id)}
                    onClick={handleSportSelect}
                >
                    {icon.icon}
                    <span css={iconTitle}>{icon.title}</span>
                </div>
            ))}
        </>
    );
};

export default ModalsIcon;