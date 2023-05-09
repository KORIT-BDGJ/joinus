/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { GiBaseballBat, GiBasketballBasket, GiBoatFishing, GiMountainClimbing, GiSoccerKick, GiTennisRacket, GiMountainRoad, GiBowlingStrike } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { IoMdBicycle } from 'react-icons/io';

import { FaTableTennis, FaVolleyballBall, FaRunning, FaSwimmer } from 'react-icons/fa';
import { MdGolfCourse, MDSurfing, MdOutlineSkateboarding, MdOutlineScubaDiving, MdSurfing } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { GrGamepad } from 'react-icons/gr';







const ModalsIcon = ({ sportsIconActive, handleSportSelect}) => {

   
    return (
        <div>
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

            <MdGolfCourse 
            data-sport="golf"
            onClick= {handleSportSelect}
            css={sportsIconActive('golf')}
            title="골프"
            
            
            />
            <GiBoatFishing 
            data-sport="fishing"
            onClick= {handleSportSelect}
            css={sportsIconActive('fishing')}
            title="낚시"
            
            />
            <GiTennisRacket 
            data-sport="tennis"
            onClick= {handleSportSelect}
            css={sportsIconActive('tennis')}
            title="테니스"
            
            />
            <GiMountainRoad 
            data-sport="mountain"
            onClick= {handleSportSelect}
            css={sportsIconActive('mountain')}
            title="등산"
            
            />
            <GiBowlingStrike 
            data-sport="bowling"
            onClick= {handleSportSelect}
            css={sportsIconActive('bowling')}
            title="볼링"
            
            />
            <FaTableTennis 
            data-sport="tabletennis"
            onClick= {handleSportSelect}
            css={sportsIconActive('tabletennis')}
            title="탁구"
            
            />
            <FaVolleyballBall 
            data-sport="volleyball"
            onClick= {handleSportSelect}
            css={sportsIconActive('volleyball')}
            title="라이딩"
            
            />
            <FaRunning 
            data-sport="running"
            onClick= {handleSportSelect}
            css={sportsIconActive('running')}
            title="러닝"
            
            />
            <FaSwimmer 
            data-sport="swimming"
            onClick= {handleSportSelect}
            css={sportsIconActive('swimming')}
            title="수영"
            
            />
            <MdSurfing 
            data-sport="surfing"
            onClick= {handleSportSelect}
            css={sportsIconActive('surfing')}
            title="서핑"
            
            />
            <MdOutlineScubaDiving 
            data-sport="scubadiving"
            onClick= {handleSportSelect}
            css={sportsIconActive('scubadiving')}
            title="스쿠버다이빙"
            
            />
            <MdOutlineSkateboarding 
            data-sport="skateboarding"
            onClick= {handleSportSelect}
            css={sportsIconActive('skateboarding')}
            title="스케이트보드"
            
            />
            <RiBilliardsFill
            data-sport="billiard"
            onClick= {handleSportSelect}
            css={sportsIconActive('billiard')}
            title="당구"
            
            />
            <GrGamepad 
            data-sport="game"
            onClick= {handleSportSelect}
            css={sportsIconActive('game')}
            title="게임"
            
            /> 
        </div>
    );
};

export default ModalsIcon;