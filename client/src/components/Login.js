import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Login = () => {
  return (
    <form>
      <div>
        <TextField id="login-email" label="Email"></TextField>
      </div>
      <div>
        <TextField id="login-password" label="Password"></TextField>
      </div>
      <Button
        onClick={() => console.log('Hola')}
        variant="contained"
        color="primary"
      >
        Log In
      </Button>
    </form>
  );
};

export default Login;
