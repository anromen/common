import React, { useState } from 'react';

import LoginForm from './components/loginForm';
import User from './views/layouts/user';
import Collections from './views/collectionList';

const App = () => {
  const [token, setToken] = useState();

  if (!token) return <LoginForm setToken={setToken} />;

  return (
    <User setToken={setToken}>
      <Collections />
    </User>
  );
};

export default App;
