"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a Book Club
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Book Club</DialogTitle>
        <DialogContent>
          <DialogContentText color="text.primary">
            Start your own book club! Give it a name and write a few lines about what makes it special.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="title"
              fullWidth
              variant="standard"
              sx={{
                "& .MuiInputBase-input": { color: "text.primary" },
                "& .MuiInputLabel-root": { color: "text.primary" },
                "& .MuiInputLabel-root.Mui-focused": { color: "text.primary" },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "text.primary",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "text.primary",
                },
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="description"
              fullWidth
              variant="standard"
              sx={{
                "& .MuiInputBase-input": { color: "text.primary" },
                "& .MuiInputLabel-root": { color: "text.primary" },
                "& .MuiInputLabel-root.Mui-focused": { color: "text.primary" },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "text.primary",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "text.primary",
                },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="subscription-form">
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
