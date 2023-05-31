/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const Reset = css`
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */
    * {
        box-sizing: border-box;
        color: #333;
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
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
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
    background: rgba(150, 238, 150, 0.2); /* 스크롤바 트랙의 배경색 */
    }
    ::-webkit-scrollbar-thumb {
    
    background: #6ef1a079; /* 스크롤바 썸의 배경색 */
    border-radius: 5px; /* 스크롤바 썸의 모서리 반경 */
    }
    ::-webkit-scrollbar-thumb:hover {

    background: #0af845; /* 스크롤바 썸의 호버 배경색 */
    }
`;