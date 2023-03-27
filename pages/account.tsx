import React from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/react";

export default function account() {
    // const { data: session, status } = useSession({ required: true }); // Option A: Auth login menu
    const { data: session, status } = useSession(); // Option B: Redirect to another page

    if (status === "authenticated") {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in</p>
            </div>
        );
    }
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }

    return {
        props: { session },
    };
}; // Option B
