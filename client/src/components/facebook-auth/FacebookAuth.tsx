import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import authenticate from '../../api/auth';
import { useHistory } from 'react-router-dom';

type FbResponse = {
  status?: string;
  accessToken: string;
  data_access_expiration_time: number;
  email: string;
  expiresIn: number;
  graphDomain: string;
  id: string;
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  signedRequest: string;
  userID: string;
};

const FacebookAuth = () => {
  const history = useHistory();
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);

  const responseFacebook = async (res: FbResponse) => {
    //when the user closes the popup window
    if (res.status === 'unknown') return;

    const user = {
      name: res.name,
      email: res.email,
      userProviderId: res.userID,
      authProvider: 'facebook',
    };

    try {
      const fetchedUser = await authenticate('facebook', user);
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
      <FacebookLogin
        appId='306159394138292'
        fields='name,email,picture'
        callback={responseFacebook}
      />
    </div>
  );
};
export default FacebookAuth;
