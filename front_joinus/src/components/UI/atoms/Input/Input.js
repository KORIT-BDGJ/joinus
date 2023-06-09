/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';



const input = css`
    border:none;
    outline:none;
    padding: 5px 10px;
    width: 100%;
    font-size: 25px;
`;

const Input = ( { type, placeholder, onChange, name, onClick, readOnly,value, disabled} ) => {
    return (
        <>
        <input css={input} type={type} placeholder={placeholder} onChange={onChange} name={name} onClick={onClick} readOnly={readOnly} value={value} disabled={disabled} />
        </>
    );
};

export default Input;