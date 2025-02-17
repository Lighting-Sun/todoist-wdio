import { config } from "./wdio.conf";
import merge from 'deepmerge';

let overrides = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    services: [
        [
          'browserstack',
          { browserstackLocal: true, opts: { forceLocal: false } },
        ],
    ],
    maxInstances: 1,

    capabilities: [
        {
            browserName: 'Chrome',
            'bstack:options': {
              browserVersion: '131.0',
              os: 'Windows',
              osVersion: '10'
            }
          },
          {
            browserName: 'Firefox',
            'bstack:options': {
              browserVersion: 'latest',
              os: 'Windows',
              osVersion: '11'
            }
          }
    ],
    commonCapabilities: {
        'bstack:options': {
          buildName: "bstack-demo",
          projectName: "BrowserStack Sample",
          testObservability: "true",
          networkLogs: "true",
          consoleLogs: "info",
          percy: false,
          percyCaptureMode: "auto"
        }
    }

}

exports.config = merge(config, overrides)
