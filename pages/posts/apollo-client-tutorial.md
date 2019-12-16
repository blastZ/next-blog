# Apollo Client

**This tutorial based on apollo-client version 2.6**

## Install

```bash
npm install apollo-boost @apollo/react-hooks graphql
```

- apollo-boost: Package containing everything you need to set up Apollo Client
- @apollo/react-hooks: React hooks based view layer integration
- graphql: Also parses your GraphQL queries

## Create Client

```js
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io'
});
```

use in plain javascript

```js
import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead

...

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));
```

## Connect client to React

```js
import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
```

## Request Data

```js
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
```

## Request with variables

```js
const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />;
}
```

## Keep cache fresh

### Polling

```js
function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    skip: !breed,
    // milliseconds, 0 will not poll
    pollInterval: 500
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />;
}
```

### Refetch

```js
function DogPhoto({ breed }) {
  const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    skip: !breed
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}
```

## Inspect loading states

```js
function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    skip: !breed,
    notifyOnNetworkStatusChange: true
  });

  if (networkStatus === 4) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}
```

The networkStatus property is an enum with number values from 1 to 8 that represent different loading states.

Full list in here
[networkStatus](https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts)

## Request manually

```js
import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

function DelayedQuery() {
  const [dog, setDog] = useState(null);
  const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;

  if (data && data.dog) {
    setDog(data.dog);
  }

  return (
    <div>
      {dog && <img src={dog.displayImage} />}
      <button onClick={() => getDog({ variables: { breed: 'bulldog' } })}>Click me!</button>
    </div>
  );
}
```

## Update data with graphql

```js
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```

## Update cache after mutation

```js
const GET_TODOS = gql`
  query GetTodos {
    todos
  }
`;

function AddTodo() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: todos.concat([addTodo]) }
      });
    }
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```

Not every mutation requires an update function. If you're updating a single item, you usually don't need an update function as long as you return the item's id and the property you updated. While this may seem like magic, this is actually a benefit of Apollo's normalized cache, which splits out each object with an id into its own entity in the cache. Let's look at an example:

```js
const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });

            input.value = '';
          }}>
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}
```

## Handle loading and error

```js
function Todos() {
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_TODOS);

  const [updateTodo, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_TODO);

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });

            input.value = '';
          }}>
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </div>
    );
  });
}
```

## More Info

[Apollo Client Documentation](https://www.apollographql.com/docs/react/)
