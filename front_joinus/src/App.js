
import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import Login from './pages/Login/Login';
import UserRegister from './pages/UserRegister/UserRegister';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo/UserInfo';
import Main from './pages/Main/Main';
import AuthRoute from './components/UI/Routes/AuthRoute';
import OAuth2Login from './pages/Login/OAuth2Login';
import UserOAuth2Register from './pages/UserRegister/UserOAuth2Register';
import OAuth2Merge from './pages/OAuth2Merge/OAuth2Merge';
import ForgetPassword from './pages/Login/ForgetPassword';

function App() {
  return (
    <>
      <Global styles={ Reset } />
      <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path='/auth/login' element={<AuthRoute path={"/auth/login"} element={<Login />}/>} />
        <Route path="/auth/register" element={<AuthRoute path={"/auth/register"} element={<UserRegister />}/>} />
        <Route path="/auth/forget/password" element={<AuthRoute path={"auth/forget/password"} element={<ForgetPassword />}/>} />
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
        <Route path="/post/:postId" element={<OwnerPostDetail />} /> */}
        {/* <Route path="/" element={<Navigate to="/login"/>} /> */}
      </Routes>
    </>
  );
}

export default App;