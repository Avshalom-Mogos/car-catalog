import React, { useContext } from 'react';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import authenticate from '../../api/auth';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import GoogleLogin from 'react-google-login';

const GoogleAuth = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);

  const responseGoogle = async (res: any) => {
    // when the user closes the popup window
    if (res.error === 'popup_closed_by_user') return;

    const user = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      userProviderId: res.profileObj.googleId,
      authProvider: 'google',
    };

    try {
      const fetchedUser = await authenticate('soical', user);
      const { accessToken } = res;
      const userWithToken = { ...fetchedUser, accessToken };
      localStorage.setItem('car_catalog_login', JSON.stringify(userWithToken));
      setIsUserLoggedIn(true);
      history.push('/catalog');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId='1059315451607-0t2ot4ddi9cfs4i4hm2l8rcdfseai4o7.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <button
            className={classes.googleBtn}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className={classes.googleBtnIcon}></div>
          </button>
        )}
      />
    </div>
  );
};
export default GoogleAuth;
