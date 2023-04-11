# Source guides

-   [Secure User Authentication with Next.js, NextAuth.js, and AWS Cognito](https://evoila.com/de/blog/2023/03/07/secure-user-authentication-with-next-js-nextauth-js-and-aws-cognito-2/)

-   [Next 13](https://nextjs.org/docs)

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

We don't have a .env file yet, but once we create it in the upcoming steps, add this variables there, until it looks something like this:

```bash
# ~/.env
COGNITO_CLIENT_ID=<Client ID>
COGNITO_CLIENT_SECRET=<Client Secret>
COGNITO_ISSUER=https://cognito-idp.eu-north-1.amazonaws.com/<User Pool ID>
```

## Next 13 setup

-   [Next 13](https://nextjs.org/docs) installation

### Installation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
