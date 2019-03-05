const featureName = 'example';

module.exports = context => {
  context.exampleRemove = async () => {
    let options = {
      service: featureName,
      providerPlugin: 'awscloudformation'
    };
    await examplePrivateRemove(context, options)
  }
}

async function examplePrivateRemove(context, options){
  //This will remove the resources from Amplify
  context.amplify.removeResource(context, featureName);
}