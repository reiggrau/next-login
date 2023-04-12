import styles from "./page.module.css";

import { Inter } from "next/font/google";

import Image from "next/image";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>app/page.tsx</code>
                </p>
            </div>
        </main>
    );
}
