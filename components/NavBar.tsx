"use client";

import React from "react";

import styles from "../app/page.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
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
    );
}
