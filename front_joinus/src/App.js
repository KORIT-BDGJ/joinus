import { Global } from '@emotion/react';
import { Reset } from './Styles/Global/reset';
import { Routes, Route } from 'react-router-dom';
import OwnerPostList from './pages/Post/PostList/OwnerPostList';
import HostPostList from './pages/Post/PostList/HostPostList';

function App() {
  return (
    <>
      <Global styles={ Reset } />
      <Routes>
        <Route path="/OwnerPostList" element={<OwnerPostList />} />
        <Route path="/HostPostList" element={<HostPostList />} />
      </Routes>
    </>
  );
}

export default App;