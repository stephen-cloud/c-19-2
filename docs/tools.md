To get going with this tutorial, you'll need some tools. Please follow the links for instructions. Then come back here where we'll kick the tires to see whether your setup works.

## Install

| Tool | Required? | Installation instructions |
| --- | --- | --- |
| Amazon Web Services account | Yes | <https://aws.amazon.com/console/> |
| AWS Access Key | Yes | <https://www.youtube.com/watch?v=665RYobRJDY> |
| nodejs | Yes | <https://nodejs.org/en/download/package-manager/> |
| `yarn` package manager | Yes | <https://classic.yarnpkg.com/en/docs/install> |
| TypeScript | Yes, all the docs assume TypeScript | <https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#installing-typescript> |
| AWS CLI | Optional, but super useful | <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html> |
| GitHub account | Optional | <https://github.com> |

## Did the installations work?

Now let's check everything opens and shuts.

### AWS account

!!! danger "SET UP A BILLING ALARM"
    The very first thing you need to do is set up a [billing alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html). 
    
    Do it now.
    
    Not that anything you do in this tutorial is likely to run up more than a penny or two. But just in case we're wrong or you go rogue, you need to know.

    So even though we tested this out, WE ARE NOT RESPONSIBLE FOR ANY AWS CHARGES.

You will have the file `~/.aws/credentials` after an AWS account has been set up. 

It looks like

```
[default]
aws_access_key_id=YOUMUSTBEKIDDING
aws_secret_access_key=GETYOUROWNKEYS
```

Test whether the AWS CLI works

```shell
aws iam get-account-password-policy
```

The result should be something like

```json
{
  "PasswordPolicy": {
    "MinimumPasswordLength": 8,
    "RequireSymbols": true,
    "RequireNumbers": true,
    "RequireUppercaseCharacters": true,
    "RequireLowercaseCharacters": true,
    "AllowUsersToChangePassword": true,
    "ExpirePasswords": false,
    "HardExpiry": false
  }
}
```

### Does `yarn` work?

Try 

```shell
yarn help
```

You should see 

```
  Usage: yarn [command] [flags]

  Displays help information.

  Options:

    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --check-files                       install will verify file tree of packages for consistency

...
```
 
## The upshot

This whole tutorial uses some basic tools to get started. If you have the above, you can install everything else you need.

Nice work, tutorial-following person.

!!! To-do
    Links to fixing installation failures.


 