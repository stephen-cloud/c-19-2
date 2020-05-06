To get going with this tutorial, you'll need some tools. Please follow the links for instructions. Then come back here where we'll kick the tires to see whether the setup worked.

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

No let's check everything opens and shuts.

### AWS account

You will have the file `~/.aws/credentials` after an AWS account has been set up. 

It looks like

```
[default]
aws_access_key_id=YOUMUSTBEKIDDING
aws_secret_access_key=GETYOUROWNLEYS
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

... TBD

!!! todo
    Links to fixing installation failures.
 