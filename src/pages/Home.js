import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const fetch = async () => {
    return await axios.get('https://www.naver.com');
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      Home page
      <div>
        <Link to="/monitor/auth/login">zz</Link>
      </div>
      <div>
        <Link to="/monitor/expired">!!</Link>
      </div>
    </div>
  );
};

export default Home;
