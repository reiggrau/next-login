"use client"; // Since Next.js 13 uses server components as the default, you need to create this component as a client, so the SessionProvider can be used.

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
