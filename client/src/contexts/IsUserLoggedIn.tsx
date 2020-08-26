import React, { createContext, useState, useEffect } from 'react';
import decode from 'jwt-decode';
interface Props {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsUserLoggedInContext = createContext({} as Props);

export const IsUserLoggedInProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const { token } = JSON.parse(localStorage.car_catalog_login);
        if (!token) return false;
        const { exp: tokenExpirationTime } = decode(token);
        const currentTimeInSeconds = new Date().getTime() / 1000;
        const tokenExpired = tokenExpirationTime < currentTimeInSeconds;
        if (tokenExpired) return false;
      } catch (err) {
        return false;
      }
      return true;
    };

    setIsUserLoggedIn(checkAuth());
  }, [isUserLoggedIn]);

  return (
    <IsUserLoggedInContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </IsUserLoggedInContext.Provider>
  );
};
