import React, { useEffect, useContext } from 'react';
import FacebookAuth from './facebook-auth/FacebookAuth';
import GoogleAuth from './google-auth/GoogleAuth';
import { useHistory } from 'react-router-dom';
import { IsUserLoggedInContext } from '../../../contexts/IsUserLoggedIn';
import useStyles from './useStyles';

const SocialAuth = () => {
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    //redirect to catalog after soical auth
    if (isUserLoggedIn) history.push('/catalog');
  }, [isUserLoggedIn, history]);

  return (
    <div className={classes.root}>
      {/* prevent unnecessary load */}
      {!isUserLoggedIn && (
        <>
          <FacebookAuth />
          <GoogleAuth />
        </>
      )}
    </div>
  );
};

export default SocialAuth;
