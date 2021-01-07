const optimizelySDK = require('@optimizely/optimizely-sdk');
const v4 = require('uuid');

const optimizelyClientInstance = optimizelySDK.createInstance({
  sdkKey: 'Y2j1KVANegm8ES25QjZDQ'
});

const user = { id: v4() }; // identificação do usuário é obrigatória (parece)
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

  // tem um cache bizarro, demora quase 1 minuto dependendo.
  // altera aqui:
  // https://app.optimizely.com/v2/projects/19589593569/features/19753116415/rules
});
