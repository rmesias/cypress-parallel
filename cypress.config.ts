import { defineConfig } from 'cypress';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    browserify(config, {
      typescript: require.resolve('typescript'),
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  requestTimeout: 5000,
  responseTimeout: 5000,
  defaultCommandTimeout: 5000,
  video: false,
  viewportWidth: 1872,
  viewportHeight: 981,
  chromeWebSecurity: false,
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents,
    baseUrl: 'http://admin-staging.aonewallet.com/',
    retries: 1,
  },
  env: {
    siteStagingAuthURL:
      'https://api-authentication-staging.aonewallet.com/authenticate?ttl=1d',
    boAdminStagingGraphql: 'https://api-admin-staging.aonewallet.com/graphql',
    backOfficeStagingAuthURL:
      'https://api-authentication-staging.aonewallet.com/authenticate?ttl=30d',
    prodAuthURL: 'https://api-authentication.nexiux.io/authenticate?ttl=90d',
    stagingAdminCode: 's482',
    prodAdminCode: 'y452',
    authtrans: 'Basic dHJhbnNhY3Q6cGFzc3dvcmQ=',
    authtest: 'Basic cmVzdHRlc3Q6cGFzc3dvcmQ=',
    boStagingCredentials: 'Basic YWRtaW44ODpwYXNzd29yZA==',
    boProdCredentials: 'Basic YWRtaW5xYTE6cGFzc3dvcmQ=',
    prodSiteCredentials: 'Basic bmF0YWxpZTpwYXNzd29yZA==',
    prodSiteUsername: 'natalie',
    boStagingUsername: 'admin88',
    site: 'https://api-site-staging.aonewallet.com/graphql',
    prod: 'https://qa.nexiux.io/',
  },
});
