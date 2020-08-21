import axios from 'axios';

const validateFacebookToken = async (accessToken: string) => {
  const url = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FACEBOOK_CLIENT_ID}|${process.env.FACEBOOK_CLIENT_SECRET}`;
  try {
    const res = await axios(url);
    return res.data.data.is_valid;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
export default validateFacebookToken;
