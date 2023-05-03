import { Global } from '@emotion/react'
import { Reset } from './Styles/Global/reset';
import { Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>

      </Routes>
    </>
  );
}

export default App;