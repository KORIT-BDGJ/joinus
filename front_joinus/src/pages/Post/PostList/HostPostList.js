import { useEffect } from 'react';
import axios from 'axios';

const HostPostList = () => {
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>내가 참여한 글</h1>
    </div>
  );
};

export default HostPostList;