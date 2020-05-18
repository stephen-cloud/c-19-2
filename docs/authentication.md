!!! warning
    Authentication is a bit of a sticky wicket.

    You basically have these choices

    - Skip ahead to the next section (recommended)
    - Use federated social login with a hosted UI (if you can create Google or Facebook applications with a developer account)
    - Use Amplify's built-in authentication 
    - Go it alone (not recommended). You use AWS Cognito's built in authentication flows to help you.

    The default Amplify authentication UI with sign-in/up is hard to theme to look like it's part of the application. The federated hosted UI is pretty good, except I'm not going to assume you can create applications for the OAuth callbacks in Google Cloud or Facebook.

    Proceed with that in mind, or just skip to the next section. 

Amplify Authentication provides almost all we need out of the box.

- Sign up with OTP
- Sign in
- Forgot password

See <https://docs.amplify.aws/lib/auth/getting-started/q/platform/js> for details. But it basically comes down to the following.

It's just that the standard UI is all orange, the Amplify theme. 

## Add authentication to `App.tsx`

You already added authentication to your Amplify application earlier. So now we can

```typescript
import { withAuthenticator } from '@aws-amplify/ui-react'
```

And wrap the application to require it.

```typescript
export default withAuthenticator(App);
```

Try it.

![Ugly sign in](./assets/screenshots/ugly-signin.png)

Ugly for so many reasons. You can at least sign up and sign in. Not bad

But we need to sign out. Let's try.

```typescript
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
```

```typescript
<Toolbar>
    <Typography variant="h4" >Welcome to C-19 Autobody</Typography>
    <AmplifySignOut />
</Toolbar>
```

![Ugly sign out](./assets/screenshots/ugly-sign-out.png)

Kinda.

Let's fix it by calling the `Auth` API from a React Material button instead. We'll left-align the button. First an event handler.

```typescript
function onSignOut(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    Auth
        .signOut()
        .then(console.log)
        .catch(console.error)
}
```

Styling for React Material UI is done using `makeStyles`. It lets us define styles with type-safety and editor completion by name. Using them is easy.

```typescript
import React, { MouseEvent } from 'react';
```

```typescript hl_lines="1 2 3 4 5 8 14"
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}));

function App() {
    const classes = useStyles();

    return (
        <>
            <AppBar color="inherit" position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>Welcome to C-19 Autobody<Typography>
                    <Button onClick={onSignOut}>Sign out</Button>
                </Toolbar>
                <div>
                    ...
```

![Better sign out](./assets/screenshots/better-sign-out.png)

Nice.

## Make a login screen for React Material UI

!!! note
    There's a lot written about this. But none of it quite works for React Material, or works at with the versions of Amplify and React we're using. See [here](https://blog.logrocket.com/authentication-react-apps-aws-amplify-cognito/), [here](https://blog.kylegalbraith.com/2020/03/31/customizing-the-aws-amplify-authentication-ui-with-your-own-react-components/), [here](<https://medium.com/@howitson/how-i-managed-to-customize-aws-amplify-login-screens-8d85d0967849>), [here](https://dev.to/dabit3/the-complete-guide-to-user-authentication-with-the-amplify-framework-2inh), and [here](https://blog.logrocket.com/authentication-react-apps-aws-amplify-cognito/) for some of the closest we found. There are many more.

## Or use the hosted social login

Your best best is to use the hosted OAuth federated UI.

You can follow the instructions <https://docs.amplify.aws/lib/auth/social/q/platform/js> to make this work. You'll need access to developer accounts in Facebook or Google to create applications to use in the OAuth integration.

When you're done, it looks something like

![Federated Authentication UI](./assets/screenshots/hosted-signin-ui.png)

## The upshot

It's tricky to get the authentication just how we want it.

It's a distraction. I vote we leave it for now.