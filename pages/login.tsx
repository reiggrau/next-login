import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function login() {
    const { data: session } = useSession();
    console.log(session);

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                <img src={session.user.image || ""} alt="/" style={{ height: "100px", borderRadius: "50%" }} />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in</p>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }
}
