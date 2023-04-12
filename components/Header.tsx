import React from "react";

import styles from "@/app/page.module.css";

// Components
import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import LoginButton from "@/components/LoginButton";

export default function Header() {
    return (
        <div className={styles.header}>
            <Logo />
            <NavBar />
            <LoginButton />
        </div>
    );
}
