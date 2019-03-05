const featureName = 'example';

module.exports = context => {
  context.exampleAdd = async () => {
    let options = {
      service: featureName,
      providerPlugin: 'awscloudformation'
    };
    await examplePrivateAdd(context, options)
  }
}

async function examplePrivateAdd(context, options){

  //This should be gotten from a user but this is just an example
  const uniqueName = 'exampleProj';

  //Add something to the push of amplify
  context.amplify.updateamplifyMetaAfterResourceAdd(
    featureName,
    uniqueName,
    options,
    );
}