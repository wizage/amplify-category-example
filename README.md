# 3rd Party Plugins for Amplify

This is an example project on how to get started with Amplify plugin development. I will be documenting everything that I have found that helps make a successful plugin.

## Getting started with this repo

This repo will create a category on Amplify called **example**.

It has two commands:

* Add
```
Will stage an example for amplify
```

* Remove
```
Will remove the project from amplify
```

### Implementation
These are implemented in two stages:
1. commands/example/<command_name>.js:
```
Goes into the context variable that is defined in the extension folder
```

1. extensions/example-<command_name>.js:
Modules exports
```
Exports the function to the context variable. (These exports need to be unique). This should point to a private function that would run the needed functions in this file.
```

## Amplify functions (Helpers that are good to know)

#### context.amplify.updateamplifyMetaAfterResourceAdd
#### Input:
`CategoryName`: Name of your category

`ProjectName`: Name of the category project (This is set by the user)

`Options`: See Appendix 1 - Options

#### Return:
N/A

### context.amplify.updateamplifyMetaAfterResourceUpdate

#### Input:
`CategoryName`: Name of your category

`ProjectName`: Name of the category project (This is set by the user)

`OptionKey`: Key of option you want to update in the dictionary

`OptionValue`: Value of option you want to update in the dictionary

#### Return:
N/A

### context.amplify.getProjectMeta

#### Input
N/A

#### Return:
```
{
   providers:{
      //Populated from amplify init cloudformation setup
      awscloudformation:{
         AuthRoleName,
         UnauthRoleArn,
         AuthRoleArn,
         Region,
         DeploymentBucketName,
         UnauthRoleName,
         StackName,
         StackId
      }
   },
   [. . .]
   <plugin-name>:{
       <project-name>: {
           // Populated from the options variable sent in.
           service,
           providerPlugin,
           [ . . . ] 
           //Populated only after push
           providerMetadata, //Info needed for the provider
           lastPushTimeStamp, //Last push info
           output, //Outputs from the provider plugin
           lastPushDirHash //Hash of last push to detect changes
       }
   }
}
```

### context.amplify.getProjectConfig

#### Input:
N/A

#### Return:
```
{
   //Overall Project Name
   projectName,
   version,
   //Frontend hooks (good for codegen)
   frontend,
   <frontend_value>:{
      framework,
      config:{
         SourceDir,
         DistributionDir,
         BuildCommand,
         StartCommand
      }
   },
   //Array of configured providers (just names)
   providers
}
```

### context.amplify.pathManager.getBackendDirPath

#### Input:
N/A

#### Return:

`String` - Full location to the `amplify/backend` for the project

### context.amplify.copyBatch

#### Input:
`Context`: Context variable that contains amplify

`CopyJobs`: Dictionary of files to copy to the backend folder. This takes advantage of .ejs which allows you to write variables from the Props input to the file. You can use this with both YAML and JSON

Example:
```
copyJobs = [
    {
        dir: __dirname,
        //Template location that is ejs format (from the dir level)
        template,
        //Location to copy to (direct path)
        //i.e. /<backend_location>/<category_name>/<project_name>/<unique-template-name>
        target,
    }
];
```

`Props`: Dictionary of variables that you want to go into your CopyJob

#### Return:
N/A


### context.amplify.pushResources

#### Input:
`Context`: Context variable that contains amplify

`CategoryName`: Name of your category

`ProjectName`: Name of the category project (This is set by the user)

#### Return:
N/A

## Appendix 1: Variables and common dictionary.

### Options
Required in options:
```
{
    service,
    providerPlugin
};
```

`service`: Name of your category
`providerPlugin`: Name of your cloud provider (i.e `awscloudformation`)

**Notice:** You can have more options but these are the only required

