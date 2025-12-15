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
    body2: { fontSize: "0.7rem", lineHeight: 1 },
  },

  palette: {
    background: { default: "#F7EBD5", paper: "#FFF8EC" },
    primary: {
      main: "#345B49",
      contrastText: "#F7EBD5",
    },
    secondary: {
      main: "#F7EBD5",
      contrastText: "#345B49",
    },
    text: {
      primary: "#345B49",
      secondary: "#F7EBD5",
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            color: "#345B49", // 👈 texten i input
          },
          "& label": {
            color: "#345B49", // 👈 label
          },
          "& input::placeholder": {
            color: "#7A8F85",
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF8",

          "& fieldset": {
            borderColor: "#345B49",
          },
          "&:hover fieldset": {
            borderColor: "#2B4A3B",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#345B49",
          },
        },
      },
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
      [theme.breakpoints.down("md")]: { fontSize: "0.9rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "0.7rem" },
    },
    body2: {
      [theme.breakpoints.down("md")]: { fontSize: "0.7rem" },
      [theme.breakpoints.down("sm")]: { fontSize: "0.9rem" },
    },
  },
});

export default theme;
