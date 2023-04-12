# Source guides

-   [Secure User Authentication with Next.js, NextAuth.js, and AWS Cognito](https://evoila.com/de/blog/2023/03/07/secure-user-authentication-with-next-js-nextauth-js-and-aws-cognito-2/)

-   [Next 13](https://beta.nextjs.org/docs/installation)

-   [next-auth](https://next-auth.js.org/getting-started/example)

## AWS setup

Create or sign in into your AWS account (root user). Go to 'Cognito', and then click on 'Create user pool'.

Configure your user pool, pretty much, how you need it. For the sake of simplicity, I’m going to use the bare minimum.

You probably want to send out confirmation e-mails to your users. For this, you’ve got two options. Cognito itself or SES. The difference between these two options is the state of your application. If you’re just testing or still developing. Skip the SES setup. Just pick Send email with Cognito in Step 4 of setting up Cognito and you are good to go. For a production environment, use SES.

### User pool options

Authentication providers

-   Cognito user pool
-   Email

Password policy

-   Cognito defaults

Multi-factor authentication

-   No MFA

User account recovery

-   Enable self-service account recovery - Recommended
-   Email only

Self-service sign-up

-   Enable self-registration

Cognito-assisted verification and confirmation

-   Allow Cognito to automatically send messages to verify and confirm - Recommended
-   Send email message, verify email address
-   Keep original attribute value active when an update is pending - Recommended
-   Email address

Required attributes

-   email

Email

-   Send email with cognito + default settings

User pool name

-   Whatever you want

Hosted authentication pages

-   ON

Domain

-   Use Cognito domain
-   Write any domain prefix

Initial app client

-   Public client
-   Write an App client name
-   Generate a client secret

Allowed callback URLs

-   http://localhost:3000/api/auth/callback/cognito (beware! use http)

Advanced app client settings
OpenID Connect scopes:

-   Select 'OpenID', 'Email' and 'Profile'

Review the etup and proceed to create the User Pool.

### Get environment variables

You will need to get the COGNITO_ID, COGNITO_SECRET and COGNITO_ISSUER for the .env file.

Select your user pool, and on the overview, you'll see the 'User pool ID', something like 'eu-north-1_12abCdefG'. The COGNITO_ISSUER should then be something like 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_12abCdefG'.

In order to get the COGNITO_ID and COGNITO_SECRET, go to 'App integration', and scroll down to the bottom. There, on 'App client list', find your client name and click on it. On 'App client information' you'll see the 'Client ID', and you can show the 'Client secret'. Those are the COGNITO_CLIENT and COGNITO_SECRET respectively.

We don't have a .env file yet, but once we create it in the upcoming steps, we will need this variables.

## Next 13 setup

-   [Next 13](https://beta.nextjs.org/docs/installation) installation

### Installation

To automatically create a new Next.js project using the app directory:

```bash
npx create-next-app@latest --experimental-app
```

```bash
$ npx create-next-app@latest –experimental-app
✔ What is your project named? … <your app name>
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ What import alias would you like configured? … @/*
```

The next step is to install all packages with npm install. As soon as this is done, start the app with npm run dev.

```bash
cd <your app>
npm install
npm run dev
```

After the installation is complete, visit http://localhost:3000 to view your application

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Setting up NextAuth.js

Just install it with npm install next-auth.

```bash
npm install next-auth
```

Create a folder named /auth inside pages/api. Inside the auth folder, create a file with the following name: […nextauth].ts (yes, square brackets!). Your path to that file should now look like this: pages/api/auth/[…nextauth].ts

```bash
# ~/pages/api/auth/[…nextauth].ts
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_ID,
            clientSecret: process.env.COGNITO_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
};

export default NextAuth(authOptions);
```

Now TypeScript is complaining: Type 'undefined' is not assignable to type 'string'. for clientId and clientSecret. Let's fix that.

Create a file named process.d.ts in the root folder of this project. Paste this code inside:

```bash
# ~/process.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    COGNITO_ID: string
    COGNITO_SECRET: string
  }
}
```

This will tell TypeScript that our environment variables for COGNITO_CLIENT_ID and COGNITO_CLIENT_SECRETwill never be undefined. Speaking of which, it’s time to create them.

In the root folder, create a file named '.env' and inside that file, you need to define the necessary variables:

```bash
# ~/.env
COGNITO_ID = YOUR_CLIENT_ID
COGNITO_SECRET = YOUR_CLIENT_SECRET
COGNITO_ISSUER = https://cognito-idp.<REGION>.amazonaws.com/<USER_POOL_ID>
```

> NOTE: Make sure the .env is in .gitignore before pushing your code!

## Implementing User Authentication

First, create a new file inside app called providers.tsx and put the following code inside:

```bash
# ~/app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
```

Since Next.js 13 uses server components as the default, you need to create this component as a client, so the SessionProvider can be used.

Next up, it’s time to use that SessionProvider in the root layout under app/layout.tsx:

```bash
# ~/app/layout.tsx
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
```

With that in place, you can now make use of the useSession in any component that uses your root layout.

### Example

Create a new file under components/LoginButton.tsx and paste the following code in it:

```bash
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}
```

> The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.

Put the LoginButton component anywhere in your home page and try it.
