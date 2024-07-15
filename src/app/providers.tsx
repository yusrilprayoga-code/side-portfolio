"use client"

import {ThemeProvider} from "next-themes";

export function Providers({Children} : {Children: React.ReactNode}) {
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {Children}
    </ThemeProvider>
}