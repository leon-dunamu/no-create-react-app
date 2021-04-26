import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
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

export default Home;
