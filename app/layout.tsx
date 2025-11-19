import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Gloock } from "next/font/google";
import "./globals.css";
import theme from "./theme";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookHive",
  description: "A Goodreads-like app with book clubs",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={gloock.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline>{children}</CssBaseline>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
