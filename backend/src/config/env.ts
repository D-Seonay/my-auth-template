import 'dotenv/config';

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'CHANGE_THIS_IN_PROD',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  serverUrl: process.env.SERVER_URL || 'http://localhost:4000',

  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleCallbackPath: '/auth/google/callback',

  facebookClientId: process.env.FACEBOOK_CLIENT_ID || '',
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  facebookCallbackPath: '/auth/facebook/callback',
};
