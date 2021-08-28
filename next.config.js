const withTM = require('next-transpile-modules')(['lodash-es']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STAGE: process.env.STAGE,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
});
