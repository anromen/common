import React, { useState } from 'react';

import LoginForm from './components/loginForm';
import Profile from './views/profile';

const App = () => {
  const [token, setToken] = useState();

  if (!token) return <LoginForm setToken={setToken} />;

  return <Profile setToken={setToken} />;
};

export default App;
