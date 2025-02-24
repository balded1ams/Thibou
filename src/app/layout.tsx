import type { Metadata } from 'next'
import ThemeProvider from "@/context/ThemeContext";
import '@/index.css';

export const metadata: Metadata = {
    title: 'Thibou',
    description: 'Museum oeuvre ploter',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
      <html lang="en">
        <body>
          <div id="root">
            <ThemeProvider>
                {children}
            </ThemeProvider>
          </div>
        </body>
      </html>
    );
}
