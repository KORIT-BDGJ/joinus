/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';



const UploadImage = ({ onChangeHandle, onClickHandle, previewUrl, imageBoxStyle = {}, imagePreviewStyle = {} }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        onChangeHandle(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageClick = () => {
    onClickHandle();
  };

  return (
    <div css={imageBoxStyle} onClick={handleImageClick}>
      {previewUrl ? (
        <img css={imagePreviewStyle} src={previewUrl} alt="profile" />
      ) : (
        <span>이미지를 업로드해주세요</span>
      )}
      <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  );
};

export default UploadImage;
