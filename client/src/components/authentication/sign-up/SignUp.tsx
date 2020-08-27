import React, { useContext, useState } from 'react';
import { Avatar, Button, CssBaseline, LinearProgress } from '@material-ui/core';
import { TextField, Grid, Typography, Container } from '@material-ui/core';
import { useFormik } from 'formik';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './useStyles';
import authenticate from '../../../api/auth';
import { Link, useHistory, Redirect } from 'react-router-dom';
import SocialAuth from '../social-auth/SocialAuth';
import { IsUserLoggedInContext } from '../../../contexts/IsUserLoggedIn';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({ show: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);

  type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const submitForm = async ({
    name,
    email,
    password,
    confirmPassword,
  }: FormValues) => {
    if (password !== confirmPassword)
      return setError({
        show: true,
        msg: 'please make sure your passwords match',
      });

    //clear error message and show loader
    setError({ show: false, msg: '' });
    setIsLoading(true);

    const user = {
      name,
      email,
      password,
      authProvider: 'myApp',
    };

    try {
      await authenticate('signup', user);
      history.push('/signin');
    } catch (err) {
      setIsLoading(false);
      setError({ show: true, msg: err.message });
    }
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    onSubmit: submitForm,
  });

  const userFeedback = () => {
    if (error.show) return <span style={{ color: 'red' }}>{error.msg}</span>;
    if (isLoading) return <LinearProgress style={{ width: '100%' }} />;
  };

  if (isUserLoggedIn) return <Redirect to='catalog' />;

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.name}
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Full Name'
                autoFocus
                inputProps={{ minLength: 2 }}
              />
            </Grid>
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
              <TextField
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
                inputProps={{ minLength: 6 }}
              />
            </Grid>
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
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12}>
            Already have an account?
            <Link to='/signin'> Sign in</Link>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.socialaAuth}>
              <hr className={classes.seperator} />
              <div className={classes.or}>Sign up with</div>
            </div>
          </Grid>
        </form>
        <SocialAuth />
      </div>
    </Container>
  );
};
export default SignUp;
