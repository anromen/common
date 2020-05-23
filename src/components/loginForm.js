import React, { useState, useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (e) => console.error(`Oooops! ${e}`),
  });

  useEffect(() => {
    if (result.data) {
      const info = result.data.login;
      localStorage.setItem('token', info.token);
      setToken(info.token);
    }
  }, [result.data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login({ variables: { email, password } });
      }}
    >
      <input
        type='email'
        placeholder='Escriba su email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Escriba su contraseña'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default LoginForm;
