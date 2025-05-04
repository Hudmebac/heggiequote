import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import { Toaster } from '@/components/ui/toaster'; // Import Toaster for notifications
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Daily Stand Up Quote', // Updated App Title
  description: 'Your daily dose of motivation.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add suppressHydrationWarning to the html tag to fix hydration error
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster /> {/* Add Toaster component */}
        </ThemeProvider>
      </body>
    </html>
  );
}
