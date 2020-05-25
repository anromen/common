import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENT_USER = gql`
  query {
    currentUser {
      name
      collections {
        id
        name
      }
    }
  }
`;

const User = ({ children, setToken }) => {
  //Consultas Graphql
  const { loading, error, data, client } = useQuery(CURRENT_USER);

  //Posibles estados de la respuesta a la consulta del usuario
  if (loading) return <h1>...</h1>;
  if (error) return <h1>Ooops: {error.message}</h1>;

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    client.resetStore();
  };

  return (
    <div>
      <h1>{data.currentUser.name}</h1>
      <button onClick={() => logout()}>Salir</button>
      {children}
    </div>
  );
};

export default User;
