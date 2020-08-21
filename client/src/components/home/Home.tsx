import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography variant='h2' className={classes.title}>
          Driver Deals
        </Typography>
        <Button
          variant='contained'
          component={Link}
          color='secondary'
          to='/catalog'
        >
          FIND YOUR CAR
        </Button>
      </div>
    </div>
  );
};
export default Home;
