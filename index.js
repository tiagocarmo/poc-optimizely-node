const optimizelySDK = require('@optimizely/optimizely-sdk');
const v4 = require('uuid');

const optimizelyClientInstance = optimizelySDK.createInstance({
  sdkKey: '<sdk-key>'
});

const user = { id: v4() };
const attributes = {};

optimizelyClientInstance.onReady().then(() => {

  const experimentIsEnabled = optimizelyClientInstance.isFeatureEnabled('nova-funcionalidade-teste', user.id, attributes);
  console.log('experimentIsEnabled', experimentIsEnabled);

  let flagIsActive = false;
  if (experimentIsEnabled) {
    flagIsActive = optimizelyClientInstance.getFeatureVariable('nova-funcionalidade-teste', 'active', user.id, attributes);
  }
  console.log('flagIsActive', flagIsActive);

  // se não fechar a conexão, o app não fecha
  optimizelyClientInstance.close();
});
