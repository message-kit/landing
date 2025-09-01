import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const body = Inter({
    variable: "--font-body-font",
    subsets: ["latin"],
});

const display = Inter_Tight({
    variable: "--font-display-font",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Message Kit",
    description: "The easiest way to personalize your Discord server.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${body.variable} ${display.variable} font-body antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
