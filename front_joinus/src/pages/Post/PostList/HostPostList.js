/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import axios from 'axios';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px;
  
`;

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 34px;
  font-weight: 600;
`;

const list = css`
  width: 100%;
  max-width: 800px;
  margin-top: 50px;
  border: 1px solid #dbdbdb;
  padding: 30px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const buttons = css`
  display: flex;
  gap: 10px;
`;

const HostPostList = () => {
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div css={container}>
      <h1 css={title}>내가 참여한 글</h1>
    </div>
  );
};

export default HostPostList;