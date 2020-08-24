import React, { createContext, useState, useEffect } from 'react';
import { checkAuth } from '../api/auth';
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
    const cheackUserId = async () => {
      try {
        const userId = JSON.parse(localStorage.car_catalog_login).id;
        const isUserExsit = await checkAuth(userId);
        setIsUserLoggedIn(isUserExsit);
      } catch (err) {
        setIsUserLoggedIn(false);
      }
    };
    cheackUserId();
  }, []);

  return (
    <IsUserLoggedInContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </IsUserLoggedInContext.Provider>
  );
};
