import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
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

const Login = (props) => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOG_IN);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({
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
            id="login-email"
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
            id="login-password"
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
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
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

export default Login;
