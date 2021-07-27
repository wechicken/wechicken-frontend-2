const withTM = require('next-transpile-modules')(['lodash-es']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
});
