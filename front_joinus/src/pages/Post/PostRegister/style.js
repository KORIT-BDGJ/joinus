import { css } from "@emotion/react";

export const mainContainer = css`
    padding: 0px 10px 10px 10px;
`;

export const logoStyle= css`
    width: 724px; 
    height: 125px;
    background-image: url('/images/title_4.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

export const logoTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    font-size: 48px;
    font-weight: 600;
`;

export const title = css`
    font-size: 35px;
    font-weight: 600;
`;

export const postInfo = css`
    border: none;
    border-radius: 10px;
    padding: 10px;
    height: 600px;
    background-color: #C8E8E5;
`;

export const postContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 5px;
    height: 80px;
`;

export const postTitleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
`;

export const postTitle = css`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    pointer-events: none;
`;

export const postInputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
`;

export const postInput = css`
    border: none;
    border-bottom: 3px solid #eee;
    width: 400px;
    height: 50px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    background-color: #C8E8E5;

    &::placeholder {
        text-align: center;
        color: #777;
        font-size: 25px;
    }

    &:focus {
        outline: none;
    }

    &:focus::placeholder {
        visibility: hidden;
    }
`;

export const postCategorysBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const sportIcon = css`
    width: 60px;
    height: 35px;
    cursor: pointer;
`;

export const selectLevelBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
`;

export const selectLevel = css`
    width: 130px;
    font-size: 23px;
    height: 40px;
`;

export const selectUserStatus = css`
    border-radius: 7px;
    width: 180px;
    font-size: 23px;
    height: 40px;
`;

export const postSelesctsBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
`;

export const selectCountry = css`
    width: 200px;
    height: 40px;
    font-size: 25px;
`;

export const postSelectDate = css`
    border: none;
    border-radius: 5px;
    width: 200px;
    height: 40px;
    cursor: pointer;

    &:focus{
        outline: none;
    }

    
`;

export const selectCount = css`
    display: flex;
    height: 40px;
`;

export const countBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
    border: none;
    border-radius: 50%;
    width: 50px;
    text-align: end;
    pointer-events: none;
    font-size: 25px;
    font-weight: bold;
`;

export const countButtons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    background-color: #C8E8E5;
    margin: 0px 5px;
    width: 40px;
    height: 40px;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
`;

export const buttonContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const buttonRadioBox = css`
    font-size: 35px;
`;

export const buttonRadio = css`
  width: 20px;
  height: 20px;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    width: 70%;
    height: 70%;
    border: none;
    border-radius: 50%;
    background-color: white; /* 흰색으로 변경 */
    box-sizing: border-box;
    margin: 15%;
  }

  &:checked::before {
    background-color: #333; /* 검정색으로 변경 */
  }

  &:checked {
    pointer-events: none; /* 다른 버튼을 클릭하지 못하도록 이벤트 비활성화 */
  }
`;

export const postWriteInput = css`
    border: none;
    border-radius: 7px;
    width: 400px;
    height: 60px;
    font-size: 25px;
    resize: none;

    &:focus{
        outline: none;
    }
`;

export const buttonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    height: 100px;
`;

export const modifyButton = css`
    border: none;
    border-radius: 10px;
    margin-right: 50px;
    width: 150px;
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    background-color: #C8E8E5;
    cursor: pointer;

    &:active {
        background-color: #A7DED9;
    }
`;

export const cancelButton = css`
    border: none;
    border-radius: 10px;
    margin-left: 40px;
    width: 150px;
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    background-color: #dbdbdb;
    cursor: pointer;

    &:active {
        background-color: #b5b5b5;
    }
`;