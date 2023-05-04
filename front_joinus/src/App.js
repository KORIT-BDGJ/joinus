
import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import Login from './pages/Login/Login';
import UserRegister from './pages/UserRegister/UserRegister';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo/UserInfo';

function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;