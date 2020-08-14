import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './useStyles';

const MyAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position='static' color='primary'>
      <Container maxWidth='md'>
        <Typography className={classes.title} variant='h5' noWrap>
          Car Catalog
        </Typography>
      </Container>
    </AppBar>
  );
};
export default MyAppBar;
