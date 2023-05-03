import { Global } from '@emotion/react'
import { Reset } from './Styles/Global/reset';
import Main from './pages/Main/Main';
import PostRegister from './pages/Post/PostRegister/PostRegister';


function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      {/* <Main /> */}
      <PostRegister />
    </>
  );
}

export default App;