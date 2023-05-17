
import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import Login from './pages/Login/Login';
import UserRegister from './pages/UserRegister/UserRegister';
import { Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo/UserInfo';
import Main from './pages/Main/Main';

import PostRegister from './pages/Post/PostRegister/PostRegister';
import OwnerPostList from './pages/Post/PostList/OwnerPostList';
import HostPostList from './pages/Post/PostList/HostPostList';
import OwnerPostDetail from './pages/Post/PostDetail/OwnerPostDetail';
import HostPostDetail from './pages/Post/PostDetail/HostPostDetail';
import Review from './pages/Post/Review/Review';

import AuthRouteReactQuery from './components/UI/Routes/AuthRouteReactquery';

import AuthRoute from './components/UI/Routes/AuthRoute';
import OAuth2Login from './pages/Login/OAuth2Login';
import UserOAuth2Register from './pages/UserRegister/UserOAuth2Register';
import OAuth2Merge from './pages/OAuth2Merge/OAuth2Merge';


function App() {
  return (
    <>
      <Global styles={ Reset } />
      <Routes>
        
        <Route path='/' element={<AuthRoute path={"/"} element={<></>}/>} />
        <Route path='/auth/login' element={<AuthRoute path={"/auth/login"} element={<Login />}/>} />
        <Route path="/auth/register" element={<AuthRoute path={"/auth/register"} element={<UserRegister />}/>} />
        <Route path="/user/modification" element={<AuthRoute  path={"/user/modification"} element={<UserInfo />} />} />
        <Route path="/main" element={<AuthRoute  path={"/main"} element={<Main />}/>} />
        <Route path='/auth/oauth2/login' element={<AuthRoute path={"/auth/oauth2/login"} element={<OAuth2Login />}/>} />
        <Route path='/auth/oauth2/register' element={<AuthRoute path={"/auth/oauth2/register"} element={<UserOAuth2Register />}/>} />
        <Route path='/auth/oauth2/merge' element={<AuthRoute path={"/auth/oauth2/merge"} element={<OAuth2Merge />}/>} />
        {/* <Route path="/postregister" element={<PostRegister />} />
        <Route path="/ownerpostlist" element={<OwnerPostList />} />
        <Route path="/hostpostlist" element={<HostPostList />} />
        <Route path="/ownerpostdetail" element={<OwnerPostDetail />} />
        <Route path="/hostpostdetail" element={<HostPostDetail />} />
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path="/review" element={<Review />} />

=======
        <Route path="/post/:postId" element={<OwnerPostDetail />} />
>>>>>>> front_jinwon
        <Route path="/" element={<Navigate to="/login"/>} />
=======
        <Route path="/post/:postId" element={<OwnerPostDetail />} /> */}
        {/* <Route path="/" element={<Navigate to="/login"/>} /> */}
      </Routes>
    </>
  );
}

export default App;