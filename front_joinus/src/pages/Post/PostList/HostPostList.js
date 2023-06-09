/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px 30px 30px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const listContainer = css`
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const logoStyle= css`
  width: 724px; 
  height: 125px;
  background-image: url('/images/title_6.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const logoStyle2= css`
  width: 724px; 
  height: 125px;
  background-image: url('/images/title_7.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const logoTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-size: 48px;
  font-weight: 600;
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
  width: 650px;
  margin: 30px auto;
  border: 2px solid #C8E8E5;
  border-radius: 7px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 300px;
`;


const listItem = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #C8E8E5;

  &:last-child {
    border-bottom: none;
  }
`;

const postInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const iconWrapper = css`
  font-size: 50px;
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  margin: 0;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const buttons = css`
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    width: 50px;
    height: 30px;
    font-weight: bold;
    background-color: #C8E8E5;
    cursor: pointer;

    &:hover {
      background-color: #A7DED9;
    }
`;

const attendUserListTitle = css`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`;

const postDate = css`
  font-size: 20px;
  font-weight: 600;
  color: #8e8e8e;
`;

const attendUserName = css`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const titleAndDateContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const star = css`
  font-size: 20px;
  color: #ffd700;
  cursor: pointer;
`;

const resetButton = css`
  font-size: 20px;
  color: #000;
  cursor: pointer;
`;

const noPost = css`
  font-size: 25px;
`;

const HostPostList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const principal = useQuery(["principal"], async () => {
    const option = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const response = await axios.get("http://3.39.18.64/account/principal", option);
    return response.data;
  });

  const { userId } = useParams();

  const getHostApplicantList = useQuery(["getHostApplicantList"], async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(`http://3.39.18.64/post/${userId}/host/applicant`, option);
      return response.data;
  });

  const cancelApplyPost = useMutation(async (postId) => {
    const option = {
        params: {
            userId: userId
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    return await axios.delete(`http://3.39.18.64/post/cancel/apply/${postId}`, option);
  }, {
      onSuccess: () => {
          queryClient.invalidateQueries("getHostApplicantList");
      } 
  });

  const getHostAttendList = useQuery(["getHostAttendList"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.get(`http://3.39.18.64/post/${userId}/host/attend`, option);
    return response.data;
  });

const cancelAttendPost = useMutation(async (postId) => {
  const option = {
      params: {
          userId: userId
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
  }
  return await axios.delete(`http://3.39.18.64/post/${postId}/attend/delete`, option);
}, {
    onSuccess: () => {
        queryClient.invalidateQueries("getHostAttendList");
    } 
});

  const movePost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleApplyDeleteClick = (postId) => {
    const result = window.confirm('해당 게시글 신청을 취소하시겠습니까?');
    if (result) {
      deleteApplyPostHandle(postId);
    } else {
        // 취소 버튼을 클릭한 경우 아무 작업도 수행하지 않기.
    }
  };

  const deleteApplyPostHandle = (postId) => {
    cancelApplyPost.mutate(postId);
  }

  const handleAttendDeleteClick = (postId) => {
    const result = window.confirm('해당 게시글 신청을 취소하시겠습니까?');
    if (result) {
      deleteAttendPostHandle(postId);
    } else {
        // 취소 버튼을 클릭한 경우 아무 작업도 수행하지 않기.
    }
  };

  const deleteAttendPostHandle = (postId) => {
    cancelAttendPost.mutate(postId);
  }

  if (principal.isLoading || getHostApplicantList.isLoading || getHostAttendList.isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div css={container}>
      <Sidebar />
      <div css={listContainer}>
        <h1 css={logoTitle}>
          <div css={logoStyle}>
            {/* 내가 신청한 글 */}
          </div>
        </h1>
        {getHostApplicantList.data.length === 0 ? (
        <div css={noPost}>신청한 글이 없습니다.</div>
        ) : (
        <div css={list}>
          {getHostApplicantList.data.map((post) => (
            <li key={post.postId} css={listItem}>
              <div css={postInfo}>                
                <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h1>
                <button css={buttons} onClick={() => handleApplyDeleteClick(post.postId) }>취소</button>
              </div>
            </li>
          ))}
        </div>
        )}
      </div>
      <div css={listContainer}>
        <h1 css={logoTitle}>
          <div css={logoStyle2}>
            {/* 신청 수락된 글   */}
          </div> 
        </h1>
        {getHostAttendList.data.length === 0 ? (
        <div css={noPost}>수락된 글이 없습니다.</div>
        ) : (
        <div css={list}>
          {getHostAttendList.data.map((post) => (
            <li key={post.postId} css={listItem}>
              <div css={postInfo}>                
                <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h1>
                <button css={buttons} onClick={() => handleAttendDeleteClick(post.postId) }>취소</button>
              </div>
            </li>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default HostPostList;
