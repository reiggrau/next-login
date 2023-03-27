import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    // callbacks: {
    //     session({ session, token, user }) {
    //         return session; // The return type will match the one returned in `useSession()`
    //     },
    // },
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
