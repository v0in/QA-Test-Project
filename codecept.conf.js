const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://martin-kregar.celtra.com/explorer/1df8d540', 
      show: false, 
      browser: 'chromium', // Default browser
    },
  },
  multiple: {
    parallel: {
      chunks: 2, // Number of parallel processes
      browsers: ['chromium', 'firefox', 'webkit'], // Run on multiple browsers
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'codecept-parallel-test',
};
