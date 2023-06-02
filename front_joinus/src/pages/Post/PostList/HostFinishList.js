/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Sidebar from "../../../components/Sidebar/Sidebar";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  overflow-y: auto;
`;

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  font-size: 34px;
  font-weight: 600;
`;

const list = css`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  border: 1px solid #dbdbdb;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 700px;
`;

const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #dbdbdb;

  &:last-child {
    border-bottom: none;
  }
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const postInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HostFinishList = () => {

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/account/principal", option);
        return response.data;
      });

      const getHostFinishList = useQuery(["getHostFinishList"], async () => {
        const option = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
  
        const response = await axios.get(`http://localhost:8080/post/finish`, option);
        return response.data;
    });

    useEffect(() => {
        console.log("principal:", principal.data);
        console.log("getHostFinishList:", getHostFinishList.data);
      }, [principal.data, getHostFinishList.data]);

    if (principal.isLoading || getHostFinishList.isLoading) {
        return <div>로딩중...</div>;
      }
      
      return (
        <div css={container}>
            <Sidebar />
            <h1 css={title}>참여 완료한 글</h1>
            {getHostFinishList.data && getHostFinishList.data.length === 0 ? (
                <div>게시물이 없습니다.</div>
            ) : (
                <div css={list}>
                {getHostFinishList.data && getHostFinishList.data.map((post) => (
                    <li key={post.postId} css={listItem}>
                    <div css={postInfo}>
                        <h1 css={postTitle}>
                        {post.title}
                        </h1>
                    </div>
                    </li>
                ))}
                </div>
            )}
        </div>
    );
};

export default HostFinishList;