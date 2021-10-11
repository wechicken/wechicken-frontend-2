const withTM = require('next-transpile-modules')(['lodash-es']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STAGE: process.env.STAGE,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_VERIFICATION: process.env.GOOGLE_VERIFICATION,
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/liked': { page: '/liked' },
      '/mygroup': { page: '/mygroup' },
      '/myprofile': { page: '/myprofile' },
      '/search': { page: '/search' },
    };
  },
});
