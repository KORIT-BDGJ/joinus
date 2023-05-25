
import React from 'react';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';

import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';







const ModalsIcon = ({ sportsIconActive, handleSportSelect}) => {

   
    return (
        <>
           <GiSoccerKick
                data-sport="3"
                onClick={handleSportSelect}
                css={sportsIconActive('3')}
                title="축구"
            />
            <GiBaseballBat
                data-sport="4"
                onClick={handleSportSelect}
                css={sportsIconActive('4')}
                title="야구"
            />
            <GiBasketballBasket
                data-sport="5"
                onClick={handleSportSelect}
                css={sportsIconActive('5')}
                title="농구"
            />

            <CgGym
                data-sport="1"
                onClick= {handleSportSelect}
                css={sportsIconActive('1')}
                title="헬스"
            />

            <GiMountainClimbing
                data-sport="8"
                onClick= {handleSportSelect}
                css={sportsIconActive('8')}
                title="클라이밍"
            />

            <IoMdBicycle 
                data-sport="9"
                onClick= {handleSportSelect}
                css={sportsIconActive('9')}
                title="라이딩"
            />

            <MdGolfCourse 
                data-sport="15"
                onClick= {handleSportSelect}
                css={sportsIconActive('15')}
                title="골프"
            />

            <GiBoatFishing 
                data-sport="11"
                onClick= {handleSportSelect}
                css={sportsIconActive('11')}
                title="낚시"
            />

            <GiTennisRacket 
                data-sport="7"
                onClick= {handleSportSelect}
                css={sportsIconActive('7')}
                title="테니스"
            />

            <GiMountainRoad 
                data-sport="10"
                onClick= {handleSportSelect}
                css={sportsIconActive('10')}
                title="등산"
            />

            <GiBowlingStrike 
                data-sport="12"
                onClick= {handleSportSelect}
                css={sportsIconActive('12')}
                title="볼링"
            />

            <FaTableTennis 
                data-sport="13"
                onClick= {handleSportSelect}
                css={sportsIconActive('13')}
                title="탁구"
            />

            <FaVolleyballBall 
                data-sport="14"
                onClick= {handleSportSelect}
                css={sportsIconActive('14')}
                title="배구"
            />

            <FaRunning 
                data-sport="2"
                onClick= {handleSportSelect}
                css={sportsIconActive('2')}
                title="러닝"
            />

            <FaSwimmer 
                data-sport="6"
                onClick= {handleSportSelect}
                css={sportsIconActive('6')}
                title="수영"
            />

            <MdSurfing 
                data-sport="18"
                onClick= {handleSportSelect}
                css={sportsIconActive('18')}
                title="서핑"
            />

            <MdOutlineScubaDiving 
                data-sport="17"
                onClick= {handleSportSelect}
                css={sportsIconActive('17')}
                title="스쿠버다이빙"
            />

            <MdOutlineSkateboarding 
                data-sport="16"
                onClick= {handleSportSelect}
                css={sportsIconActive('16')}
                title="스케이트보드"
            />

            <RiBilliardsFill
                data-sport="19"
                onClick= {handleSportSelect}
                css={sportsIconActive('19')}
                title="당구"
            />

            <GrGamepad 
                data-sport="20"
                onClick= {handleSportSelect}
                css={sportsIconActive('20')}
                title="game"
            />
        </>
    );
};

export default ModalsIcon;