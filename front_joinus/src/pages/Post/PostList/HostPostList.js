/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
    const [posts, setPosts] = useState([
        { id: 1, title: '글 제목 1', body: '글 내용 1', moveButton: true, cancelButton: true },
        { id: 2, title: '글 제목 2', body: '글 내용 2', moveButton: true, cancelButton: true },
        { id: 3, title: '글 제목 3', body: '글 내용 3', moveButton: true, cancelButton: true },
    ]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/posts')
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    const Move = (id) => { 
        // TODO: 이동 버튼 클릭 시 처리할 로직 구현
        
    };

    const Cancel = (id) => { 
        // TODO: 취소 버튼 클릭 시 처리할 로직 구현
    };

    return (
        <div css={container}> 
            <h1 css={title}>내가 참여한 글</h1>
            <ul css={list}>
                {posts.map((post) => (
                    <li key={post.id} css={listItem}>
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <div css={buttons}>
                            {post.moveButton && (
                                <button onClick={() => Move(post.id)}>이동하기</button>
                            )}
                            {post.cancelButton && (
                                <button onClick={() => Cancel(post.id)}>취소하기</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
  </div>
  );
};

export default HostPostList;