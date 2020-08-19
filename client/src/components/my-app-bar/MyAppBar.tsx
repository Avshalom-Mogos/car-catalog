import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import { useStyles } from './useStyles';

const MyAppBar = () => {
  const classes = useStyles();
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);

  return (
    <AppBar className={classes.root} position='static' color='primary'>
      <Container maxWidth='md' className={classes.container}>
        <Typography variant='h5' noWrap>
          Car Catalog
        </Typography>
        <Typography>
          {isUserLoggedIn
            ? `Hello ${JSON.parse(localStorage.car_catalog_login).name}`
            : 'Hello guest'}
        </Typography>
      </Container>
    </AppBar>
  );
};
export default MyAppBar;
