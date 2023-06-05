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
    border-bottom: 1px solid #eee;
    width: 400px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    background-color: #C8E8E5;

    &::placeholder {
        text-align: center;
        color: black;
        font-size: 25px;
    }

    &:focus {
        outline: none;
        border-bottom: 1px solid #999;
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

export const selectStyles = css`
    width: 130px;
    height: 40px;
    background-color: #C8E8E5;
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
    height: 40px;
`;

export const selectUserStatus = css`
    border-radius: 7px;
    width: 180px;
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
`;

export const postSelectDate = css`
    border-radius: 5px;
    width: 200px;
    height: 40px;
    cursor: pointer;
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
    border: 1px solid #999;
    border-radius: 70%;
    width: 50px;
    text-align: end;
    pointer-events: none;
`;

export const countButtons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #999;
    border-radius: 50%;
    background-color: #C8E8E5;
    margin: 0px 5px;
    width: 40px;
    height: 40px;
    font-size: 18px;
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
    width: 35px;
    height: 35px;
    cursor: pointer;
`;

export const postWriteInput = css`
    border: none;
    border-radius: 7px;
    width: 400px;
    height: 60px;
    resize: none;
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
    border-radius: 20px;
    margin-right: 50px;
    width: 150px;
    height: 45px;
    font-size: 18px;
    background-color: #C8E8E5;
    cursor: pointer;

    &:hover {
        font-weight: 600;
    }
`;

export const cancelButton = css`
    border: none;
    border-radius: 20px;
    margin-left: 40px;
    width: 150px;
    height: 45px;
    font-size: 18px;
    background-color: #C8E8E5;
    cursor: pointer;

    &:hover {
        font-weight: 600;
    }
`;