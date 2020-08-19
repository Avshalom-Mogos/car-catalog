import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

export const validateFacebookToken = (
  token: string,
  keys: { facebook: { clientID: string; clientSecret: string } },
  next: NextFunction
) => {
  const url = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${keys.facebook.clientID}|${keys.facebook.clientSecret}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(toeknInfo => {
      console.log(toeknInfo);
      next();
    });
};

// "is_valid": true, 
