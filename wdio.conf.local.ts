import { config } from "./wdio.conf";
import merge from 'deepmerge';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .option('browser', {
    type: 'string',
    description: 'Specify browser to run tests in'
}).parseSync();

const allureDir = './reports/allure';


const browserName = argv.browser || 'chrome' ;

const browserCapabilities: WebdriverIO.Capabilities = {
        browserName,
}
if (browserName === 'chrome') {
    browserCapabilities['goog:chromeOptions'] = {
        args: [],
    };
}
if (browserName === 'firefox') {
    browserCapabilities['moz:firefoxOptions'] = {
        args: ['-headless'],
    };
};


let overrides = {
    specs: [
        './test/specs/**/*.ts'
    ],
    suites:{
        regression: [
            './test/specs/createTask.spec.ts',
            './test/specs/login.spec.ts'
        ]
    },
    capabilities: [browserCapabilities],
}

exports.config = merge(config, overrides)
