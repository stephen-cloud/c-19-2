AWS Amplify is a pretty great. It lets you add lots of production quality features to your web and mobile apps that you'd just have to do by hand otherwise. It's a managed service and tool chain for mobile and web apps.

| Feature |  What it does | How we use it in C-19 Autobody |
| --- | ---| ---|
| API | Lets you define arbitrary APIs using REST or GraphQL. API endpoints can be backed by AWS Lambdas. GraphQL endpoint are backed by DynamoDB. | We use some of the available GraphQL queries and mutations.|
| Auth | Uses AWS Cognito to create a full-featured sign-up, sign-on, forgot my password, and so on.| We use all the things. We get a full-featured authentication experience out-of-the-box with very little extra effort. |
| DataStore | A cross-device data storage synchronization that uses GraphQL. You can also subscribe to changes in data from other users and devices. This works whether you're online or offline: Synchronization uses optimistic locking. | As we're storing data through the DataStore API, the data will be stored in DynamoDB. Other devices (even browser tabs) will subscribe and update in realtime. |
| Interactions | Amplify lets you integrate with Amazon Alexa for chat bots and similar | |
| Predictions | Integrates Amazon Machine Learning. | |
| PubSub | Amplify provides connectivity to message systems. | |
| Push Notifications | Uses Amazon Pinpoint for segmentation and campaigns | |
| Storage | Can upload images and other data to S3 from an application | |

## There's already a super duper "Getting started" for Amplify

So let's do that now.


We're going to branch out on our own when it's time to create the React app (we already have one coming along) and we're going to create other integrations, like to Material UI and Material Table.

!!! note
    Everything except "Create a new React App"

- [Prerequisites](https://docs.amplify.aws/start/getting-started/installation/q/integration/react#set-up-frontend)
- [Set up fullstack project](https://docs.amplify.aws/start/getting-started/setup/q/integration/react)
- [Connect API and database to the app](https://docs.amplify.aws/start/getting-started/data-model/q/integration/react)
- [Add authentication](https://docs.amplify.aws/start/getting-started/auth/q/integration/react)
- [Deploy and host app](https://docs.amplify.aws/start/getting-started/hosting/q/integration/react)

Instead of editing `src/index.js`, edit `src/index.tsx` since we're using TypeScript.

## You need to make a couple of changes

When you're asked "Do you want to edit the schema now?" say yes and replace the contents with

```
type Vehicle @model {
    id: ID!
    make: String!
    model: String!
    mileage: Int
}
```

We're not going to do to-dos.

After all this, make sure `yarn start` still works.

## Handy commands

- `amplify console` opens the AWS Amplify console for the current project.
- `amplify mock api` does exactly what it says. Open a browser at the endpoint and execute some GraphQL commands.

OK. So that last one might be a stretch.

That's why we're not going to use the GraphQL API directly. We're going to use higher level abstraction, Amplify DataStore.

## The upshot

TBD: what we did