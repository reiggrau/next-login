"use client";

import styles from "../app/page.module.css";
import { Inter } from "next/font/google";

import { useSession, signIn, signOut } from "next-auth/react";

// import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

// export default function LoginButton({ session }: { session: Session | null }) {
export default function LoginButton() {
    const { data: session } = useSession();

    console.log(session);
    if (session && session.user) {
        return (
            <div className={styles.LoginButton}>
                <h2 className={inter.className}>{session.user.name}</h2>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    }

    if (session === undefined) {
        return (
            <div className={styles.LoginButton}>
                <h2 className={inter.className}>Loading...</h2>
            </div>
        );
    }

    return (
        <div className={styles.LoginButton}>
            <h2 className={inter.className}>Not signed in</h2>
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
} // this will check for a session and render a sign-in or sign-out button if there’s a user inside the session object
