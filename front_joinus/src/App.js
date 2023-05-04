import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import { Routes, Route } from 'react-router-dom';
import OwnerPostList from './pages/Post/PostList/OwnerPostList';
import HostPostList from './pages/Post/PostList/HostPostList';
import KimDuYeongTest from './pages/Post/PostList/KimDuYeongTest';

function App() {
  return (
    <>
      <Global styles={ Reset } />
      <Routes>
        <Route path="/OwnerPostList" element={<OwnerPostList />} />
        <Route path="/HostPostList" element={<HostPostList />} />
        <Route path="/KimDuYeongTest" element={<KimDuYeongTest />} />
      </Routes>
    </>
  );
}

export default App;