import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Gloock } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles/globals.css";
import theme from "./styles/theme";

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
            <CssBaseline>
              <Header />
              <main>{children}</main>
              <Footer />
            </CssBaseline>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
