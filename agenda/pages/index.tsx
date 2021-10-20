import {NextPage} from 'next';
import React from 'react';
import LoginRequiredControl from "agenda/app/core/login-required-control";

const Home: NextPage = () => {
  return (
      <LoginRequiredControl>
        <div>
          // HOME
        </div>
      </LoginRequiredControl>
  )
};

export default Home;
