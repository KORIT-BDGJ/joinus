import { css } from "@emotion/react";


export const mainContainer = css`
    display: flex;
    flex-direction: column;
    padding: 0px 10px 10px 10px;
    height: 100%
`;

export const logoStyle= css`
    width: 724px; 
    height: 125px;
    background-image: url('/images/title_3.png');
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

export const header = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const inputBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
`;

export const selectSearch = css`
    display: flex;
    justify-content:center;
    align-items: flex-start;
    width: 19%;
    border-radius: 7px;
    font-size: 25px;
`;

export const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 10px;
    width: 60%;
    height: 100%;
    font-size: 25px;
`;

export const detailsSearchBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 19%;
    height: 100%;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
`;

export const expandedButtonsContainer = (expandedIsOpen) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    border: ${expandedIsOpen ? "none" : "none"};
    border-radius: 7px;
    padding: 0px 20px;
    width: 100%;
    height: ${expandedIsOpen ? "100px" : "0px"};
    ${expandedIsOpen ? "opacity: 1;" : "overflow: hidden;opacity: 0;"}
    
    transition: all 0.5s ease;
`;

export const expandedOptions = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
`;

export const buttonContents = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
`;

export const sportIcon = css`
    width: 45px;
    height: 35px;
    cursor: pointer;
`;

export const resetButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 50px;
    height: 50px;
    font-size: x-large;
    background-color: white;
    cursor: pointer;
`;

export const buttonTitles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;

export const buttonsBox = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    height: 70%;
`;


export const selectCountry = css`
    z-index: 1;
    width: 120px;
    height: 35px;
`;

export const listOrder = css`
    height: 20px;
    margin-bottom: 5px;
`;

export const listNewEst = css`
    border: none;
    height: 20px;
    background-color: white;
    font-weight: 400;
    cursor: pointer;
`;

export const listDeadLine = css`
    border: none;
    height: 20px;
    background-color: white;
    cursor: pointer;
`;

export const selectedSortButton = css`
    font-weight: 600;
`;

export const mainListBox = css`
    display: flex;
    flex-direction: column;
    border: none;
    height: 500px;
    border-radius: 7px;
    flex-grow: 1;
    overflow-y: auto;
`;

export const noPageText = css`
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 25px;
    transform: translate(-50%, -50%);
`;

export const listContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 7px;
    padding: 3px;
    margin-bottom: 3px;
    width: 100%;
    height: 70px;
    background-color: #C8E8E5;
    cursor: pointer;
`;

export const postIconBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 60px;
    height: 60px;
`;

export const postMainBox = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 20px;
    font-size: 30px;
`;

export const postWriterName = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
`;

export const imgIcon = css`
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

export const headerNickName = css`
    //text-align: center;
    border: none;
    width: 140px;
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
    background-color: #C8E8E5;
    cursor: pointer;
`;

export const pageButton = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    height: 15px;
    
`;

export const pageButtons = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const emptyBox = css`
    width: 19%;
    height: 100%;
`;

export const goToPageButton = css`
    border: none;
    border-radius: 50%;
    margin: 0 1px;
    width: 25px;
    height: 25px;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
    
    &:active {
    background-color: #C8E8E5;

    }
`;

export const nowPageButton = css`
    background-color: #C8E8E5;
`;

export const createButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 7px;
    width: 19%;
    height: 25px;
    font-size: 20px;
    font-weight: 600;
    background-color: #C8E8E5;
    cursor: pointer;

    &:hover {
        background-color: #85B4A3;

    }
    &:active {
        background-color: #85B4A3;
    }
`;