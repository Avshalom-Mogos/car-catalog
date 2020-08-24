import React from 'react';
import FacebookAuth from './facebook-auth/FacebookAuth';
import GoogleAuth from './google-auth/GoogleAuth';
import useStyles from './useStyles';

const SocialAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FacebookAuth />
      <GoogleAuth />
    </div>
  );
};

export default SocialAuth;
