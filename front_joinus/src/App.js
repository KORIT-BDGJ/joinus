
import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import Login from './pages/Login/Login';
import UserRegister from './pages/UserRegister/UserRegister';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo/UserInfo';
import Main from './pages/Main/Main';
import PostRegister from './pages/Post/PostRegister/PostRegister';
import OwnerPostList from './pages/Post/PostList/OwnerPostList';
import HostPostList from './pages/Post/PostList/HostPostList';
import OwnerPostDetail from './pages/Post/PostDetail/OwnerPostDetail';
import HostPostDetail from './pages/Post/PostDetail/HostPostDetail';

function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/main" element={<Main />} />
        <Route path="/postregister" element={<PostRegister />} />
        <Route path="/ownerpostlist" element={<OwnerPostList />} />
        <Route path="/hostpostlist" element={<HostPostList />} />
        <Route path="/ownerpostdetail" element={<OwnerPostDetail />} />
        <Route path="/hostpostdetail" element={<HostPostDetail />} />
        <Route path="/post/:postId" element={<OwnerPostDetail />} />
        <Route path="/" element={<Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;