import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { gql, useMutation } from '@apollo/client';

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOG_IN);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({
            variables: {
              email: formState.email,
              password: formState.password,
            },
          })
            .then((data) => props.history.push('/dashboard'))
            .catch((err) => console.log(err.message));
        }}
      >
        <TextField
          id="login-email"
          label="Email"
          variant="outlined"
          value={formState.email}
          onChange={(e) => {
            setFormState({
              ...formState,
              email: e.target.value,
            });
          }}
        />
        <TextField
          id="login-password"
          label="Password"
          type="password"
          variant="outlined"
          value={formState.password}
          onChange={(e) => {
            setFormState({
              ...formState,
              password: e.target.value,
            });
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </form>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
    </div>
  );
};

export default Login;
