import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const COLLECTIONS = gql`
  query {
    collections {
      name
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

const CollectionList = () => {
  const [name, setName] = useState('');

  const { loading, error, data } = useQuery(COLLECTIONS);
  const [createCollection] = useMutation(CREATE_COLLECTION, {
    onError: (error) => console.log(error.message),
  });

  if (loading) return <h1>...</h1>;
  if (error) return <h1>Oooops: ${error.message}</h1>;

  return (
    <div>
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

      {data.collections.map((collection) => (
        <div className='collection' key={collection.id}>
          <h2>{collection.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
