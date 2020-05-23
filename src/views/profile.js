import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { collectFields } from 'graphql/execution/execute';

const CURRENT_USER = gql`
  query {
    currentUser {
      name
      collections {
        name
      }
    }
  }
`;

const CREATE_COLLECTION = gql`
  mutation($name: String!) {
    createCollection(name: $name) {
      id
      name
      user {
        name
      }
    }
  }
`;

const Profile = ({ setToken }) => {
  const [name, setName] = useState('');

  const { loading, error, data, client } = useQuery(CURRENT_USER);
  const [createCollection] = useMutation(CREATE_COLLECTION, {
    refetchQueries: [{ query: CURRENT_USER }],
    onError: (error) => console.log(error.message),
  });

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

      <h2>Colecciones</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCollection({ variables: { name } });
          setName('');
        }}
      >
        <input
          type='text'
          placeholder='Nombre de la colección'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Crear</button>
      </form>

      {data.currentUser.collections.map((collection) => (
        <p>{collection.name}</p>
      ))}
    </div>
  );
};

export default Profile;
