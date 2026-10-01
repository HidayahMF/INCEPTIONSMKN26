const base = require('./playwright.config');
module.exports = {
  ...base.default,
  use: { ...base.default.use, baseURL: 'https://inceptionsmkn-26.vercel.app' },
  webServer: undefined,
};
