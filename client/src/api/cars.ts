import axios from 'axios';

export const getCarsList = (token: string) => {
  return axios
    .get('/cars', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data);
    });
};
