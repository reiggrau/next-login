import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Components
import LoginButton from "@/components/LoginButton";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            <NavBar session={session} />

            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>app/page.tsx</code>
                </p>
                <div>
                    <a href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
                        By <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
                    </a>
                </div>
            </div>

            <div style={{ border: "2px solid red", padding: "10px" }}>
                <LoginButton session={session} />
            </div>
        </main>
    );
}
