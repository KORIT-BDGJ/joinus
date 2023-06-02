import { css } from "@emotion/react";


export const mainContainer = css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 100%
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
    width: 19%;
    border-radius: 7px;
    font-size: 14px;
`;

export const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 10px;
    width: 60%;
    height: 100%;
`;

export const detailsSearchBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 19%;
    height: 100%;
    background-color: white;
    cursor: pointer;
`;

export const expandedButtonsContainer = (expandedIsOpen) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    border: ${expandedIsOpen ? "1px solid #dbdbdb" : "none"};
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
    height: 900px;
    border-radius: 7px;
    flex-grow: 1;
    overflow-y: auto;
`;

export const listContainer = css`
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
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

export const postContent = css`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
    width: 90%;

`;

export const postListHeader = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 25px;
`;

export const headerDateLabel = css`
    margin-right: 5px;
    font-weight: 600;
    cursor: pointer;
`;

export const headerNickName = css`
    //text-align: center;
    border: none;
    width: 140px;
    background-color: #C8E8E5;
    cursor: pointer;
`;

export const registeDates = css`
    border: none;
    text-align: center;
    background-color: #C8E8E5
    ;
    cursor: pointer;
`;

export const postMain = css`
    display: flex;
    /* justify-content: center;
    align-items: center; */
    height: 20px;
    font-size: 20px;
`;

export const postFooter = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 25px;
`;

export const informationLabel =css`
    margin-right: 5px;
    font-weight: 600;
    cursor: pointer;
`;

export const informationTextName = css`
    text-align: center;
    border: none;
    background-color: #C8E8E5;
    cursor: pointer;
`;

export const informationDate = css`
    text-align: center;
    border: none;
    width: 200px;
    background-color: #C8E8E5;
    cursor: pointer;
`;

export const finalDeadLine = css`
    color: red;
`;

export const informationCount = css`
    text-align: center;
    border: none;
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
    background-color: white;
    cursor: pointer;
    
    &:active {
        background-color: #2ecc71;
    }
`;

export const nowPageButton = css`
    background-color: #2ecc71;
`;

export const createButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 7px;
    width: 19%;
    height: 25px;
    font-size: 16px;
    font-weight: 600;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 255, 0, 0.2);
    }
    &:active {
        background-color: #2ecc71;
    }
`;