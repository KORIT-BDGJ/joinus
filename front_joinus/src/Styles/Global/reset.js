/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const Reset = css`

    @font-face {
        font-family: 'GangwonEduHyeonokT_OTFMediumA';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEduHyeonokT_OTFMediumA.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    input[type=password] {
        font-size: 12px;
        font-family: 'Spoqa Han Sans', sans-serif;
    }
    /* input[type=email] {
        font-family: 'Spoqa Han Sans', sans-serif;
    } */

    * {
        box-sizing: border-box;
        color: #333;
        font-size: 20px;
        font-family: 'GangwonEduHyeonokT_OTFMediumA', sans-serif;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        font-family: 'GangwonEduHyeonokT_OTFMediumA', sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'GangwonEduHyeonokT_OTFMediumA' sans-serif;
    }
    #root {
        position: relative;
        margin: 10px auto;
        border: 3px solid #dbdbdb;
        border-radius: 10px;
        padding: 10px;
        width: 750px;
        height: 900px;
        overflow: hidden;
        
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    ::-webkit-scrollbar {
        width: 5px; /* 스크롤바의 너비 */
    }
    ::-webkit-scrollbar-track {
    background: #C8E8E5; /* 스크롤바 트랙의 배경색 */
    border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
    
    background: #C8E8E5; /* 스크롤바 썸의 배경색 */
    border-radius: 5px; /* 스크롤바 썸의 모서리 반경 */
    }
    ::-webkit-scrollbar-thumb:hover {

    background: #C8E8E5; /* 스크롤바 썸의 호버 배경색 */
    }

    .react-datepicker-popper {
        font-size: 25px;
    }
`;