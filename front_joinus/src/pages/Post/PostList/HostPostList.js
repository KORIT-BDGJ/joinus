/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import AlertModal from '../../../components/Modal/AlertModal';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRedo } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';



const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px;
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
  max-width: 900px;
  margin: 30px auto;
  border: 1px solid #dbdbdb;
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
  padding: 20px;
  &:last-child {
    border-bottom: none;
  }
`;

const postInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const iconWrapper = css`
  font-size: 50px;
`;

const postTitle = css`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: #0095f6;
  }
`;

const buttons = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  height: 60px;
  width: 100px;
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

const HostPostList = () => {
  const [myApplicantPosts, setMyApplicantPosts] = useState([]);
  const [myAttendPosts, setMyAttendPosts] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [evaluateModalOpen, setEvaluateModalOpen] = useState({
    type: '',
    isOpen: false,
    postId: null,
  });
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [cancelPostId, setCancelPostId] = useState(null);
  const [evaluateUsers, setEvaluateUsers] = useState([]);
  const [hoveredStar, setHoveredStar] = useState({
    postId: null,
    userId: null,
    starCount: 0,
  });
  const [starCount, setStarCount] = useState({});
  const [starCountState, setStarCountState] = useState({});

  const { userId } = useParams();
  const option = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const getHostPostList = useQuery(
    ["getHostPostList"],
    async () => {
      const response = await axios.get(
        `http://localhost:8080/post/${userId}/host`,
        option
      );

      console.log("getHostPostList response:", response.data);

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${userId}/myapplicant`, option)
      .then((res) => {
        setMyApplicantPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // axios
    //   .get(`http://localhost:8080/post/${userId}/myattend`, option)
    //   .then((res) => {
    //     setMyAttendPosts(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const openCancelModal = (id) => {
    setCancelPostId(id);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelPostId(null);
    setCancelModalOpen(false);
  };

  const cancelPost = () => {
    console.log('취소가 완료되었습니다.');
    setCancelModalOpen(false);
  };

  const movePost = (id) => {
    console.log(`해당 상세페이지로 이동 ${id}`);
  };

  const handleButtonClick = (type, postId) => {
    const selectedPost = myAttendPosts.find((post) => post.postId === postId);
    setEvaluateUsers(selectedPost.users);
    setEvaluateModalOpen({ type, isOpen: true, postId });
  };

  const confirmEvaluate = () => {
    if (evaluateModalOpen.type === 'evaluate') {
      console.log('평가하기');
      evaluateUsers.forEach((user) => {
        console.log(
          `평가한 유저: ${user.username}, 평가 점수: ${starCount[`${evaluateModalOpen.postId}:${user.userId}`]}`
        );
      });
      // Add logic to send evaluation information
    } else if (evaluateModalOpen.type === 'skip') {
      console.log('평가하지 않기');
      // Add logic to skip evaluation
    }
    setEvaluateModalOpen({ type: '', isOpen: false });
  };

  const cancelEvaluate = () => {
    setEvaluateModalOpen({ type: '', isOpen: false });
    console.log(evaluateModalOpen);
  };

  const handlePostTitleClick = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const handleStarMouseOver = (postId, userId, starCount) => {
    setHoveredStar({ postId, userId, starCount });
  };

  const handleStarMouseOut = () => {
    setHoveredStar({ postId: null, userId: null, starCount: 0 });
  };

  const handleStarClick = (postId, userId, newMedalCount) => {
    const key = `${postId}:${userId}`;

    setStarCount({
      ...starCount,
      [key]: newMedalCount,
    });

    setStarCountState({
      ...starCountState,
      [key]: newMedalCount,
    });

    setEvaluateUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            medalCount: newMedalCount,
          };
        } else {
          return user;
        }
      })
    );
  };

  const handleStarReset = (postId, userId) => {
    const key = `${postId}:${userId}`;

    setStarCount({
      ...starCount,
      [key]: 0,
    });

    setStarCountState({
      ...starCountState,
      [key]: 0,
    });

    setMyAttendPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId === postId) {
          return {
            ...post,
            users: post.users.map((user) => {
              if (user.userId === userId) {
                return {
                  ...user,
                  medalCount: 0,
                };
              } else {
                return user;
              }
            }),
          };
        } else {
          return post;
        }
      })
    );
  };

  const starOptions = [1, 2, 3, 4, 5];
  const inactiveStar = <AiOutlineStar />;
  const activeStar = <AiFillStar />;

  return (
    <div css={container}>
      <Sidebar></Sidebar>
      <div>
        <h1 css={title}>내가 신청한 글</h1>
        <ul css={list}>
          {myApplicantPosts.map((post) => (
            <li key={post.postId} css={listItem}>
              <div css={postInfo}>
                <div css={iconWrapper}>{post.sportsIcon}</div>
                <h1 css={postTitle} onClick={() => movePost(post.postId)}>
                  {post.title}
                </h1>
                <div css={buttons}>
                  {post.cancelButton && (
                    <button onClick={() => openCancelModal(post.postId)}>
                      취소하기
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h1 css={title}>참여 완료한 글</h1>
        <ul css={list}>
          {myAttendPosts.map((post, index) => (
            <div key={index} css={listItem}>
              <div css={postInfo}>
                <div css={iconWrapper}>{post.sportsIcon}</div>
                <h1
                  css={postTitle}
                  onClick={() => handlePostTitleClick(post.postId)}
                >
                  {post.postTitle}
                </h1>

                <div css={buttons}>
                  <button
                    onClick={() => handleButtonClick('evaluate', post.postId)}
                  >
                    평가하기
                  </button>
                  <button
                    onClick={() => handleButtonClick('skip', post.postId)}
                  >
                    하지않기
                  </button>
                </div>
              </div>
              {selectedPosts.includes(post.postId) && (
                <div>
                  <div css={titleAndDateContainer}>
                    <h2 css={attendUserListTitle}>참여 유저 목록</h2>
                    <div css={postDate}>{post.date}</div>
                  </div>
                  {post.users.map((user) => (
                    <div key={user.userId}>
                      <span css={attendUserName}>{user.username}</span>
                      <div>
                        {starOptions.map((starCount) => {
                          const key = `${post.postId}:${user.userId}`;
                          return (
                            <button
                              key={starCount}
                              css={star}
                              onMouseOver={() =>
                                handleStarMouseOver(
                                  post.postId,
                                  user.userId,
                                  starCount
                                )
                              }
                              onMouseOut={handleStarMouseOut}
                              onClick={() =>
                                handleStarClick(
                                  post.postId,
                                  user.userId,
                                  starCount
                                )
                              }
                            >
                              {starCount <=
                              (hoveredStar.postId === post.postId &&
                              hoveredStar.userId === user.userId
                                ? hoveredStar.starCount
                                : starCountState[`${post.postId}:${user.userId}`] ||
                                  user.medalCount ||
                                  0)
                                ? activeStar
                                : inactiveStar}
                            </button>
                          );
                        })}
                        <button
                          css={resetButton}
                          onClick={() => handleStarReset(post.postId, user.userId)}
                        >
                          <FaRedo />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
      {cancelModalOpen && (
        <AlertModal
          isModalOpen={cancelModalOpen}
          confirmRemove={cancelPost}
          cancelRemove={closeCancelModal}
          message="취소하시겠습니까?"
        />
      )}
      {evaluateModalOpen.isOpen && (
        <AlertModal
          isModalOpen={evaluateModalOpen.isOpen}
          confirmRemove={confirmEvaluate}
          cancelRemove={cancelEvaluate}
          onClose={() =>
            setEvaluateModalOpen({ type: '', isOpen: false })
          }
          message={
            evaluateModalOpen.type === 'evaluate'
              ? '평가하시겠습니까?'
              : '평가를 하지 않으시겠습니까?'
          }
        />
      )}
    </div>
  );
};

export default HostPostList;
