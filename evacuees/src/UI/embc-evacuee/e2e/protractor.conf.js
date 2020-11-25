// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 180000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
 
  browserstackUser: process.env.BROWSERSTACK_USERNAME || 'suetairaku1',
  browserstackKey: process.env.BROWSERSTACK_ACCESS_KEY || 'wtbi3h5fHXfapXGAqnZz',

  // capabilities: {
  //   browserName: 'edge'
  // },
  
  commonCapabilities: {
    'build': 'embc-protractor-browserstack',
    'name': 'Non-Verified Registrant Tests',
    'browserstack.debug': 'true',
    'browserstack.networkLogs': 'true'
    //"browserstack.idleTimeout": 18000
  },

  multiCapabilities: [{
  //   'browserName': 'Chrome',
  //   'browser_version': 'latest',
  //   'os': 'Windows',
  //   'os_version': '10'
  // },{
    // 'browserName': 'Edge',
    // 'browser_version': 'latest',
    // 'os': 'Windows',
    // 'os_version': '10'
  // },{
    'browserName': 'Firefox',
    'browser_version': 'latest',
    'os': 'Windows',
    'os_version': '10'
  }],

  directConnect: false,
  baseUrl: 'https://era-registrants-test.pathfinder.gov.bc.ca/non-verified-registration/collection-notice', //'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 180000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};

//Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});