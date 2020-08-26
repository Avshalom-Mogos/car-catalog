import axios from 'axios';

type User = {
  email: string;
  password?: string;
  name?: string;
  userProviderId?: string;
  authProvider?: string;
};

const authenticate = (authType: string, user: User) => {
  return axios
    .post(`/auth/${authType}`, user)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data);
    });
};
export default authenticate;
