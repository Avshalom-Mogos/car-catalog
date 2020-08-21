import axios from 'axios';

export const getCarsList = (accessToken: string, authProvider: string) => {
  return axios
    .get('/cars', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        authProvider,
      },
    })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data);
    });
};
