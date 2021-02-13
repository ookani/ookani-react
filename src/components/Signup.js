import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AcUnit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [signup, { loading, error }] = useMutation(SIGN_UP);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AcUnit />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup({
              variables: {
                email: formState.email,
                password: formState.password,
              },
            })
              .then(() => props.history.push('/dashboard'))
              .catch((err) => console.log(err.message));
          }}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="signup-email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={formState.email}
            onChange={(e) => {
              setFormState({
                ...formState,
                email: e.target.value,
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="signup-password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={(e) => {
              setFormState({
                ...formState,
                password: e.target.value,
              });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error.message}</Alert>}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Signup;
