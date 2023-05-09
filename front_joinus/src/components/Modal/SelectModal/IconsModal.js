/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { GiSoccerBall } from 'react-icons/gi';
import { GiBaseballGlove } from 'react-icons/gi';

const iconContainer = css`
    display: flex;
    justify-content: center;
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

const IconsModal = () => {
    return (
        <div css={iconContainer}>
            <GiSoccerBall css={sportsIcon} />
            <GiBaseballGlove css={sportsIcon} />
            <GiBaseballGlove css={sportsIcon} />
            <GiBaseballGlove css={sportsIcon} />
        </div>
    );
};

export default IconsModal;