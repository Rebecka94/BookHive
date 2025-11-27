"use client";
import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: "var(--font-gloock)",
    h1: { fontSize: "3.5rem", lineHeight: 1.2 },
    h2: { fontSize: "2.5rem", lineHeight: 1.3 },
    h3: { fontSize: "2rem", lineHeight: 1.35 },
    h4: { fontSize: "1.5rem", lineHeight: 1.4 },
    body1: { fontSize: "1.125rem", lineHeight: 1.6 },
  },

  palette: {
    background: { default: "#F7EBD5", paper: "#FFF8E9" },
    primary: {
      main: "#345B49",
      contrastText: "#FFF8E9",
    },
    secondary: {
      main: "#FFF8E9",
      contrastText: "#000000",
    },
    text: {
      primary: "#345B49",
      secondary: "#000000",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      [theme.breakpoints.down("md")]: { fontSize: "2.8rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "2.2rem" },
    },
    h2: {
      [theme.breakpoints.down("md")]: { fontSize: "2rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "1.7rem" },
    },
    h3: {
      [theme.breakpoints.down("md")]: { fontSize: "1.7rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "1.4rem" },
    },
    h4: {
      [theme.breakpoints.down("md")]: { fontSize: "1.3rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "1.15rem" },
    },
    body1: {
      [theme.breakpoints.down("md")]: { fontSize: "1rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "0.95rem" },
    },
  },
});

export default theme;
