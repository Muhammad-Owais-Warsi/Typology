import React from 'react';
import { account } from '../utils/appwrite';

const Login = () => {
  const loginWithGoogle = async () => {
    account.createOAuth2Session(
      'google',
      'http://localhost:5173/find', // success redirect
      'http://localhost:5173/login'  // failure redirect
    );
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
};

export default Login;
