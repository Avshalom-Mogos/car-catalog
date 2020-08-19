import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';

type FbResonse = {
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
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);
  const responseFacebook = (res: FbResonse) => {
    const { name, email, userID: userProviderId, accessToken } = res;
    const user = {
      name,
      email,
      userProviderId,
      authProvider: 'facebook',
    };

    fetch('/auth/facebook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem(
          'car_catalog_login',
          JSON.stringify({ ...user, accessToken })
        );
        setIsUserLoggedIn(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <FacebookLogin
        appId='306159394138292'
        autoLoad={true}
        fields='name,email,picture'
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookAuth;
