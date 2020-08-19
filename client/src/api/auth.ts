import axios from 'axios';

type User = { email: string; password: string };
export const authenticate = (authType: string, user: User) => {
  return axios
    .post(`/auth/${authType}`, user)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data);
    });
};
