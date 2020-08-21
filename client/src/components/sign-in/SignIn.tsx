import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FacebookAuth from '../facebook-auth/FacebookAuth';
import { useStyles } from './useStyles';
import authenticate from '../../api/auth';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import { Link, Redirect, useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

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
                <FacebookAuth />
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
