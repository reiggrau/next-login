"use client";

import React from "react";

import styles from "../app/page.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Session } from "next-auth";

// Components
import LoginButton from "@/components/LoginButton";

const inter = Inter({ subsets: ["latin"] });

export default function NavBar({ session }: { session: Session | null }) {
    return (
        <div className={styles.navbar}>
            <div className={styles.center}>
                <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
                <div className={styles.thirteen}>
                    <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
                </div>
            </div>

            <nav className={styles.grid}>
                <a href="/" className={styles.card} rel="noopener noreferrer">
                    <h2 className={inter.className}>
                        Home <span>-&gt;</span>
                    </h2>
                    <p className={inter.className}>Accessible to everyone.</p>
                </a>

                <a href="/public" className={styles.card} rel="noopener noreferrer">
                    <h2 className={inter.className}>
                        User<span>-&gt;</span>
                    </h2>
                    <p className={inter.className}>Accessible to logged in users.</p>
                </a>

                <a href="/protected" className={styles.card} rel="noopener noreferrer">
                    <h2 className={inter.className}>
                        Admin<span>-&gt;</span>
                    </h2>
                    <p className={inter.className}>Only accessible to admin accounts.</p>
                </a>
            </nav>

            <LoginButton session={session} />
        </div>
    );
}
