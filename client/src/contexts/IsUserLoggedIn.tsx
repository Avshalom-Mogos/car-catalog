import React, { createContext, useState } from 'react';

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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    localStorage.car_catalog_login ? true : false
  );

  return (
    <IsUserLoggedInContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn }}
    >
      {children}
    </IsUserLoggedInContext.Provider>
  );
};
