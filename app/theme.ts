"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-gloock)",
    h1: {
      fontSize: "3.5rem",
      lineHeight: 1.2,
      [createTheme().breakpoints.down("md")]: {
        fontSize: "2.8rem",
      },
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "2.2rem",
      },
    },

    h2: {
      fontSize: "2.5rem",
      lineHeight: 1.3,
      [createTheme().breakpoints.down("md")]: {
        fontSize: "2rem",
      },
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "1.7rem",
      },
    },

    h3: {
      fontSize: "2rem",
      lineHeight: 1.35,
      [createTheme().breakpoints.down("md")]: {
        fontSize: "1.7rem",
      },
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "1.4rem",
      },
    },

    h4: {
      fontSize: "1.5rem",
      lineHeight: 1.4,
      [createTheme().breakpoints.down("md")]: {
        fontSize: "1.3rem",
      },
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "1.15rem",
      },
    },

    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.6,
      [createTheme().breakpoints.down("md")]: {
        fontSize: "1rem",
      },
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "0.95rem",
      },
    },
  },
  
  palette: {
    background: { default: "#F7EBD5", paper: "#FFF8E9",},
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
      secondary: "#000000"
    },
  },
});

export default theme;
