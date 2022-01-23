const authConfig = {
  secretSession: process.env.APP_SECRET || '',
  expiresIn: '1d',
};

export default authConfig;
