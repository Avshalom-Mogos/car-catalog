import React, { useState, useContext } from 'react';
import { Avatar, Button, CssBaseline, LinearProgress } from '@material-ui/core';
import { TextField, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookAuth from '../facebook-auth/FacebookAuth';
import GoogleAuth from '../google-auth/GoogleAuth';
import authenticate from '../../api/auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import { useFormik } from 'formik';
import { useStyles } from './useStyles';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({ show: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(
    IsUserLoggedInContext
  );

  const submitForm = async (user: { email: string; password: string }) => {
    //clear error message and show loader
    setError({ show: false, msg: '' });
    setIsLoading(true);
    try {
      //authenticate
      const fetchedUser = await authenticate('signin', user);
      localStorage.setItem('car_catalog_login', JSON.stringify(fetchedUser));
      setIsUserLoggedIn(true);
      history.push('/catalog');
    } catch (err) {
      setError({ show: true, msg: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: submitForm,
  });

  const userFeedback = (): JSX.Element | undefined => {
    if (error.show) return <span style={{ color: 'red' }}>{error.msg}</span>;
    if (isLoading) return <LinearProgress style={{ width: '100%' }} />;
  };

  if (isUserLoggedIn) return <Redirect to='/' />;

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.email}
                variant='outlined'
                required
                fullWidth
                type='email'
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.password}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputProps={{ minLength: 6 }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.userFeedbackContainer}>
                {userFeedback()}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              Don't have an account?
              <Link to='/signup'> Sign up</Link>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.socialaAuth}>
                <hr className={classes.seperator} />
                <div className={classes.or}>Sign in with</div>
              </div>
            </Grid>
          </Grid>
        </form>
        <FacebookAuth />
        <GoogleAuth />
      </div>
    </Container>
  );
};
export default SignIn;
